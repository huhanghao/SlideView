import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import CommonStyle from './res/CommonStyle';
import StringRes from './res/StringRes';

const styles = StyleSheet.create({
  container: {

  },
  dialogBody: {
    padding: 20,
    borderRadius: 10,
    borderColor: CommonStyle.dividerGray,
    borderWidth: 1,
    backgroundColor: 'white',
    height: 200,
    marginHorizontal: 10,
  },
  dialogTitle: {
    flex: 1,
    color: CommonStyle.fontGray,
    fontSize: CommonStyle.fontSizeMedium,
  },
  dialogMessage: {
    color: CommonStyle.fontGray,
    fontSize: CommonStyle.fontSize,
  },
  dialogInput: {
    fontSize: 13,
    marginLeft: 20,
    flex: 4,
    borderWidth: 1,
    borderColor: CommonStyle.dividerGray,
  },
  dialogMessageArea: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  functionArea: {
    flex: 1,
    flexDirection: 'row',
  },
  functionRightButton: {
  },
  functionLeftButton: {
    marginRight: 20,
    color: CommonStyle.themeColorGreen,
  },
});


class InputTwoLineDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: props.dialogVisiable,
      inputValue1: '',
      inputValue2: '',
    };

    this.dissmiss = this.dissmiss.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.dialogVisiable,
    });
	}

  dissmiss() {
    this.setState({
      modalVisible: false,
    });
    if (this.props.callback != null) {
      this.props.callback.canceled();
    }
  }

  confirm() {
    this.setState({
      modalVisible: false,
    });
    if (this.props.callback != null) {
      this.props.callback.successed(this.state.inputValue1, this.state.inputValue2, this.props.dialogName);
    }
  }

  render() {
    return (
      <Modal
        style={styles.container}
        animationType={"slide"}
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >

      <TouchableOpacity
        style={ {flex: 1} }
        onPress={ this.dissmiss }
      />

      <View
        style={ styles.dialogBody }
      >

        <Text style={ styles.dialogTitle }>
          途途司机端
        </Text>

        <View
          style={ styles.dialogMessageArea }
        >
          <Text style={ styles.dialogMessage }>
            费用名:
          </Text>

          <View style={ {flex: 1} }>
            <View style={ {flex: 1} } />

            <TextInput
              onChangeText={(text) => this.setState({ inputValue1: text })}
              style={ styles.dialogInput }
              placeholder={StringRes.input_price_name}
              />

            <View style={ {flex: 1} } />
          </View>


        </View>

        <View
          style={ styles.dialogMessageArea }
        >
          <Text style={ styles.dialogMessage }>
            费    用:
          </Text>

          <View style={ {flex: 1} }>
            <View style={ {flex: 1} } />

            <TextInput
              onChangeText={(text) => this.setState({ inputValue2: text })}
              style={ styles.dialogInput }
              placeholder={StringRes.input_price_value}
              />

            <View style={ {flex: 1} } />
          </View>


        </View>

        <View
          style={ styles.functionArea } >

          <View style={ {flex: 1} } >
          </View>

          <TouchableOpacity
            style={ {justifyContent: 'flex-end'} }
            onPress={ this.confirm }
          >
            <Text style={styles.functionLeftButton}>
              确定
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ {justifyContent: 'flex-end'} }
          >
            <Text
              style={styles.functionRightButton}
              onPress={ this.dissmiss }
            >
              取消
            </Text>
          </TouchableOpacity>

        </View>

      </View>


      <TouchableOpacity
        style={ {flex: 1} }
        onPress={ this.dissmiss }
      />

      </Modal>
    );

  }
}

InputTwoLineDialog.propTypes = {

};

module.exports = InputTwoLineDialog;
