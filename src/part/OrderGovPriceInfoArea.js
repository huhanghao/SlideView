import {
  View,
  StyleSheet,
  Text,
  ListView,
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
    marginBottom: 10,
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
    fontSize: 13,
  },
  txtCommonContent: {
    color: CommonStyle.themeColorGreen,
    marginLeft: 10,
    flex: 3,
    textAlign: 'right',
    fontSize: 13,
  },
  divider: {
    width: 1,
    backgroundColor: CommonStyle.dividerGray,
    height: 30,
  },
  textTitle: {
    margin: 10,
  }
});


class OrderGovPriceInfoArea extends React.Component {

  constructor(props) {
    super(props);

    var array = props.order.order_fee_details;

    if (array == null) {
      array = [];
    }

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isNull: array.length == 0,
      order: props.order,
      dataSource: ds.cloneWithRows(array),
    };
  }

  componentWillReceiveProps(nextProps) {
    var array = nextProps.order.order_fee_details;

    if (array == null) {
      array = [];
    }

    this.setState({
      isNull: array.length == 0,
      dataSource: this.state.dataSource.cloneWithRows(array),
    });
  }

  renderItemRow(rowData) {
    return(
      <View style={ styles.row }>
        <Text style={ styles.txtCommonTitle }>
          {rowData.fee_name}
        </Text>

        <View style={ styles.divider }/>

        <Text style={ styles.txtCommonContent }>
          {rowData.total_fee}元
        </Text>
      </View>
    );
  }

  renderTitle(isNull) {
    if (isNull) {
      return null;
    }else {
      return (
        <Text style={ styles.textTitle }>
          费用明细
        </Text>
      );
    }
  }

  render() {
    return (
      <View>

        { this.renderTitle(this.state.isNull) }

        <ListView style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this.renderItemRow}
        />

      </View>
    );

  }
}

OrderGovPriceInfoArea.propTypes = {
  navigator: PropTypes.object,
};

module.exports = OrderGovPriceInfoArea;
