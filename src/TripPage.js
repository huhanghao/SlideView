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
import TripDate from './part/TripDate';
import TripList from './part/TripList';

import TimeUtils from './part/utils/TimeUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
  },
});

class TripPage extends React.Component {

  constructor() {
    super();

    this.selectToday = this.selectToday.bind(this);
    this.selectTomorrow = this.selectTomorrow.bind(this);
    this.selectFuture = this.selectFuture.bind(this);

    this.state = {
      selectedIndex : 1,
      startDay: 0,
      endDay: 0,
    };
  }

  selectToday() {
    this.setState({
      selectedIndex: 1,
      startDay: 0,
      endDay: 0,
    });
  }

  selectTomorrow() {
    this.setState({
      selectedIndex: 2,
      startDay: 1,
      endDay: 1,
    });
  }

  selectFuture() {
    this.setState({
      selectedIndex: 3,
      startDay: 0,
      endDay: 7,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.trip}
          navigator={this.props.navigator}
          isShowBackButton={false} />
        <TripDate
          selectToday={this.selectToday}
          selectTomorrow={this.selectTomorrow}
          selectFuture={this.selectFuture}
          selectedIndex={this.state.selectedIndex}
          />
        <TripList
          navigator={this.props.navigator}
          // status={'assigned'}
          start_time={TimeUtils.getTime(this.state.startDay, true)}
          end_time={TimeUtils.getTime(this.state.endDay, false)}
          loadingViewFunc={this.props.loadingViewFunc}
        />
      </View>
    );
  }
}

TripPage.propTypes = {
  navigator: PropTypes.object,
  loadingViewFunc: PropTypes.func,
};

module.exports = TripPage;
