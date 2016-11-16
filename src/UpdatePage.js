import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  BackAndroid,
  Linking,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import CommonStyle from './part/res/CommonStyle';
import StringRes from './part/res/StringRes';
import TitleBar from './part/TitleBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.commonBg,
  },
});


class UpdatePage extends React.Component {

  constructor(props) {
    super(props);

    const backEventListener = () => {
      this.onCancelPressed();
      return true;
    };

    this.state = {
      backEventListener,
    };

    this.onCancelPressed = this.onCancelPressed.bind(this);
    this.onConfirmPressed = this.onConfirmPressed.bind(this);
  }

  onCancelPressed() {
    if (this.props.appInfo.is_enforce) {
      // gg
      BackAndroid.exitApp();
    } else {
      this.props.navigator.pop();
    }
  }

  onConfirmPressed() {
    Linking.openURL(this.props.appInfo.current_url)
      .catch(err => console.error('An error occurred', err));
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.state.backEventListener);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.state.backEventListener);
  }

  renderCancelButton() {
    if (this.props.appInfo.is_enforce
        && Platform.OS === 'ios') {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={
            {
              flex: 1,
            }
          }
          onPress={this.onCancelPressed}
        >
          <Text
            style={
              {
                textAlign: "center",
              }
            }
          >
            取消
          </Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          navigationTitle={StringRes.update}
          navigator={this.props.navigator}
        />

        <ScrollView
          style={
            {
              flex: 1,
              margin: CommonStyle.pageHorizontalMargin,
              backgroundColor: CommonStyle.themeColor,
              padding: CommonStyle.pageHorizontalMargin,
            }
          }
        >
          <Text>
            {this.props.appInfo.contents}
          </Text>
        </ScrollView>

        <View
          style={
            {
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: CommonStyle.themeColor,
            }
          }
        >
          {
            this.renderCancelButton()
          }

          <TouchableOpacity
            style={
              {
                flex: 1,
              }
            }
            onPress={this.onConfirmPressed}
          >
            <Text
              style={
                {
                  textAlign: "center",
                  color: CommonStyle.themeColorGreen,
                }
              }
            >
              更新
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );

  }
}

UpdatePage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = UpdatePage;
