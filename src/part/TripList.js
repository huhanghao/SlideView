import {
	StyleSheet,
  View,
  Text,
  TouchableOpacity,
	ListView,
} from 'react-native';

import React, {
	PropTypes,
  Component,
} from 'react';

import CommonStyle from './res/CommonStyle';

import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
	cardBg6x: {
		backgroundColor: 'white',
		height: CommonStyle.commonRowHeight * 6,
    borderColor: CommonStyle.dividerGray,
    margin: CommonStyle.pageHorizontalMargin,
    borderWidth: CommonStyle.borderWidth,
	},
  cardBg: {
		backgroundColor: 'white',
    height: CommonStyle.commonRowHeight * 5,
    borderColor: CommonStyle.dividerGray,
    margin: CommonStyle.pageHorizontalMargin,
    borderWidth: CommonStyle.borderWidth,
  },
  commonRow: {
    paddingLeft: CommonStyle.pageHorizontalMargin,
    flexDirection: 'row',
    height: CommonStyle.commonRowHeight,
    borderBottomWidth: CommonStyle.borderWidth,
    borderBottomColor: CommonStyle.dividerGray,
  },
	marginLeftRow: {
		paddingLeft: CommonStyle.pageHorizontalMargin * 2 + CommonStyle.iconSize,
    flexDirection: 'row',
    height: CommonStyle.commonRowHeight,
		borderBottomWidth: CommonStyle.borderWidth,
    borderBottomColor: CommonStyle.dividerGray,
	},
	lastRow: {
		flexDirection: 'row',
		alignItems: 'center',
    height: CommonStyle.commonRowHeight,
		borderBottomWidth: CommonStyle.borderWidth,
    borderBottomColor: CommonStyle.dividerGray,
	},
  textStatus: {
    fontSize: CommonStyle.bigFont,
    flex: 1,
    textAlign: 'justify',
    textAlignVertical: 'center',
  },
  textType: {
    fontSize: CommonStyle.bigFont,
    height: CommonStyle.iconSizeBig,
    width: CommonStyle.iconSizeBig,
    backgroundColor: CommonStyle.themeColorGreen,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  textTripNo: {
    flex: 1,
    textAlign: 'justify',
    textAlignVertical: 'center',
    fontSize: CommonStyle.mediumFont,
  },
  textTripOrders: {
    textAlign: 'justify',
    textAlignVertical: 'center',
    marginRight: CommonStyle.pageHorizontalMargin,
    fontSize: CommonStyle.mediumFont,
  },
  addressArea: {
    flexDirection: 'row',
    height: CommonStyle.commonRowHeight * 2,
  },
  startIcon: {
    marginTop: 15,
    marginLeft: CommonStyle.pageHorizontalMargin,
    borderRadius: CommonStyle.iconSize / 2,
    height: CommonStyle.iconSize,
    width: CommonStyle.iconSize,
    backgroundColor: CommonStyle.themeColorGreen,
  },
  dotLine: {
    borderStyle: 'dotted',
    borderWidth: CommonStyle.borderWidth,
    borderColor: CommonStyle.dividerGray,
    width: 0,
    flex: 1,
    marginLeft: CommonStyle.pageHorizontalMargin + CommonStyle.iconSize/2,
  },
  endIcon: {
    marginLeft: CommonStyle.pageHorizontalMargin,
    marginBottom: 15,
    borderRadius: CommonStyle.iconSize / 2,
    height: CommonStyle.iconSize,
    width: CommonStyle.iconSize,
    backgroundColor: CommonStyle.themeColorGreen,
  },
	userLeftIconArea: {
		marginLeft: CommonStyle.pageHorizontalMargin,
		height: CommonStyle.iconSize,
		width: CommonStyle.iconSize,
		justifyContent: 'center',
		alignItems: 'center',
	},
	userRightIconArea: {
		marginRight: CommonStyle.pageHorizontalMargin,
		height: CommonStyle.iconSizeBig,
		width: CommonStyle.iconSizeBig,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: CommonStyle.borderWidth,
		borderColor: CommonStyle.dividerGray,
		borderRadius: CommonStyle.iconSizeBig/2,
	},
	userLeftIcon: {
	},
  textIcon: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: CommonStyle.iconSize,
    width: CommonStyle.iconSize,
  },
  startEndArea: {
    flex: 1,
    marginLeft: CommonStyle.pageHorizontalMargin,
  },
  textAddress: {
    fontSize: CommonStyle.bigFont,
  },
  textAddressArea: {
    height: CommonStyle.commonRowHeight,
    borderBottomWidth: CommonStyle.borderWidth,
    borderBottomColor: CommonStyle.dividerGray,
    justifyContent: 'center',
  },
  textSendingTime: {
    textAlign: 'justify',
    textAlignVertical: 'center',
    fontSize: CommonStyle.mediumFont,
  },
	textUserInfo: {
		flex: 1,
		textAlign: 'justify',
    textAlignVertical: 'center',
		marginLeft: CommonStyle.pageHorizontalMargin,
    fontSize: CommonStyle.mediumFont,
	}

});

function ListPinItem({onItemClick}) {
  return(
    <TouchableOpacity
			style={styles.cardBg}
			onPress={onItemClick}
		>

      <View style={styles.commonRow}>
        <Text style={styles.textStatus}>
          进行中...
        </Text>

        <Text style={styles.textType}>
          拼
        </Text>
      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textTripNo}>
          派单号: 12345678
      </Text>

      <Text style={styles.textTripOrders}>
        3个订单4位乘客
      </Text>
      </View>


      <View style={styles.addressArea}>

        {/*left icon area*/}
        <View>
          <View style={styles.startIcon}>
            <Text style={styles.textIcon}>
              起
            </Text>
          </View>

          <View style={styles.dotLine}>
          </View>

          <View style={styles.endIcon}>
            <Text style={styles.textIcon}>
              终
            </Text>
          </View>
        </View>

        {/*right address info*/}
        <View style={styles.startEndArea}>

          <View style={styles.textAddressArea}>
            <Text style={styles.textAddress}>
              昆明市螺狮湾公交枢纽站
            </Text>
          </View>


          <View style={styles.textAddressArea}>
            <Text style={styles.textAddress}>
              昆明市螺狮湾公交枢纽站
            </Text>
          </View>

        </View>
      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textSendingTime}>
          发车时间: 2016-03-06 11:00:00
        </Text>
      </View>

    </TouchableOpacity>
  );
};

function ListBaoItem({onItemClick}) {
  return(
    <TouchableOpacity
			style={styles.cardBg6x}
			onPress={onItemClick}
		>

      <View style={styles.commonRow}>
        <Text style={styles.textStatus}>
          进行中...
        </Text>

        <Text style={styles.textType}>
          包
        </Text>
      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textTripNo}>
          派单号: 12345678
      </Text>

      <Text style={styles.textTripOrders}>
        3个订单4位乘客
      </Text>
      </View>


      <View style={styles.addressArea}>

        {/*left icon area*/}
        <View>
          <View style={styles.startIcon}>
            <Text style={styles.textIcon}>
              起
            </Text>
          </View>

          <View style={styles.dotLine}>
          </View>

          <View style={styles.endIcon}>
            <Text style={styles.textIcon}>
              终
            </Text>
          </View>
        </View>

        {/*right address info*/}
        <View style={styles.startEndArea}>

          <View style={styles.textAddressArea}>
            <Text style={styles.textAddress}>
              昆明市螺狮湾公交枢纽站
            </Text>
          </View>


          <View style={styles.textAddressArea}>
            <Text style={styles.textAddress}>
              昆明市螺狮湾公交枢纽站
            </Text>
          </View>

        </View>
      </View>

      <View style={styles.marginLeftRow}>
        <Text style={styles.textSendingTime}>
          发车时间: 2016-03-06 11:00:00
        </Text>
      </View>

			<View style={styles.lastRow}>

				<View style={styles.userLeftIconArea}>
					<Icon
						name='ios-person'
						size={CommonStyle.iconSize}>
					</Icon>
    		</View>

        <Text style={styles.textUserInfo}>
          胡女士 182****3335
        </Text>

				<View style={styles.userRightIconArea}>
					<Icon
						name='ios-call'
						size={CommonStyle.iconSize}>
					</Icon>
				</View>

      </View>

    </TouchableOpacity>
  );
};

class TripList extends Component {
  constructor(props) {
    super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	    dataSource: ds.cloneWithRows([{
				isBao: true,
			},
			{
				isBao: true,
			},
			{
				isBao: false,
			},
			{
				isBao: false,
			},
			{
				isBao: false,
			},
			{
				isBao: false,
			},
			{
				isBao: false,
			},
			{
				isBao: false,
			}]),
	  };

		this.goToBaoDetail = this.goToBaoDetail.bind(this);
		this.goToPinDetail = this.goToPinDetail.bind(this);
		this.renderItem = this.renderItem.bind(this);
  }

	goToBaoDetail() {
		this.props.navigator.push(
			{
					name: 'OrderBaoDetailPage',
			}
		);
	}

	goToPinDetail() {
		this.props.navigator.push(
			{
					name: 'OrderPinDetailPage',
			}
		);
	}

	renderItem(rowData) {
		if (rowData.isBao) {
			return (
				<ListBaoItem
					onItemClick={this.goToBaoDetail}/>
			);
		} else {
			return (
				<ListPinItem
					onItemClick={this.goToPinDetail}/>
			);
		}
	}

  render() {
      return (
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => this.renderItem(rowData)}
				/>
  	   );
  }
}

TripList.propTypes = {
	navigator: PropTypes.object,
};

module.exports = TripList;
