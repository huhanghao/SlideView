import React, { Component, } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import LoginPage from './src/LoginPage';
import MainPage from './src/MainPage';
import OrderPinDetailPage from './src/OrderPinDetailPage';
import OrderBaoDetailPage from './src/OrderBaoDetailPage'
import MineRatingPage from './src/MineRatingPage'

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
  } else if (route.name === 'MorePage') {
    return (
      <MorePage navigator={navigation} />
    );
  } else if (route.name === 'TestPage') {
    return (
      <MineRatingPage
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
