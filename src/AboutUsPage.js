import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  BackAndroid,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';

import VersionNumber from 'react-native-version-number';
import Communications from 'react-native-communications';

const Tel = '0871-64589278';
const Url = 'http://www.baidu.com';
const logo = require('./part/img/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
  },
  funcArea: {
    backgroundColor: 'white',
    height: CommonStyle.commonRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: CommonStyle.borderWidth,
    borderBottomColor: CommonStyle.dividerGray,
  },
  avatar: {
    width: 60,
    height: 60,
  },
});


class AboutUsPage extends React.Component {

  constructor(props) {
    super(props);

    const backEventListener = () => {
      this.props.navigator.pop();
      return true;
    };

    this.state = {
      backEventListener,
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.state.backEventListener);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.state.backEventListener);
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.about_us}
          navigator={this.props.navigator}
          isShowBackButton
        />

        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
          <Image
            source={logo}
            style={styles.avatar}
          />

          <Text
            style={{marginTop: 10,}}
          >
            v{VersionNumber.appVersion}
          </Text>

        </View>

        <TouchableOpacity
          style={styles.funcArea}
          onPress={
            () => {
              Communications.phonecall(Tel, true);
            }
          }
        >
          <Text
            style={{flex: 1, textAlign: 'center'}}
          >
            服务热线
          </Text>
          <Text
            style={{flex: 3}}
          >
            {Tel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.funcArea}
          onPress={
            ()=> {
              Linking.openURL(Url)
              .catch(err => console.error('An error occurred', err));
            }
          }
        >
          <Text
            style={{flex: 1, textAlign: 'center'}}
          >
            官方网站
          </Text>
          <Text
            style={{flex: 3}}
          >
            {Url}
          </Text>
        </TouchableOpacity>

        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10}}
        >

          <Text>
            云南芮米科技有限公司 版权所有
          </Text>

          <Text>
            Copyright © 2015-2016 Reemii
          </Text>

          <Text>
            All Rights Reserved
          </Text>

        </View>

      </View>
    );

  }
}

AboutUsPage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = AboutUsPage;
