import {
  View,
  StyleSheet,
  ListView,
  Text,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';
import TripList from './part/TripList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(187,187,187)',
  },
});

const OrderPageTypes = {
  navigator: PropTypes.object,
};

class OrderPage extends React.Component {

  constructor() {
    super();
  }


  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.trip}
          navigator={this.props.navigator}
          isShowBackButton={false} />

        <TripList navigator={this.props.navigator}/>
      </View>
    );
  }
}

OrderPage.propTypes = OrderPageTypes;

module.exports = OrderPage;
