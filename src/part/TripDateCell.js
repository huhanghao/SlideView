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
    height: 100,
  },

  menuItemStyle: {
    flex: 1,
    alignItems: 'center',
    height: 100,
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
    marginTop: 20,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },

  menuItemTextSelectedStyle: {
    marginTop: 20,
    fontSize: 16,
    color: CommonStyle.themeColorGreen,
    textAlign: 'center',
  },
});

class TripDateCell extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <TouchableOpacity
        style={this.props.selected === true
        ? [styles.menuItemStyle, styles.menuItemSelectedStyle] : [styles.menuItemStyle,
          styles.menuItemUnselectedStyle]} onPress={this.props.onPress}
      >
        <View>
          <Image
            style={styles.menuItemImageStyle}
            source={this.props.selected === true
            ? this.props.selectedImage :
              this.props.unselectedImage}
          />

          <Text
            style={this.props.selected === true ? styles.menuItemTextSelectedStyle
              : styles.menuItemTextUnselectedStyle}
          >{this.props.text}
          </Text>
        </View>
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
