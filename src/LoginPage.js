import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import React, {
  PropTypes,
  Component,
} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import TitleBar from './part/TitleBar';

import StringRes from './part/res/StringRes';
import CommonStyle from './part/res/CommonStyle';

import ApiUtils from './part/utils/ApiUtils';
import md5 from 'md5';

import Spinner from 'react-native-spinkit';
const window = Dimensions.get('window');
const ScreenHeight = window.height;
const ScreenWidth = window.width;
const spinnerSize = CommonStyle.spinnerSize;

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
    top: (ScreenHeight/2) - (spinnerSize/2),
    left: (ScreenWidth/2) - (spinnerSize/2),
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
    const callback = {
      success: data => {
        this.setState({
          isLoading: false,
        });
        this.goToMain();
      },
      failed: msg => {
        alert(msg);
        this.setState({
          isLoading: false,
        })
      },
    };

    const phone = this.state.phoneText;
    const psw = this.state.pswText;

    const pswMd5 = md5(psw);

    this.setState({
      isLoading: true,
    });
    ApiUtils.getToken(phone, pswMd5, callback);
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

        <Spinner
          style={styles.spinner}
          isVisible={this.state.isLoading}
          size={spinnerSize}
          type={CommonStyle.spinnerType}
          color={CommonStyle.spinnerColor}
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

      </View>
		);
  }

}

LoginPage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = LoginPage;
