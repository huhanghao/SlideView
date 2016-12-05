import {
  Alert,
} from 'react-native';

const AlertUtils = {
  alert: function(msg) {
    // Works on both iOS and Android
    Alert.alert(
      '提示',
      msg,
      [
        {text: '确定', onPress: () => console.log('OK Pressed')},
      ]
    );
  },
}

module.exports = AlertUtils;
