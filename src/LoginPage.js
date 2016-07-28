import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import React, {
  PropTypes,
  Component,
} from 'react';

var Spinner = require('react-native-spinkit');

import Icon from 'react-native-vector-icons/Ionicons';

import TitleBar from './part/TitleBar';

import StringRes from './part/res/StringRes';
import CommonStyle from './part/res/CommonStyle';

import ApiUtils from './utils/ApiUtils';
import md5 from 'md5';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 40,
    fontSize: 16,
  },
  inputArea: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  inputIcon: {
    marginLeft: 30,
    marginRight: 30,
  },
  bottomArea: {
    flex: 1,
  },
  aboveArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  avatar: {
    width: 60,
    height: 60,
  },
  findPSWFont: {
    fontSize: 14,
    marginRight: 10,
  },
  loginButton: {
    fontSize: 16,
    color: 'white',
  },
  loginArea: {
    margin: 20,
    height: 40,
    backgroundColor: CommonStyle.themeColorGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'black',
  },
  spinner: {
    position: 'absolute',
    top: 0,
 },
});

class LoginPage extends Component {

  constructor() {
    super();

    this.state = {
      phoneText: '13987121099',
      pswText: '130019',
      isLoading: false,
    };
    this.login = this.login.bind(this);
  }

  login() {
    // const callback = {
    //   success: data => {
    //     this.setState({
    //       isLoading: false,
    //     })
    //     this.goToMain();
    //   },
    //   failed: msg => {
    //     alert(msg);
    //   },
    // };

    const phone = this.state.phoneText;
    const psw = this.state.pswText;

    const pswMd5 = md5(psw);

    this.setState({
      isLoading: true,
    })
    // ApiUtils.getToken(phone, pswMd5, callback);
  }

  goToMain() {
    this.props.navigator.replace({
      name: 'MainPage',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.login}
          navigator={this.props.navigator}
          isShowBackButton
          />

        <View style={styles.aboveArea}>
          <Icon name="ios-phone-portrait" size={30} color="#900" style={styles.avatar} />
        </View>

        <View style={styles.bottomArea}>
          <View style={styles.inputArea}>
            <Icon name={'ios-phone-portrait'} size={CommonStyle.iconSize} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              keyboardType={'phone-pad'}
              placeholder={StringRes.input_phone_number}
              onChangeText={(text) => this.setState({ phoneText: text })}
              value={this.state.phoneText}
            />
          </View>

          <View style={styles.inputArea}>
            <Icon name={'ios-lock-outline'} size={CommonStyle.iconSize} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              keyboardType={'ascii-capable'}
              secureTextEntry
              placeholder={StringRes.input_password}
              onChangeText={(text) => this.setState({ pswText: text })}
              value={this.state.pswText}
            />
             <Text style={styles.findPSWFont}>{StringRes.forget}</Text>
          </View>

          <TouchableOpacity
            onPress={this.login}>
            <View style={styles.loginArea}>
              <Text style={styles.loginButton}>{StringRes.login}</Text>
            </View>

          </TouchableOpacity>

        </View>

        <Spinner
          style={styles.spinner}
          isVisible={this.state.isLoading}
          size={100}
          type={'Wave'}
          color={'black'}
        />

      </View>
		);
  }

}

LoginPage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = LoginPage;
