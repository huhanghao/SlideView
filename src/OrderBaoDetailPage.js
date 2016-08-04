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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
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
    this.state = {
     order: props.order,
     backEventListener,
     isRefreshing: false,
   }

   this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.state.backEventListener);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.state.backEventListener);
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
        alert('refresh failed ' + msg);
        this.setState(
          {
            isRefreshing: false,
          }
        );
      }
    };

    // alert(JSON.stringify(this.state.order));
    const params = {
      id: this.state.order.id,
    }

    // alert('refresh params ' + JSON.stringify(params));

    ApiUtils.postRequest({funcName: 'busline/batch/info', params, callback});
  }

  renderBottomArea() {
    if (this.state.order.status === 'assigned') {
      return (
        <SliderView eventListener={this.state.slederEventListener} />
      );
    } else if (this.state.order.status === 'start'){
      return (
        <View style={styles.arriveArea}>
          <TouchableOpacity style={styles.arriveButtonArea}>
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
          />
        </ScrollView>
        { this.renderBottomArea() }
      </View>
    );
  }
}

OrderBaoDetailPage.propTypes = OrderBaoDetailPageTypes;

module.exports = OrderBaoDetailPage;
