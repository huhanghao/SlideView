import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import React, {
  PropTypes,
} from 'react';

import CommonStyle from './res/CommonStyle';

const styles = StyleSheet.create({
  topMenuViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },

  menuItemStyle: {
    flex: 1,
    alignItems: 'center',
    height: 45,
    backgroundColor: 'white',
    flexDirection: 'column',
  },

  menuItemSelectedStyle: {
    borderColor: CommonStyle.CellItemSelected,
    borderWidth: 2,
  },

  menuItemUnselectedStyle: {
    borderColor: CommonStyle.dividerGray,
    borderWidth: 1,
  },

  menuItemImageStyle: {
    resizeMode: 'cover',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: 30,
    height: 30,
  },

  menuItemTextUnselectedStyle: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },

  menuItemTextSelectedStyle: {
    marginTop: 10,
    fontSize: 16,
    color: CommonStyle.themeColorGreen,
    textAlign: 'center',
  },

  menuItemBottomLine: {
    height: 2,
    backgroundColor: 'white',
  },

  menuItemBottomLineChecked: {
    width: 80,
    height: 2,
    backgroundColor: CommonStyle.themeColorGreen,
  },
});

class TripDateCell extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <TouchableOpacity
        style={styles.menuItemStyle}
        onPress={this.props.onPress}
      >
        <Text
          style={this.props.selected === true ? styles.menuItemTextSelectedStyle
            : styles.menuItemTextUnselectedStyle}
        >{this.props.text}
        </Text>

        <View style={{flex:1}} />

        <View
          style={ this.props.selected === true ? styles.menuItemBottomLineChecked
            : styles.menuItemBottomLine }
        />
      </TouchableOpacity>

  );
  }
}

TripDateCell.propTypes = {
  selected: PropTypes.bool,
  selectedImage: PropTypes.number,
  unselectedImage: PropTypes.number,
  text: PropTypes.string,
  onPress: PropTypes.func };

module.exports = TripDateCell;
