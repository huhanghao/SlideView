import {
  View,
  StyleSheet,
  ListView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
  },
});

class MineRatingPage extends React.Component {

  constructor() {
    super();
  }


  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.trip}
          navigator={this.props.navigator}
        />

        <ScrollView style={styles.container}>

        </ScrollView>

      </View>
    );

  }
}

MineRatingPage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = MineRatingPage;
