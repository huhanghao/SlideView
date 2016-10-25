import {
  View,
  StyleSheet,
  ListView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';

const avatar = require('./part/img/avatar.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
  },
  userInfoArea: {
    backgroundColor: CommonStyle.themeColorGreen,
    height: CommonStyle.userInfoAreaHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarArea: {
    alignItems: 'center',
  },
  avatar: {
    width: CommonStyle.iconSizeHuge,
    height: CommonStyle.iconSizeHuge,
  },
  funcArea: {
    backgroundColor: 'white',
    height: CommonStyle.commonRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: CommonStyle.borderWidth,
    borderBottomColor: CommonStyle.dividerGray,
  },
  funcIcon: {
    marginLeft: CommonStyle.pageHorizontalMargin,
    marginRight: CommonStyle.pageHorizontalMargin,
  },
  funcText: {
    flex: 1,
    fontSize: CommonStyle.mediumFont,
  },
  textName: {
    fontSize: CommonStyle.mediumFont,
    marginTop: 5,
  },
  firstRow: {
    marginTop: CommonStyle.pageHorizontalMargin,
    borderTopWidth: CommonStyle.borderWidth,
    borderTopColor: CommonStyle.dividerGray,
  },
});

function RightArrow() {
  return (
    <Icon
      name={'ios-arrow-forward'}
      color={CommonStyle.iconGray}
      size={CommonStyle.iconSize}
      style={{ marginRight: CommonStyle.pageHorizontalMargin }}
    />
  );
}

const FuncItemTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

function FuncItem({ text, onClick, firstRow }) {
  return (
    <TouchableOpacity
      style={[styles.funcArea, firstRow ? styles.firstRow : null]}
      onPress={onClick}
    >
      <Text style={styles.funcText}>{text}</Text>
      <RightArrow />
    </TouchableOpacity>
	);
}

FuncItem.propTypes = FuncItemTypes;

class MorePage extends React.Component {

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

          <FuncItem text={'常见问题帮助'} firstRow={true} />
          <FuncItem text={'用户条款'} firstRow={false} />
          <FuncItem text={'给我评分'} firstRow={false} />
          <FuncItem text={'关于我们'} firstRow={false} />
          <FuncItem text={'意见反馈'} firstRow={false} />

      </View>
    );
  }
}

MorePage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = MorePage;
