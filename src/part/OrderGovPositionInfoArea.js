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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    height: CommonStyle.commonRowHeight * 6,
  },
  row: {
    height: CommonStyle.commonRowHeight,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.dividerGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtCommonTitle: {
    color: CommonStyle.fontGray,
    flex: 1,
    borderRightColor: CommonStyle.dividerGray,
    borderRightWidth: 1,
  },
  txtCommonContent: {
    color: CommonStyle.fontDarker,
    marginLeft: 10,
    flex: 3,
  },
  divider: {
    width: 1,
    backgroundColor: CommonStyle.dividerGray,
    height: 30,
  },
});


class OrderGovPositionInfoArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      order: nextProps.order,
    });
  }

  renderItem() {
    if (this.state.order.status == "cancel"
        || this.state.order.status == "normal"
        || this.state.order.status == "assigned") {
      return null;
    } else {
      return (
        <View style={styles.container}>

          <View style={ styles.row }>
            <Text style={ styles.txtCommonTitle }>
              出发地点
            </Text>

            <View style={ styles.divider }/>

            <Text style={ styles.txtCommonContent }>
              { this.state.order.fact_start_place }
            </Text>
          </View>

          <View style={ styles.row }>
            <Text style={ styles.txtCommonTitle }>
              出发里程
            </Text>

            <View style={ styles.divider }/>

            <Text style={ styles.txtCommonContent }>
              { this.state.order.start_mile }
            </Text>
          </View>

          <View style={ styles.row }>
            <Text style={ styles.txtCommonTitle }>
              出发时间
            </Text>

            <View style={ styles.divider }/>

            <Text style={ styles.txtCommonContent }>
              { this.state.order.start_time }
            </Text>
          </View>

          <View style={ styles.row }>
            <Text style={ styles.txtCommonTitle }>
              结束地点
            </Text>

            <View style={ styles.divider }/>

            <Text style={ styles.txtCommonContent }>
              { this.state.order.fact_end_place  == null ? "待确定" : this.state.order.fact_end_place }
            </Text>
          </View>

          <View style={ styles.row }>
            <Text style={ styles.txtCommonTitle }>
              结束里程
            </Text>

            <View style={ styles.divider }/>

            <Text style={ styles.txtCommonContent }>
              { this.state.order.end_mile  == null ? "待确定" : this.state.order.end_mile }
            </Text>
          </View>

          <View style={ styles.row }>
            <Text style={ styles.txtCommonTitle }>
              结束时间
            </Text>

            <View style={ styles.divider }/>

            <Text style={ styles.txtCommonContent }>
              { this.state.order.end_time == null ? "待确定" : this.state.order.end_time }
            </Text>
          </View>

        </View>
      );
    }
  }

  render() {
    return this.renderItem();
  }
}

OrderGovPositionInfoArea.propTypes = {
  navigator: PropTypes.object,
  order: PropTypes.object,
};

module.exports = OrderGovPositionInfoArea;
