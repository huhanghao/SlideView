import React, { Component, } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import LoginPage from './src/LoginPage';
import MainPage from './src/MainPage';
import MorePage from './src/MorePage';
import OrderPinDetailPage from './src/OrderPinDetailPage';
import OrderBaoDetailPage from './src/OrderBaoDetailPage';
import OrderAirDetailPage from './src/OrderAirDetailPage';
import OrderGovDetailPage from './src/OrderGovDetailPage';
import UpdatePage from './src/UpdatePage';
import MineRatingPage from './src/MineRatingPage';
import QRcodePageAndroid from './src/part/QRCodeScreenAndroid';
import QRcodePageiOS from './src/part/QRCodeScreen';
import ChangePSWPage from './src/ChangePSWPage';
import AboutUsPage from './src/AboutUsPage';
import RollBusPage from './src/RollBusPage';

const initialRoute = { name: 'LoginPage' };

// Navigator跳转规则
function RouteMapper(route, navigation) {
  // todo ,根据route 返回相应的场景
  if (route.name === 'LoginPage') {
    return (
      <LoginPage navigator={navigation} />
    );
  } else if (route.name === 'MainPage') {
    return (
      <MainPage navigator={navigation} />
    );
  } else if (route.name === 'OrderPinDetailPage') {
    return (
      <OrderPinDetailPage {...route.params} navigator={navigation} />
    );
  } else if (route.name === 'OrderBaoDetailPage') {
    return (
      <OrderBaoDetailPage {...route.params} navigator={navigation} />
    );
  } else if (route.name === 'OrderGovDetailPage') {
    return (
      <OrderGovDetailPage {...route.params} navigator={navigation} />
    );
  } else if (route.name === 'OrderAirDetailPage') {
    return (
      <OrderAirDetailPage {...route.params} navigator={navigation} />
    );
  }else if (route.name === 'MorePage') {
    return (
      <MorePage navigator={navigation} />
    );
  } else if (route.name === 'QRcodePageAndroid') {
    return (
      <QRcodePageAndroid {...route.params} navigator={navigation} />
    );
  } else if (route.name === 'QRcodePageiOS') {
    return (
      <QRcodePageiOS {...route.params} navigator={navigation} />
    );
  } else if (route.name === 'TestPage') {
    return (
      <OrderAirDetailPage
        navigator={navigation} />
    );
  } else if (route.name === 'UpdatePage') {
    return (
      <UpdatePage
        {...route.params}
        navigator={navigation} />
    )
  } else if (route.name === 'ChangePSWPage') {
    return (
      <ChangePSWPage
        navigator={navigation} />
    )
  } else if (route.name === 'AboutUsPage') {
    return (
      <AboutUsPage
        navigator={navigation} />
    )
  } else if (route.name === 'RollBusPage') {
    return (
      <RollBusPage
        navigator={navigation} />
    );
  }
}

class tutu extends Component {
  render() {
    return (
        <Navigator
          initialRoute={initialRoute}
          renderScene={RouteMapper}
        />
    );
  }
}


AppRegistry.registerComponent('reemii.tutu.driver', () => tutu);
