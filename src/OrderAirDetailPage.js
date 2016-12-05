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
});

const OrderAirrDetailPageTypes = {
  navigator: PropTypes.object,
};

class OrderAirrDetailPage extends React.Component {

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

    this.state = {
     backEventListener,
     order: props.order,
     slederEventListener,
     isRefreshing: false,
     isLoading: false,
   }

   this.busGo = this.busGo.bind(this);
   this.refresh = this.refresh.bind(this);
   this.renderContent = this.renderContent.bind(this);
   this.batchArrived = this.batchArrived.bind(this);
   this.goToQRCode = this.goToQRCode.bind(this);
   this.apiCheckTicket = this.apiCheckTicket.bind(this);
   this.onQRcodeRead = this.onQRcodeRead.bind(this);
 }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.state.backEventListener);
    this.refresh();
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.state.backEventListener);
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

  refresh() {
    const callback = {
      success: (data) => {
        this.setState(
          {
            isRefreshing: false,
            order: data,
            isLoading: false,
          },
        );
        // AlertUtils.alert(JSON.stringify(data));
      },
      failed: (msg) => {
        AlertUtils.alert('refresh failed ' + msg);
        this.setState(
          {
            isRefreshing: false,
            isLoading: false,
          }
        );
      }
    };

    const params = {
      id: this.state.order.id,
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
      AlertUtils.alert('该票据与当前班线不符!');
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
				this.refresh();
				// AlertUtils.alert(JSON.stringify(data));
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
			bus_line_batch_id: this.state.order.id,
			order_bus_id: id,
		}

    // AlertUtils.alert(JSON.stringify(params));

		ApiUtils.postRequest({funcName: '/busline/order/check/static', params, callback});
	}

  renderContent() {
    return(
      <OrderAirContent
        navigator={this.props.navigator}
        order={this.state.order}
        onRefresh={this.refresh}
      />
    );
  }

  renderBottomArea() {
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
          navigationTitle={StringRes.airLine}
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

OrderAirrDetailPage.propTypes = OrderAirrDetailPageTypes;

module.exports = OrderAirrDetailPage;
