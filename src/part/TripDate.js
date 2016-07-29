import {
  StyleSheet,
  View,
} from 'react-native';

import React, {
  PropTypes,
} from 'react';


const TripDateCell = require('./TripDateCell');

import CommonStyle from './res/CommonStyle.js';
import StringRes from './res/StringRes.js';

import Icon from 'react-native-vector-icons/Ionicons';


const styles = StyleSheet.create({
  topMenuViewStyle: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },

  menuItemStyle: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    height: 100,
  },
});


class TripDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
      todayIconNormal: 0,
      todayIconSelected: 0,
      tomorrowIconNormal: 0,
      tomorrowIconSelected: 0,
      futureIconNormal: 0,
      futureIconSelected: 0,
    };
  }

  componentWillMount() {
    Icon.getImageSource('md-calendar', CommonStyle.iconSize, CommonStyle.themeColorGreen)
      .then((source) => this.setState({ todayIconSelected: source }));
    Icon.getImageSource('md-calendar', CommonStyle.iconSize, 'black')
    .then((source) => this.setState({ todayIconNormal: source }));
    Icon.getImageSource('ios-sunny', CommonStyle.iconSize, CommonStyle.themeColorGreen)
    .then((source) => this.setState({ tomorrowIconSelected: source }));
    Icon.getImageSource('ios-sunny', CommonStyle.iconSize, 'black')
    .then((source) => this.setState({ tomorrowIconNormal: source }));
    Icon.getImageSource('ios-open-outline', CommonStyle.iconSize, CommonStyle.themeColorGreen)
    .then((source) => this.setState({ futureIconSelected: source }));
    Icon.getImageSource('ios-open-outline', CommonStyle.iconSize, 'black')
      .then((source) => this.setState({ futureIconNormal: source }));
  }


  render() {
    return (
      <View style={styles.topMenuViewStyle}>
        <TripDateCell
          style={styles.menuItemStyle} selectedImage={this.state.todayIconSelected}
          unselectedImage={this.state.todayIconNormal}
          text={StringRes.today}
          onPress={this.props.selectToday}
          selected={this.props.selectedIndex === 1}
        />
        <TripDateCell
          style={styles.menuItemStyle} selected={false}
          selectedImage={this.state.tomorrowIconSelected}
          unselectedImage={this.state.tomorrowIconNormal}
          text={StringRes.tomorrow}
          onPress={this.props.selectTomorrow}
          selected={this.props.selectedIndex === 2}
        />
        <TripDateCell
          style={styles.menuItemStyle} selected={false}
          selectedImage={this.state.futureIconSelected}
          unselectedImage={this.state.futureIconNormal}
          text={StringRes.future}
          onPress={this.props.selectFuture}
          selected={this.props.selectedIndex === 3}
        />
      </View>
      );
  }
}

TripDate.propTypes = {
  selectFuture: PropTypes.func,
  selectTomorrow: PropTypes.func,
  selectToday: PropTypes.func,
  selectedIndex: PropTypes.number,
};


module.exports = TripDate;
