import {
  View,
  StyleSheet,
  ListView,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';
import ApiUtils from './part/utils/ApiUtils';

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

    this.state = {
      user: null,
    }

    this.goToMorePage = this.goToMorePage.bind(this);
    this.logout = this.logout.bind(this);
    this.refreshUser = this.refreshUser.bind(this);
  }

  componentDidMount() {
      this.refreshUser();
    }

  logout() {
    const callback = {
      success: () => {
        this.props.navigator.replace({
          name: 'LoginPage',
        });
      },
    };
    ApiUtils.logout(callback);
  }

  refreshUser() {
   AsyncStorage.getItem('token', (err, result) => {
     const callback = {
       success: (data) => {
         this.setState({
           user: data,
         });
       },
       failed: (err) => {
         console.log('auto login failed!' + err.toString());
       },
     };
     ApiUtils.getUser(callback);
   });
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
            <Text style={styles.textName}>
              {this.state.user == null ? "" : this.state.user.name}
            </Text>

            {/*<RightArrow />*/}
          </View>

          <FuncItem icon={'ios-car'} text={'滚动发车'}
            onClick={
              ()=>this.props.navigator.push({name: 'RollBusPage'})
            }
          />

          <FuncItem icon={'ios-star'} text={'关于我们'}
            onClick={
              ()=>this.props.navigator.push({name: 'AboutUsPage'})
            }
          />

          <FuncItem icon={'ios-log-out'} text={'退出登录'} onClick={this.logout}/>

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
