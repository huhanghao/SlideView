import {
  AsyncStorage,
  Platform,
} from 'react-native';

import Promise from 'ypromise';
import VersionNumber from 'react-native-version-number';

// import LoadingView from './LoadingView';

const ApiUtils = {

  BASE_URL: 'http://tt.jt169.com/staff/',    // 线上服务器
  BASE_URL_WITH_OUT_TOKEN: 'http://tt.jt169.com/',
  TOKEN_URL: 'http://tt.jt169.com/common/staff/token',
  // BASE_URL: 'http://120.76.29.221:8080/staff/',  // 测试服
  // BASE_URL_WITH_OUT_TOKEN: 'http://120.76.29.221:8080/',
  // TOKEN_URL: 'http://120.76.29.221:8080/common/staff/token',
  // BASE_URL: 'http://192.168.1.173:8080/staff/',  // 局域网
  // BASE_URL_WITH_OUT_TOKEN: 'http://192.168.1.173:8080/',
  // TOKEN_URL: 'http://192.168.1.173:8080/common/staff/token',
  TIME_OUT: 5 * 1000,
  getLocalToken() {
    // return AsyncStorage.getItem('token');
    return new Promise((fulfill, reject) => {
      AsyncStorage.getItem('token', (err, result) => {
        if (err) {
          reject(err);
        }
        fulfill(result);
      });
    });
    // return { token: '123456' };
  },
  post({ url, params }) {

    console.log("post url = " + url);

    console.log("post params = " + JSON.stringify(params));

    const timeout = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request timeout')), 5000);
    });
    const fetchPost = new Promise((fulfill, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
      .then(
        r =>
        r.json()
      )
      .then(json => {
        if (json.code === 0) {
          fulfill(json.data);
        } else {
          reject(json.msg);
        }
      }).catch(ex => {
        reject(ex);
      });
    });
    return Promise.race([timeout, fetchPost]);
  },
  postReturnText({ url }) {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request timeout')), 5000);
    });
    const fetchPost = new Promise((fulfill, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(r => r.text())
        .then(text => {
          fulfill(text);
        }).catch(ex => {
          reject(ex);
        });
    });
    return Promise.race([timeout, fetchPost]);
  },
  postWithoutTimeout({ url, params }) {
    const fetchPost = new Promise((fulfill, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then(r => r.json())
        .then(json => {
          if (json.code === 0) {
            fulfill(json.data);
          } else {
            reject(json.code);
          }
        }).catch(ex => {
          reject(ex);
        });
    });
    return fetchPost;
  },
  getToken(phone, psw, callback) {
    // LoadingView.show('loading now');
    const timeout = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request timeout')), 5000);
    });
    const fetchToken = new Promise((resolve, reject) => {
      let url = this.TOKEN_URL;
      const params = '?grant_type=password&phone='.concat(phone)
      .concat('&password=').concat(psw);
        // phone + '&password=' +
        // psw + '&client=driver';
      url += params;
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(r => resolve(r))
      .catch(e => reject(e));
    });
    const p = Promise.race([timeout, fetchToken]);
    p.then(j =>
      j.json()
    )
    .then(json => {
      // LoadingView.dismiss();
      if (json.code === 0) {
        // 存储
        console.log(JSON.stringify(json));
        AsyncStorage.setItem('token', JSON.stringify(json.data))
        .then(() => {
          callback.success(json.data);
        })
        .catch(err => {
          callback.failed(err);
        });
      } else {
        callback.failed(json.msg);
      }
    }).catch(ex => {
      // LoadingView.dismiss();
      console.log(ex);
      callback.failed(ex);
    });
  },
  refreshToken({ funcName, params, callback }) {
    AsyncStorage.getItem('token')
    .then(token => {
      const tokenObj = JSON.parse(token);
      let url = this.TOKEN_URL;
      const urlParams = '?grant_type=refresh_token&refresh_token='.concat(tokenObj.refresh_token);
        // phone + '&password=' +
        // psw + '&client=driver';
      url += urlParams;
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(r => r.json())
        .then(json => {
          if (json.code === 0) {
            AsyncStorage.setItem('token', JSON.stringify(json.data))
            .then(() => {
              // 继续上一次请求
              //ToastAndroid.show('刷新成功，继续上一次网络请求!', ToastAndroid.SHORT);
              this.postRequest({ funcName, params, callback });
            })
            .catch(err => {
              //ToastAndroid.show('刷新失败，稍后再试!', ToastAndroid.SHORT);
              callback.failed(err);
            });
          } else if (json.code === 919) {
            //ToastAndroid.show('用户信息过期，请重新登录!', ToastAndroid.SHORT);
            // if (navigator != null) {
            //   navigator.push({ name: 'LoginPage' });
            // }
            callback.failed(json.msg);
          } else {
            callback.failed(json.msg);
          }
        }).catch(ex => {
          // console.log(ex);
          callback.failed(ex);
        });
    });
  },
  postRequest({ funcName, params, callback }) {
    const promise = this.getLocalToken();
    promise.then(token => {
      if (token === null) {
        console.log('need login');
        throw new Error('need login');
      } else {
        // LoadingView.show('hi');
        const tokenObj = JSON.parse(token);
        let url = this.BASE_URL + funcName;
        const urlToken = '?token='.concat(tokenObj.token);
        url += urlToken;
        return { url, params };
      }
    })
    .then(this.post)
    .then(json => {
      console.log(JSON.stringify(json));
      callback.success(json);
      // LoadingView.dismiss();
    })
    .catch(e => {
      console.log(e.toString());
      // ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
      // LoadingView.dismiss();
      switch (e.toString()) {
        case 'Error: need login':
          // if (navigator != null) {
          //   navigator.push({
          //     name: 'LoginPage',
          //   });
          // }
          callback.failed(e.toString());
          break;
        case '918':
        // token outdate
          //ToastAndroid.show('正在刷新用户登录信息,请稍后!', ToastAndroid.SHORT);
          this.refreshToken({ funcName, params, callback });
          break;
        default:
          callback.failed(e.toString());
          break;
      }
    });
  },
  getUser(resultCallback) {
    const reqUserTaskPromise = new Promise((resolve, reject) => {
      // AsyncStorage.getItem('user')
      // .then(user => {
        // .then(() => {
        // if (user == null) {
      const callback = {
        success: data => {
          resolve(data);
        },
        failed: error => {
          reject(error);
        },
      };
      this.postRequest({ callback, funcName: 'staff/self', params: {} });
        // }
        // else {
        //   const userJSON = JSON.parse(user);
        //   resolve(userJSON);
        // }
      //   })
      // .catch(err => {
      //   reject(err);
      // });
    });
    reqUserTaskPromise
    .then(user => {
      // save
      AsyncStorage.setItem('user', JSON.stringify(user));
      resultCallback.success(user);
    })
    .catch(err => {
      resultCallback.failed(err);
    });
  },
  getUserFromLocal(callback) {
    AsyncStorage.getItem('user')
    .then(user => {
      callback.success(JSON.parse(user));
    });
  },
  logout(callback) {
    AsyncStorage.removeItem('token')
      .then(() => {
        callback.success();
      });
  },
  convertLocation({ location, callback }) {
    // LoadingView.show('hi');
    const ak = 'rrOum4viCV7eNwKvBnSdG7L8ZrUtox0V';
    const url = 'http://api.map.baidu.com/geocoder/v2/?ak='
      .concat(ak)
      .concat('&callback=renderReverse&location=')
      .concat(location)
      .concat('&output=json&pois=1');
    this.postReturnText({ url })
    .then(str => {
      console.log(str);
      const jsonStr = str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1);
      console.log(jsonStr);
      return JSON.parse(jsonStr);
    })
    .then(json => {
      // LoadingView.dismiss();
      if (json.status === 0) {
        callback.success(json.result);
      } else {
        callback.failed(json.message);
      }
    })
    .catch(ex => {
      // LoadingView.dismiss();
      console.log(ex);
      callback.failed(ex);
    });
  },
  checkVersion(callback) {
    /**
     * 检测移动端是否更新
     * mobileType
     * an_driver:安卓司机端
     * an_user:安卓用户端
     * an_rent:安卓网约车司机端
     * ios_driver:IOS司机端
     * ios_user:IOS用户端
     * ios_rent:网约车司机端
     * 返回Map类型
     * key:is_update 是否更新;true,更新;false:不更新
     * key:is_enforce 是否强制更新;true,强制更新;false,不强制更新过
     * key:current_url 更新地址
     * key:current_version 当前版本
     * key:contents 更新日志
     * key:is_update 更新
     * key:is_update 更新
     *
     * @param mobileType    类型
     * @param mobileVersion 移动端版本
     * @return
     * @throws Exception
     */

    console.log(VersionNumber.appVersion);
    const url = this.BASE_URL_WITH_OUT_TOKEN + 'common/staff/check_version';
    const params = {
      mobile_type: (Platform.OS === 'ios') ? 'ios_driver': 'an_driver',
      mobile_version: VersionNumber.appVersion,
    };

    this.post({url, params}).then(json => {
      console.log(JSON.stringify(json));
      callback.success(json);
      // LoadingView.dismiss();
    })
    .catch(e => {
      console.log(JSON.stringify(e));
      callback.failed(e.toString());
    });
  },
};

module.exports = ApiUtils;
