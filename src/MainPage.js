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

const tab1Normal = require('./part/img/tab_1_normal.png');
const tab1Selected = require('./part/img/tab_1_selected.png');
const tab2Normal = require('./part/img/tab_2_normal.png');
const tab2Selected = require('./part/img/tab_2_selected.png');
const tab3Normal = require('./part/img/tab_3_normal.png');
const tab3Selected = require('./part/img/tab_3_selected.png');

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
      tab1Normal,
      tab1Selected,
      tab2Normal,
      tab2Selected,
      tab3Normal,
      tab3Selected,
      isLoading: true,
    };

    this.showLoadingView = this.showLoadingView.bind(this);
  }

  componentWillMount() {
    // Icon.getImageSource('textsms', CommonStyle.iconSizeSmall, CommonStyle.themeColorGreen)
    //   .then((source) => this.setState({ tab1Selected: source }));
    //
    // Icon.getImageSource('textsms', CommonStyle.iconSizeSmall, CommonStyle.iconGray)
    //   .then((source) => this.setState({ tab1Normal: source }));
    //
    // Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.themeColorGreen)
    //   .then((source) => this.setState({ tab2Selected: source }));
    //
    // Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.iconGray)
    //   .then((source) => this.setState({ tab2Normal: source }));
    //
    // Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.themeColorGreen)
    //   .then((source) => this.setState({ tab3Selected: source }));
    //
    // Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.iconGray)
    //   .then((source) => this.setState({ tab3Normal: source }));
    //
    // Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.themeColorGreen)
    //   .then((source) => this.setState({ tab4Selected: source }));
    //
    // Icon.getImageSource('ios-phone-portrait', CommonStyle.iconSizeSmall, CommonStyle.iconGray)
    //     .then((source) => this.setState({ tab4Normal: source }));
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
            icon={this.state.tab3Normal}
            selectedIcon={this.state.tab3Selected}
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
