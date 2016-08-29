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

import CommonStyle from './res/CommonStyle';
import StringRes from './res/StringRes';
import TitleBar from './TitleBar';
import BarcodeScanner from 'react-native-barcodescanner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
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


class QRCodeScreenAndroid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     isQrcodeGot: false,
     backing: false,
   };

   this.barcodeReceived = this.barcodeReceived.bind(this);
   this.showCamera = this.showCamera.bind(this);
   this.back = this.back.bind(this);
  }


  barcodeReceived(e) {
    if (this.state.isQrcodeGot) {
      return;
    } else {
      this.setState({
        isQrcodeGot: true,
        backing: true,
      });
      console.log('Barcode: ' + e.data);
      console.log('Type: ' + e.type);
      this.props.navigator.pop();
      this.props.onQRcodeRead(e.data);
    }
  }

  back() {
    this.setState({
      isQrcodeGot: true,
      backing: true,
    });
    this.props.navigator.pop();
  }

  showCamera() {
    this.setState({
      backing: false,
    });
  }

  render() {
    let content;
    if (this.state.backing) {
        content =
          <View
            style={
              { flex: 1,
                backgroundColor: 'rgba(0,0,0,0.6)',
              }
            }
          />
    } else {
      content =
        <View style={styles.container}>
          <TitleBar
            navigationTitle={StringRes.qrCode}
            navigator={this.props.navigator}
            isShowBackButton
          />
          <BarcodeScanner
            onBarCodeRead={this.barcodeReceived}
            style={{ flex: 1 }}
            torchMode={'off'}
            cameraType={'back'}
          />
          <View style={styles.arriveArea}>
            <TouchableOpacity style={styles.arriveButtonArea}
              onPress={this.back}
            >
              <Text style={styles.arriveButton}>返回</Text>
            </TouchableOpacity>
          </View>
        </View>
    }

    return content;

  }
}

QRCodeScreenAndroid.propTypes = {
  navigator: PropTypes.object,
  onQRcodeRead: PropTypes.func,
};

module.exports = QRCodeScreenAndroid;
