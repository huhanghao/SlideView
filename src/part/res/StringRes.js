const StringRes = {
  login: '登陆',
  about_us: '关于我们',
  forget_password: '忘记密码？',
  input_phone_number: '请输入手机号',
  input_sms_code: '请输入验证码',
  input_password: '请输入密码',
  input_password_again: '请再次输入密码',
  input_start_distance: '请输入起始里程',
  input_end_distance: '请输入结束里程',
  input_price_name: '请输入费用名',
  input_price_value: '请输入费用数目(单位：元)',
  distance_value: '里程数:',
  final_price_value: '最终价格:',
  input_price_value_hint: '请输入最终价格',
  scanQRCodeFirst: '点击右上角扫描乘客票据来开始滚动发车',
  selectBusLineFirst: '点击一个您将要行驶的班线',
  BusLineEmpty: '您没有滚动发车的班线，请和后台核实一下吧',
  trip: '行程',
  finish: '完成',
  change_psw: '密码修改',
  govTrip: '公务出行',
  rollbus: '滚动发车',
  pinCar: '拼车',
  baoCar: '包车',
  airLine: '专线',
  today: '今天',
  tomorrow: '明天',
  future: '未来7天',
  qrCode: '二维码扫描',
  update: '更新',
  getOrderStatus: (code) => {
    switch (code) {
      case 'assigned':
        return '派车成功';
      case 'start':
        return '已发车';
      case 'arrived':
        return '已到达';
      case 'trip':
        return '行驶中';
      case 'confirm':
          return '价格已确认，待支付'
      case 'cancel':
          return '订单已取消';
      case 'paid':
          return '订单已支付';
      case 'evaluted':
          return '订单已完成评价';
      default:
        return '派车成功';
    }
  },
  getEncodePhoneNum: (phone) => {
    var temp = phone.substring( 3, phone.length -3 );
    var result = phone.replace(temp, '*****');
    return result;
  },
};

module.exports = StringRes;
