const StringRes = {
  login: '登陆',
  forget_password: '忘记密码？',
  input_phone_number: '请输入手机号',
  input_password: '请输入密码',
  trip: '行程',
  pinCar: '拼车',
  baoCar: '包车',
  today: '今天',
  tomorrow: '明天',
  future: '未来7天',
  getOrderStatus: (code) => {
    switch (code) {
      case 'assigned':
        return '派车成功';
      default:
        return '派车成功';
    }
  }
};

module.exports = StringRes;
