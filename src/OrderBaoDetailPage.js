import {
  StyleSheet,
  View,
  ScrollView,
  BackAndroid,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';
import OrderBaoContent from './part/OrderBaoContent';
import SliderView from './part/SliderView';
import ApiUtils from './part/utils/ApiUtils';
import AlertUtils from './part/utils/AlertUtils';


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
});

const OrderBaoDetailPageTypes = {
  navigator: PropTypes.object,
};

class OrderBaoDetailPage extends React.Component {

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
     order: props.order,
     backEventListener,
     slederEventListener,
     isRefreshing: false,
   }

   this.refresh = this.refresh.bind(this);
   this.batchArrived = this.batchArrived.bind(this);
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
        AlertUtils.alert('已发车');
        this.refresh();
      },
      failed: (msg) => {
        AlertUtils.alert('发车失败 ' + msg);
      }
    };

    const params = {
      id: this.state.order.id,
    };

    // AlertUtils.alert(JSON.stringify(params));

    ApiUtils.postRequest({funcName: 'busline/batch/start', params, callback});
  }

  refresh() {
    const callback = {
      success: (data) => {
        this.setState(
          {
            isRefreshing: false,
            order: data,
          }
        );
      },
      failed: (msg) => {
        AlertUtils.alert('refresh failed ' + msg);
        this.setState(
          {
            isRefreshing: false,
          }
        );
      }
    };

    // AlertUtils.alert(JSON.stringify(this.state.order));
    const params = {
      id: this.state.order.id,
    }

    // AlertUtils.alert('refresh params ' + JSON.stringify(params));

    ApiUtils.postRequest({funcName: 'busline/batch/info', params, callback});
  }

  batchArrived() {
    const callback = {
      success: (data) => {
        AlertUtils.alert('到达目的地');
        this.refresh();
      },
      failed: (msg) => {
        AlertUtils.alert('发车失败 ' + msg);
      }
    };

    const params = {
      id: this.state.order.id,
    };

    // AlertUtils.alert(JSON.stringify(params));

    ApiUtils.postRequest({funcName: 'busline/batch/arrived', params, callback});
  }

  renderBottomArea() {
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
            <Text style={styles.arriveButton}>到达目的地</Text>
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
          navigationTitle={StringRes.baoCar}
          navigator={this.props.navigator}
          isShowBackButton={true} />
        <ScrollView style={ {flex: 1} }refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refresh}
            />
          }
        >
          <OrderBaoContent
            navigator={this.props.navigator}
            order={this.state.order}
            onRefresh={this.refresh}
          />
        </ScrollView>
        { this.renderBottomArea() }
      </View>
    );
  }
}

OrderBaoDetailPage.propTypes = OrderBaoDetailPageTypes;

module.exports = OrderBaoDetailPage;
