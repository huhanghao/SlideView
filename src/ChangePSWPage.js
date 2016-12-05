import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Linking,
} from 'react-native';

import React, {
  PropTypes,
  Component,
} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TitleBar from './part/TitleBar';

import StringRes from './part/res/StringRes';
import CommonStyle from './part/res/CommonStyle';

import ApiUtils from './part/utils/ApiUtils';
import AlertUtils from './part/utils/AlertUtils';
import md5 from 'md5';

import Spinner from 'react-native-spinkit';
const window = Dimensions.get('window');
const ScreenHeight = window.height;
const ScreenWidth = window.width;
const spinnerSize = CommonStyle.spinnerSize;

const logo = require('./part/img/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingLeft: 10,
  },
  inputArea: {
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
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
  smsArea: {
    backgroundColor: CommonStyle.themeColorGreen,
    marginRight: 5,
  },
  smsText: {
    color: 'white',
    padding: 5,
  }
});

class ChangePSWPage extends Component {

  constructor() {
    super();

    this.state = {
      phoneText: '',
      phoneCode: '',
      pswText: '',
      pswReText: '',
      isLoading: false,
      smsButtonText: '发送验证码',
      isEnable: true,
      timeRemain: 60,
    };

    this.sendSMSCode = this.sendSMSCode.bind(this);
    this.updatePSW = this.updatePSW.bind(this);
    this.countDownFunc = this.countDownFunc.bind(this);
  }

  componentDidMount() {

  }

  countDownFunc() {
    var timeNow = this.state.timeRemain;
    timeNow --;
    if (timeNow <= 0) {
      this.setState({
        isEnable: true,
        smsButtonText: '发送验证码',
      });
    this.timer && clearInterval(this.timer);
    } else {
      this.setState({
        timeRemain: timeNow,
        smsButtonText: timeNow,
        isEnable: false,
      });
    }
  };

  sendSMSCode() {
    if (this.state.phoneText.length < 11) {
      AlertUtils.alert('请填入正确的手机号');
      return;
    }

    if (!this.state.isEnable) {
      return;
    }

    this.setState({
      timeRemain: 60,
      isEnable: false,
    });

    this.timer = setInterval(this.countDownFunc, 1000);

    const url = ApiUtils.BASE_URL_WITH_OUT_TOKEN + 'common/staff/send_forgetpwd_code';
    const params = {
      phone: this.state.phoneText,
    };

    ApiUtils.post({url, params}).then(json => {
      // AlertUtils.alert(JSON.stringify(json));
      // if (json.code == 0) {
        AlertUtils.alert('验证码已成功发送，请注意查收');
      // } else {
      //   AlertUtils.alert(json.msg == null ? '验证码发送失败, 请重试' : json.msg);
      // }
      // callback.success(json);

      // LoadingView.dismiss();
    })
    .catch(e => {
      // AlertUtils.alert('发送验证码失败, 请重试');
      AlertUtils.alert(JSON.stringify(e));
      // callback.failed(e.toString());
    });
  }

  updatePSW() {
    if (this.state.phoneText.length < 11) {
      AlertUtils.alert('请填入正确的手机号');
      return;
    }

    if (this.state.phoneCode.length == 0) {
      AlertUtils.alert('请填入验证码');
      return;
    }

    if (this.state.pswText !== this.state.pswReText) {
      AlertUtils.alert('两次输入的密码不一致');
      return;
    }

    const url = ApiUtils.BASE_URL_WITH_OUT_TOKEN + 'common/staff/update_pwd';
    const params = {
      phone: this.state.phoneText,
      new_pwd: md5(this.state.pswText),
      code: this.state.phoneCode,
    };

    ApiUtils.post({url, params}).then(json => {
      // AlertUtils.alert(JSON.stringify(json));
      // if (json.code == 0) {
        AlertUtils.alert('修改密码成功，请使用新密码登陆');
        this.props.navigator.pop();
      // } else {
      //   AlertUtils.alert(json.msg == null ? '修改密码失败, 请重试' : json.msg);
      // }
    })
    .catch(e => {
        AlertUtils.alert('修改密码失败, 请重试');
      // AlertUtils.alert(JSON.stringify(e));
      // callback.failed(e.toString());
    });
  }


  hideKeyboard() {
    dismissKeyboard();
  }

  compnentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.hideKeyboard}
        >
        <TitleBar
          navigationTitle={StringRes.change_psw}
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

        <View style={styles.bottomArea}>
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              keyboardType={'phone-pad'}
              placeholder={StringRes.input_phone_number}
              onChangeText={(text) => this.setState({ phoneText: text })}
              value={this.state.phoneText}
            />
            <TouchableOpacity
              style={styles.smsArea}
              onPress={this.sendSMSCode}
            >
              <Text
                style={styles.smsText}
              >
                {this.state.smsButtonText}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              keyboardType={'phone-pad'}
              placeholder={StringRes.input_sms_code}
              onChangeText={(text) => this.setState({ phoneCode: text })}
              value={this.state.phoneCode}
            />
             <Text style={styles.findPSWFont}>{StringRes.forget}</Text>
          </View>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              keyboardType={'ascii-capable'}
              secureTextEntry
              placeholder={StringRes.input_password}
              onChangeText={(text) => this.setState({ pswReText: text })}
              value={this.state.pswReText}
            />
             <Text style={styles.findPSWFont}>{StringRes.forget}</Text>
          </View>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              keyboardType={'ascii-capable'}
              secureTextEntry
              placeholder={StringRes.input_password_again}
              onChangeText={(text) => this.setState({ pswText: text })}
              value={this.state.pswText}
            />
             <Text style={styles.findPSWFont}>{StringRes.forget}</Text>
          </View>

          <TouchableOpacity
            onPress={this.updatePSW}>
            <View style={styles.loginArea}>
              <Text style={styles.loginButton}>{StringRes.finish}</Text>
            </View>

          </TouchableOpacity>

        </View>

        {/* The view that will animate to match the keyboards height */}
        <KeyboardSpacer/>

      </TouchableOpacity>
		);
  }

}

ChangePSWPage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = ChangePSWPage;
