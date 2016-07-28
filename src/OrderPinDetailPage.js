import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';
import OrderPinContent from './part/OrderPinContent';
import SliderView from './part/SliderView';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
  },
});

const OrderPinDetailPageTypes = {
  navigator: PropTypes.object,
};

class OrderPinDetailPage extends React.Component {

  constructor() {
    super();
  }


  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.pinCar}
          navigator={this.props.navigator}
          isShowBackButton={true} />
        <ScrollView style={ {flex: 1} }>
          <OrderPinContent
            navigator={this.props.navigator}
          />
        </ScrollView>
        <SliderView />
      </View>
    );
  }
}

OrderPinDetailPage.propTypes = OrderPinDetailPageTypes;

module.exports = OrderPinDetailPage;
