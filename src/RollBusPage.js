import {
  StyleSheet,
  View,
  ScrollView,
  BackAndroid,
  Text,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Dimensions,
  ListView,
  AsyncStorage,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';
import OrderAirContent from './part/OrderAirContent';
import SliderView from './part/SliderView';
import ApiUtils from './part/utils/ApiUtils';
import AlertUtils from './part/utils/AlertUtils';
const QRCodeScreen = require('./part/QRCodeScreenAndroid');

// loading view
import Spinner from 'react-native-spinkit';
const window = Dimensions.get('window');
const ScreenHeight = window.height;
const ScreenWidth = window.width;
const spinnerSize = CommonStyle.spinnerSize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
  },
  arriveArea: {
    height: 60 + CommonStyle.pageHorizontalMargin,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonStyle.commonGray,
  },
  arriveButtonArea: {
    width: 150,
    height: 50,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arriveButton: {
    fontSize: CommonStyle.mediumFont,
    color: CommonStyle.themeColorRed,
  },
  spinner: {
		position: 'absolute',
		top: (ScreenHeight/2) - (spinnerSize/2),
		left: (ScreenWidth/2) - (spinnerSize/2),
	},
  commonRow: {
    height: CommonStyle.commonRowHeight,
    margin: CommonStyle.pageHorizontalMargin,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipStyle: {
    padding: CommonStyle.pageHorizontalMargin,
    color: CommonStyle.fontGray,
    fontSize: CommonStyle.fontSizeMedium,
  }
});

const RollBusPagePropTypes = {
  navigator: PropTypes.object,
};

class RollBusPage extends React.Component {

  constructor(props) {
    super(props);

    const backEventListener = () => {
      this.props.navigator.pop();
      return true;
    };

    const slederEventListener = {
      onIconAttachRight: () => {
        this.busGo();
      },
    }

    // for list view
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
     dataSource: ds.cloneWithRows(['bilibili']),
     backEventListener,
     order: props.order,
     slederEventListener,
     isRefreshing: false,
     isLoading: false,
     step: 'waiting_for_select_bus_line',
     roll_bus_line_data: null,
   }

   this.busGo = this.busGo.bind(this);
   this.refresh = this.refresh.bind(this);
   this.renderContent = this.renderContent.bind(this);
   this.batchArrived = this.batchArrived.bind(this);
   this.goToQRCode = this.goToQRCode.bind(this);
   this.apiCheckTicket = this.apiCheckTicket.bind(this);
   this.onQRcodeRead = this.onQRcodeRead.bind(this);
   this.loadMyBusLineData = this.loadMyBusLineData.bind(this);
   this.startCreateBusLine = this.startCreateBusLine.bind(this);
   this.jugeWhatToDo = this.jugeWhatToDo.bind(this);
 }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.state.backEventListener);

    this.jugeWhatToDo();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.state.backEventListener);
  }

  // 判断是加载上次的班线还是从新的流程开始
  jugeWhatToDo() {

    AsyncStorage.getItem('last_batch_line_id', (err, result) => {

      if (err || result == null || result.length == 0) {
        this.loadMyBusLineData();
      } else {
        this.refresh(result);
      }

    });
  }

  busGo() {
    const callback = {
      success: (data) => {
        this.refresh();
      },
      failed: (msg) => {
        AlertUtils.alert('发车失败 ' + msg);
      }
    };

    const params = {
      id: this.state.order.id,
    };

    // alert(JSON.stringify(params));

    ApiUtils.postRequest({funcName: 'busline/batch/start', params, callback});
  }

  batchArrived() {
    const callback = {
      success: (data) => {
        AlertUtils.alert('到达目的地');
        AsyncStorage.setItem('last_batch_line_id', '');
        this.refresh();
      },
      failed: (msg) => {
        AlertUtils.alert('到达失败 ' + msg);
      }
    };

    const params = {
      id: this.state.order.id,
    };

    // alert(JSON.stringify(params));

    ApiUtils.postRequest({funcName: 'busline/batch/arrived', params, callback});
  }

  loadMyBusLineData() {
    const callback = {
      success: (data) => {

        if (data == null) {
          data = [];
        }

        if (data.length == 0) {
          // for empty view
          data = ['bilibili'];
        }

        this.setState(
          {
            dataSource: this.state.dataSource.cloneWithRows(data),
            isRefreshing: false,
            isLoading: false,
          },
        );
        // AlertUtils.alert(JSON.stringify(data));
      },
      failed: (msg) => {
        var data = [];

				// for empty view
				data = ['bilibili'];

        AlertUtils.alert('refresh failed ' + msg);
        this.setState(
          {
            dataSource: this.state.dataSource.cloneWithRows(data),
            isRefreshing: false,
            isLoading: false,
          }
        );
      }
    };

    const params = {
    }

    this.setState(
      {
        isLoading: true,
      }
    );

    ApiUtils.postRequest({funcName: 'busline/batch/roll/list', params, callback});
  }

  refresh(paramsID) {
    const callback = {
      success: (data) => {
        console.log(" 滚动发车 刷新返回= " + JSON.stringify(data.result));

        this.setState(
          {
            isRefreshing: false,
            order: data,
            isLoading: false,
            step: 'has_enougth_data_to_show_info',
          },
        );
        // AlertUtils.alert(JSON.stringify(data));
      },
      failed: (msg) => {
        AlertUtils.alert(msg);
        this.setState(
          {
            isRefreshing: false,
            isLoading: false,
          }
        );
      }
    };

    var params = null
    if (paramsID != null) {
      params = {
        id: paramsID,
      };
    } else if (this.state.order != null) {
      params = {
        id: this.state.order.id,
      };
    }

    // AlertUtils.alert('refresh params ' + JSON.stringify(params));
    this.setState(
      {
        isLoading: true,
      }
    );

    ApiUtils.postRequest({funcName: 'busline/batch/info', params, callback});
  }

  goToQRCode() {
    if (this.state.step == 'waiting_for_select_bus_line') {
      AlertUtils.alert('您需要先选择您准备出发的班线才能开始验票');
      return;
    }

    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        name: 'QRcodePageiOS',
        params: {
          onQRcodeRead: this.onQRcodeRead,
        },
      });
    } else {
      this.props.navigator.push({
        name: 'QRcodePageAndroid',
        params: {
          onQRcodeRead: this.onQRcodeRead,
        },
      });
    }

  }

  onQRcodeRead(data) {
    let order_id = data.order_id;

    if (order_id == null) {
      try {
        const psw = JSON.parse(data);
        order_id = psw.order_id;
      } catch (e) {
        order_id = null;
      } finally {

      }
    }

    if (order_id != null) {
      this.apiCheckTicket(order_id);
    } else {
      AlertUtils.alert('无效的票据!');
    }
  }

  apiCheckTicket(id) {
		const callback = {
			success: (data) => {
        AlertUtils.alert('验票成功，欢迎乘车');
				this.setState(
					{
						isRefreshing: false,
					},
				);

        console.log(" 滚动发车 验票返回= " + JSON.stringify(data.result));
        AsyncStorage.setItem('last_batch_line_id', data.result)
				this.refresh(data.result);
			},
			failed: (msg) => {
        AlertUtils.alert('验票失败: '+ msg);
				this.setState(
					{
						isRefreshing: false,
					}
				);
			}
		};

		const params = {
      bus_line_id: this.state.roll_bus_line_data.bus_line_id,
			bus_line_batch_id: this.state.order == null ? '' : this.state.order.id,
			order_id: id,
		}

    // AlertUtils.alert(JSON.stringify(params));

		ApiUtils.postRequest({funcName: '/busline/order/check/roll', params, callback});
	}

  startCreateBusLine(data) {
    // AlertUtils.alert(JSON.stringify(data));
    this.setState({
      step: 'waiting_for_scan_qr_code',
      roll_bus_line_data: data,
    });
  }

  renderItem(rowData) {
    console.log('rowData.type = ' + rowData.type);
    if ('bilibili' == rowData) {
      return (
        <Text
          style={styles.tipStyle}
        >
          {StringRes.BusLineEmpty}
        </Text>
      )
    }
    else {
      return (
        <TouchableOpacity
          onPress={() => this.startCreateBusLine(rowData)}
          style={styles.commonRow}
        >
          <Text>
          {rowData.bus_line_name}
          </Text>

        </TouchableOpacity>
      );
    }
  }

  renderContent() {
    if (this.state.step == 'waiting_for_select_bus_line') {
      return (
        <View
          style={ {flex: 1} }
        >
          <Text
            style={styles.tipStyle}
          >
            {StringRes.selectBusLineFirst}
          </Text>
          <ListView
            style={ {flex: 1} }
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderItem(rowData)}
          />
        </View>
      )
    } else if (this.state.step == 'waiting_for_scan_qr_code') {
      return (
        <Text
          style={styles.tipStyle}
        >
          {StringRes.scanQRCodeFirst}
        </Text>
      )
    } else if (this.state.step == 'has_enougth_data_to_show_info') {
      return (
        <OrderAirContent
          navigator={this.props.navigator}
          order={this.state.order}
          onRefresh={this.refresh}
        />
      );
    }
  }

  renderBottomArea() {

    if (this.state.order == null) {
      return null;
    }

    // AlertUtils.alert(this.state.order.status);
    if (this.state.order.status === 'assigned') {
      return (
        <SliderView eventListener={this.state.slederEventListener} />
      );
    } else if (this.state.order.status === 'start'){
      return (
        <View style={styles.arriveArea}>
          <TouchableOpacity style={styles.arriveButtonArea}
            onPress={this.batchArrived}
          >
            <Text style={styles.arriveButton}>班线到达</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.rollbus}
          navigator={this.props.navigator}
          isShowBackButton={true}
          isShowRightButton={true}
          rightButtonText={'qrcode'}
          rightButtonAction={this.goToQRCode}
           />
        <ScrollView style={ {flex: 1} }
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.refresh}
            />
          }
        >
          {
            this.renderContent()
          }

        </ScrollView>
        {
          this.renderBottomArea()
        }

        <Spinner
          style={styles.spinner}
          isVisible={this.state.isLoading}
          size={spinnerSize}
          type={CommonStyle.spinnerType}
          color={CommonStyle.spinnerColor}
        />

      </View>
    );
  }
}

RollBusPage.propTypes = RollBusPagePropTypes;

module.exports = RollBusPage;
