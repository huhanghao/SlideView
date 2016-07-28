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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(187,187,187)',
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
    };
  }

  selectToday() {
    this.setState({
      selectedIndex: 1,
    });
  }

  selectTomorrow() {
    this.setState({
      selectedIndex: 2,
    });
  }

  selectFuture() {
    this.setState({
      selectedIndex: 3,
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
        />
      </View>
    );
  }
}

TripPage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = TripPage;
