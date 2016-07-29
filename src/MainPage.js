import {
  StyleSheet,
  ToastAndroid,
  NativeModules,
  Dimensions,
  View,
} from 'react-native';

import React, {
  PropTypes,
  Component,
} from 'react';

import CommonStyle from './part/res/CommonStyle';

import Icon from 'react-native-vector-icons/Ionicons';
import TabBar from 'react-native-xtabbar';
import StringRes from './part/res/StringRes';

import TripPage from './TripPage';
import OrderPage from './OrderPage';
import MinePage from './MinePage';

// loading view
import Spinner from 'react-native-spinkit';
const window = Dimensions.get('window');
const ScreenHeight = window.height;
const ScreenWidth = window.width;
const spinnerSize = CommonStyle.spinnerSize;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  spinner: {
		position: 'absolute',
		top: (ScreenHeight/2) - (spinnerSize/2),
		left: (ScreenWidth/2) - (spinnerSize/2),
	},
});

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab1Normal: null,
      tab1Selected: null,
      tab2Normal: null,
      tab2Selected: null,
      tab3Normal: null,
      tab3Selected: null,
      tab4Normal: null,
      tab4Selected: null,
      isLoading: true,
    };

    this.showLoadingView = this.showLoadingView.bind(this);
  }

  componentWillMount() {
    Icon.getImageSource('textsms', CommonStyle.iconSizeSmall, CommonStyle.themeColorGreen)
      .then((source) => this.setState({ tab1Selected: source }));

    Icon.getImageSource('textsms', CommonStyle.iconSizeSmall, CommonStyle.iconGray)
      .then((source) => this.setState({ tab1Normal: source }));

    Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.themeColorGreen)
      .then((source) => this.setState({ tab2Selected: source }));

    Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.iconGray)
      .then((source) => this.setState({ tab2Normal: source }));

    Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.themeColorGreen)
      .then((source) => this.setState({ tab3Selected: source }));

    Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.iconGray)
      .then((source) => this.setState({ tab3Normal: source }));

    Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.themeColorGreen)
      .then((source) => this.setState({ tab4Selected: source }));

    Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.iconGray)
        .then((source) => this.setState({ tab4Normal: source }));
  }

  componentDidMount() {

  }

  showLoadingView(show) {
    this.setState({
      isLoading: show,
    });
  }

  render() {
    return (
      <View style={styles.content}>

        <TabBar
          style={styles.content}
          navTextColor={CommonStyle.fontGray}
          navTextColorSelected={CommonStyle.themeColorGreen}
          onItemSelected={(index) => {}}
        >
          <TabBar.Item
            icon={this.state.tab1Normal}
            selectedIcon={this.state.tab1Selected}
            title={'首页'}
          >
            <TripPage navigator={this.props.navigator}
              loadingViewFunc={this.showLoadingView}
              />
          </TabBar.Item>

          <TabBar.Item
            icon={this.state.tab2Normal}
            selectedIcon={this.state.tab2Selected}
            title={'订单'}
          >
            <OrderPage navigator={this.props.navigator}
              loadingViewFunc={this.showLoadingView}
            />
          </TabBar.Item>

          {/* <TabBar.Item
            icon={tabIcon3Normal}
            selectedIcon={tabIcon3Selected}
            title={'收入'}
          >
            <InComePage navigator={this.props.navigator} />
          </TabBar.Item>*/}

          <TabBar.Item
            icon={this.state.tab4Normal}
            selectedIcon={this.state.tab4Selected}
            title={'我'}
          >
            <MinePage navigator={this.props.navigator} />
          </TabBar.Item>
        </TabBar>

        <Spinner
          style={styles.spinner}
          isVisible={this.state.isLoading}
          size={spinnerSize}
          type={CommonStyle.spinnerType}
          color={CommonStyle.spinnerColor}
        />
      </View>
    );
  }

}

MainPage.propTypes = {
  navigator: PropTypes.object,
};

module.exports = MainPage;
