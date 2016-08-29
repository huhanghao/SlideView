'use strict';

import React,{
  PropTypes,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  VibrationIOS,
} from 'react-native';

import Camera from 'react-native-camera';
import TitleBar from './TitleBar';
import CommonStyle from './res/CommonStyle';
import StringRes from './res/StringRes';

class QRCodeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      setSbarCodeFlag: true,
    }

    this._onBarCodeRead = this._onBarCodeRead.bind(this);
    this._onPressCancel = this._onPressCancel.bind(this);
    this.back = this.back.bind(this);
    this.barCodeFlag = true;
 }

  _onPressCancel() {
    setTimeout(this.back, 1000);
  }

  _onBarCodeRead(result) {
    console.log('_onBarCodeRead');
    console.log(result);
    if (this.barCodeFlag) {

      this.barCodeFlag = false;
      this.props.navigator.pop();
      this.props.onQRcodeRead(result.data);
      // setTimeout(this.back, 1000);
    }
  }

  back() {
    VibrationIOS.vibrate();
    this.props.navigator.pop();
  }

  render() {

    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.qrCode}
          navigator={this.props.navigator}
          isShowBackButton
        />
        <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}/>
          </View>
        </Camera>
        <View style={styles.arriveArea}>
          <TouchableOpacity style={styles.arriveButtonArea}
            onPress={this._onPressCancel}
          >
            <Text style={styles.arriveButton}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};


QRCodeScreen.propTypes = {
  cancelButtonVisible: React.PropTypes.bool,
  cancelButtonTitle: React.PropTypes.string,
  onSucess: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
  },

  camera: {
    flex: 1,
    alignItems: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  arriveArea: {
    height: 60 + CommonStyle.pageHorizontalMargin,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonStyle.commonGray,
  },
  arriveButtonArea: {
    width: 150,
    height: 50,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arriveButton: {
    fontSize: CommonStyle.mediumFont,
    color: CommonStyle.themeColorRed,
  },
});

module.exports = QRCodeScreen;
