import {
  View,
  StyleSheet,
  ListView,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  BackAndroid,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';
import ApiUtils from './part/utils/ApiUtils';

// 组件们
import SliderView from './part/SliderView';

import OrderGovUserInfoArea from './part/OrderGovUserInfoArea';
import OrderGovPositionInfoArea from './part/OrderGovPositionInfoArea';
import OrderGovPriceInfoArea from './part/OrderGovPriceInfoArea';
import InputDialog from './part/InputDialog';
import InputTwoLineDialog from './part/InputTwoLineDialog';

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
  arriveTwoButtonArea: {
    paddingHorizontal: 10,
    height: 60 + CommonStyle.pageHorizontalMargin,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonStyle.commonGray,
    flexDirection: 'row',
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
  arriveButtonColorArea: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonStyle.themeColorGreen,
  },
  arriveWhiteButton: {
    fontSize: CommonStyle.mediumFont,
    color: 'white',
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


class OrderGovDetailPage extends React.Component {

  constructor(props) {
    super(props);

    const backEventListener = () => {
      this.props.navigator.pop();
      return true;
    };

    const slederEventListener = {
      onIconAttachRight: () => {
        this.showStartDialog();
      },
    }

    const dialogCallback = {
      canceled: () => {
        this.resetSlider();
      },
      successed: (result1, result2, name) => {
        if (name == 'start_distance_dialog') {
          // 开车
          this.startTrip(result1, true);
        } else if (name == 'end_distance_dialog') {
          // 刹车
          this.startTrip(result1, false);
        } else if (name == 'add_price_item_dialog') {
          // 添加价目
          this.addPriceItem(result1, result2);
        } else if (name == 'confirm_price_dialog') {
          // 价格确认
          this.confirmPrice(result1);
        }
      },
    }

    this.state = {
      order: props.order,
      dialogCallback,
      slederEventListener,
      backEventListener,
      dialogVisiable: false,
      dialogTwoLineVisiable: false,
      isLoading: false,
      isRefreshing: false,
    }

    this.showStartDialog = this.showStartDialog.bind(this);
    this.showEndDialog = this.showEndDialog.bind(this);
    this.showPriceRegDialog = this.showPriceRegDialog.bind(this);
    this.showPriceConfirmDialog = this.showPriceConfirmDialog.bind(this);
    this.resetSlider = this.resetSlider.bind(this);
    this.renderBottomArea = this.renderBottomArea.bind(this);

    this.startTrip = this.startTrip.bind(this);
    this.startTripApi = this.startTripApi.bind(this);
    this.addPriceItem = this.addPriceItem.bind(this);
    this.confirmPrice = this.confirmPrice.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  resetSlider() {
    if (this.slider != null)
      this.slider.reset();
  }

  showStartDialog() {
    this.setState({
      dialogVisiable: true,
      dialogName: 'start_distance_dialog',
      dialogInputName: StringRes.distance_value,
      dialogInputHint: StringRes.input_start_distance,
    });
  }

  showEndDialog() {
    this.setState({
      dialogVisiable: true,
      dialogName: 'end_distance_dialog',
      dialogInputName: StringRes.distance_value,
      dialogInputHint: StringRes.input_end_distance,
    });
  }

  showPriceConfirmDialog() {
    this.setState({
      dialogVisiable: true,
      dialogName: 'confirm_price_dialog',
      dialogInputName: StringRes.final_price_value,
      dialogInputHint: StringRes.input_price_value_hint,
    });
  }

  showPriceRegDialog() {
    this.setState({
      dialogTwoLineVisiable: true,
      dialogName: 'add_price_item_dialog',
    });
  }

  // 开车 获取地址
  startTrip(start_mile, isStart) {
    const callback = {
      success: (data) => {
        console.log(" startTrip =" + JSON.stringify(data));

        this.setState({
          isLoading: false,
        });

        const address = data.formatted_address;
         this.startTripApi({
           start_mile,
           fact_start_place: address,
           fact_start_lat: location.split(',')[0],
           fact_start_lng: location.split(',')[1],
           isStart,
         });
      },
      failed: (msg) => {
        // alert(msg);
        alert('发车失败，地点信息异常，请重试。')
        this.setState({
          isLoading: false,
        });
      },
    };

    this.setState({
      isLoading: true,
    });

    if (this.state.lastPosition == null) {
      alert("发车失败，地点信息异常，请确保已打开GPS后重试！")
      return;
    }

    const location = this.state.lastPosition.coords.latitude+","+this.state.lastPosition.coords.longitude;
    console.log('convert location = ' + location);
    ApiUtils.convertLocation(
      {
        location,
        callback,
      }
    );
  }

  // 实际调用API发车
  startTripApi({start_mile, fact_start_place, fact_start_lat, fact_start_lng, isStart}) {
    const callback = {
     success: () => {

       this.setState({
         isLoading: false,
         dialogVisiable: false,
       });

       this.refresh();
     },
     failed: error => {
       alert('与服务器通讯失败，请尝试重试!');
       this.resetSlider();
       this.setState({
         isLoading: false,
       });
     },
   };

   const url = isStart ? 'charter/order/tripStart' : 'charter/order/arrived';

   const params = isStart ?
   {
     id: this.props.order.id,
     start_mile,
     fact_start_place,
     fact_start_lat,
     fact_start_lng,
   } :
   {
     id: this.props.order.id,
     end_mile: start_mile,
     fact_end_place: fact_start_place,
     fact_end_lat: fact_start_lat,
     fact_end_lng: fact_start_lng,
   };

   this.setState({
     isLoading: true,
   });

   ApiUtils.postRequest({
     funcName: url,
     params,
     callback});
  }

  // 添加费用
  addPriceItem(name, value) {
    const callback = {
     success: (data) => {

       this.setState({
         isLoading: false,
       });

       this.refresh();
     },
     failed: error => {
       alert('与服务器通讯失败，请尝试重试!');
       this.setState({
         isLoading: false,
       });
     },
   };

   const url = 'charter/order/setOrderPrices';

   const params =
   {
     order_id: this.props.order.id,
     fee_name: name,
     total_fee: value,
   };

   this.setState({
     isLoading: true,
     dialogTwoLineVisiable: false,
   });

   ApiUtils.postRequest({
     funcName: url,
     params,
     callback});
  }

  // 确认订单
  confirmPrice(value) {
    const callback = {
     success: (data) => {

       this.setState({
         isLoading: false,
       });
       this.refresh();
     },
     failed: error => {
       alert('与服务器通讯失败，请尝试重试!');
       this.setState({
         isLoading: false,
       });
     },
   };

   const url = 'charter/order/feeComfirm';

   const params =
   {
     order_id: this.props.order.id,
     fee: value,
   };

   this.setState({
     isLoading: true,
     dialogVisiable: false,
   });

   ApiUtils.postRequest({
     funcName: url,
     params,
     callback});
  }

  //订单刷新
  refresh() {
    const callback = {
     success: (data) => {

       this.setState({
         isLoading: false,
         isRefreshing: false,
       });

       console.log(" refresh =" + JSON.stringify(data));
       this.setState({
         order: data,
       });
     },
     failed: error => {
       alert('与服务器通讯失败，请尝试重试!');
       this.setState({
         isLoading: false,
         isRefreshing: false,
       });
     },
   };

   this.setState({
     isLoading: true,
     isRefreshing: true,
   });

   ApiUtils.postRequest({
     funcName: 'charter/order/info',
     params: {
       id: this.props.order.id,
     }, callback });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        console.log('location now = ' + initialPosition);
        this.setState(
          {
            initialPosition: position,
            lastPosition: position,
          }
        );
      },
      (error) => alert('获取位置失败，请确保您的手机GPS已打开'),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition: position});
    });

    BackAndroid.addEventListener('hardwareBackPress', this.state.backEventListener);

    this.refresh();
   }

   componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchID);
     BackAndroid.removeEventListener('hardwareBackPress', this.state.backEventListener);
   }

  renderBottomArea() {
      if (this.state.order.status == "assigned") {
        return (
          <SliderView
            ref={slider => { this.slider = slider; }}
            eventListener={this.state.slederEventListener}
          />
        );
      } else if (this.state.order.status == "trip") {
        return (
          <View style={styles.arriveArea}>
            <TouchableOpacity style={styles.arriveButtonArea}
              onPress={this.showEndDialog}
            >
              <Text style={styles.arriveButton}>到达目的地</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (this.state.order.status == "arrived") {
        return (
          <View style={styles.arriveTwoButtonArea}>
            <TouchableOpacity style={styles.arriveButtonColorArea}
              onPress={this.showPriceRegDialog}
            >
              <Text style={styles.arriveWhiteButton}>费用登记</Text>
            </TouchableOpacity>

            <View style={ {width: 10,} } />

            <TouchableOpacity style={styles.arriveButtonColorArea}
              onPress={this.showPriceConfirmDialog}
            >
              <Text style={styles.arriveWhiteButton}>价格确认</Text>
            </TouchableOpacity>

          </View>
        );
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.govTrip}
          navigator={this.props.navigator}
          isShowBackButton
        />

        <ScrollView style={ {flex: 1} }
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.refresh}
            />
          }
        >

          <OrderGovUserInfoArea
            order={ this.state.order }
          />
          <OrderGovPositionInfoArea
            order={ this.state.order }
          />
          <OrderGovPriceInfoArea
            order={ this.state.order }
          />

        </ScrollView>

        {this.renderBottomArea()}

        <InputDialog
          dialogVisiable={this.state.dialogVisiable}
          callback={this.state.dialogCallback}
          dialogInputName={this.state.dialogInputName}
          dialogInputHint={this.state.dialogInputHint}
          dialogName={this.state.dialogName}
          />

        <InputTwoLineDialog
          dialogVisiable={this.state.dialogTwoLineVisiable}
          callback={this.state.dialogCallback}
          dialogName={this.state.dialogName}
          />

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

OrderGovDetailPage.propTypes = {
  navigator: PropTypes.object,
  order: PropTypes.object,
};

module.exports = OrderGovDetailPage;
