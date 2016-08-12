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
  }
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

function FuncItem({ icon, text, onClick }) {
  return (
    <TouchableOpacity
      style={styles.funcArea}
      onPress={onClick}
    >
      <Icon name={icon} size={CommonStyle.iconSize} style={styles.funcIcon} />
      <Text style={styles.funcText}>{text}</Text>
      <RightArrow />
    </TouchableOpacity>
	);
}

FuncItem.propTypes = FuncItemTypes;

const MinePageTypes = {
  navigator: PropTypes.object,
};

class MinePage extends React.Component {

  constructor() {
    super();

    this.goToMorePage = this.goToMorePage.bind(this);
  }


  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={'我的'}
          navigator={this.props.navigator}
          isShowBackButton={false} />

          <View style={styles.userInfoArea}>
            <View style={styles.avatarArea}>
              <Image source={avatar} style={styles.avatar} />
            </View>
            <Text>
              测试用户
            </Text>

            {/*<RightArrow />*/}
          </View>

          {/* <FuncItem icon={'ios-home'} text={'车队信息'} />
          <FuncItem icon={'ios-home'} text={'车辆信息'} />
          <FuncItem icon={'ios-home'} text={'评价'} />
          <FuncItem icon={'ios-home'} text={'更多'} onClick={this.goToMorePage}/> */}

      </View>
    );
  }

  goToMorePage() {
    this.props.navigator.push({
      name: 'MorePage',
    })
  }
}

MinePage.propTypes = MinePageTypes;

module.exports = MinePage;
