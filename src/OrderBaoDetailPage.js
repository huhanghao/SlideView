import {
  StyleSheet,
  View,
  ScrollView,
  BackAndroid,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';
import OrderBaoContent from './part/OrderBaoContent';
import SliderView from './part/SliderView';


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

  constructor() {
    super();
    const backEventListener = () => {
      this.props.navigator.pop();
      return true;
    };
    this.state = {
     backEventListener,
   }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.state.backEventListener);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.state.backEventListener);
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.baoCar}
          navigator={this.props.navigator}
          isShowBackButton={true} />
        <ScrollView style={ {flex: 1} }>
          <OrderBaoContent
            navigator={this.props.navigator}
            order={this.props.order}
          />
        </ScrollView>
        <SliderView />
      </View>
    );
  }
}

OrderBaoDetailPage.propTypes = OrderBaoDetailPageTypes;

module.exports = OrderBaoDetailPage;
