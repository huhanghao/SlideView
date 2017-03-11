import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import React,{
  PropTypes,
} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import CommonStyle from './res/CommonStyle';
import StringRes from './res/StringRes';

import Communications from 'react-native-communications';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    height: CommonStyle.commonRowHeight * 5,
  },
  row: {
    height: CommonStyle.commonRowHeight,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.dividerGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtOrderStatus: {
    color: CommonStyle.themeColorGreen,
  },
  txtCommonTitle: {
    color: CommonStyle.fontGray,
  },
  txtCommonContent: {
    color: CommonStyle.fontDarker,
    marginLeft: 10,
    fontSize: 13,
  },
});


class OrderGovUserInfoArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      order: nextProps.order,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={ styles.row }>
          <Text style={ styles.txtOrderStatus }>
            { StringRes.getOrderStatus(this.state.order.status) }
          </Text>
        </View>

        <View style={ styles.row }>
          <Text style={ styles.txtCommonTitle }>
            订单号:
          </Text>
          <Text style={ styles.txtCommonContent }>
             { this.state.order.id }
          </Text>
        </View>

        <View style={ styles.row }>
          <Text style={ styles.txtCommonTitle }>
             用车时间:
          </Text>
          <Text style={ styles.txtCommonContent }>
             { this.state.order.use_time }
          </Text>
        </View>

        <View style={ styles.row }>
          <Icon
            name="ios-pin"
            size={ CommonStyle.iconSize }
            color={CommonStyle.themeColorGreen}
          />
          <Text style={ styles.txtCommonContent }>
             { this.state.order.start_place }
          </Text>
        </View>

        <TouchableOpacity
          style={ styles.row }
          onPress={() => {
              Communications.phonecall(this.state.order.user.phone, true);;
            }
          }
        >
          <Icon
            name="ios-call"
            size={ CommonStyle.iconSize }
            color={CommonStyle.themeColorGreen}
          />
          <Text style={ [styles.txtCommonContent, {flex: 1}] }>
             {this.state.order.user.username} {StringRes.getEncodePhoneNum(this.state.order.user.phone)}
          </Text>
          <Icon
            name="ios-arrow-forward"
            size={ CommonStyle.iconSize }
            color={CommonStyle.iconGray}
          />
        </TouchableOpacity>

      </View>
    );

  }
}

OrderGovUserInfoArea.propTypes = {
  navigator: PropTypes.object,
};

module.exports = OrderGovUserInfoArea;
