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
import StringRes from './res/StringRes';
import Communications from 'react-native-communications';
import ApiUtils from './utils/ApiUtils';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	cardBg6x: {
		backgroundColor: 'white',
		height: CommonStyle.commonRowHeight * 6,
		margin: CommonStyle.pageHorizontalMargin,
    borderColor: CommonStyle.dividerGray,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
	},
  cardBg5x: {
		backgroundColor: 'white',
    height: CommonStyle.commonRowHeight * 5,
		margin: CommonStyle.pageHorizontalMargin,
    borderColor: CommonStyle.dividerGray,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
  },
  cardBg2x: {
    backgroundColor: 'white',
    height: CommonStyle.commonRowHeight * 2,
		margin: CommonStyle.pageHorizontalMargin,
    borderColor: CommonStyle.dividerGray,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
  },
	cardBg: {
    backgroundColor: 'white',
    borderColor: CommonStyle.dividerGray,
    margin: CommonStyle.pageHorizontalMargin,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
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
	userRow: {
		flexDirection: 'row',
		alignItems: 'center',
    height: CommonStyle.commonRowHeight,
	},
	userDetailArea: {
		height: CommonStyle.commonRowHeight,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: CommonStyle.pageHorizontalMargin,
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
  textStatus: {
    textAlign: 'justify',
    textAlignVertical: 'center',
    marginRight: CommonStyle.pageHorizontalMargin,
    fontSize: CommonStyle.mediumFont,
    color: CommonStyle.themeColorGreen,
  },
	textPassagerCount: {
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
    backgroundColor: CommonStyle.themeColorRed,
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
  textAddressColor: {
    fontSize: CommonStyle.mediumFont,
		color: CommonStyle.themeColorGreen,
  },
	textAddress: {

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
    fontSize: CommonStyle.mediumFont,
	},
	buttonArea: {
		height: CommonStyle.mediumButtonHeight,
		width: CommonStyle.mediumButtonWidth,
		borderWidth: CommonStyle.borderWidth,
    borderColor: CommonStyle.dividerGray,
		borderRadius: CommonStyle.commonRadius,
		alignItems: 'center',
		flexDirection: 'row',
		marginLeft: CommonStyle.pageHorizontalMargin,
		marginRight: CommonStyle.pageHorizontalMargin,
	},
	buttonIcon: {
		marginLeft: 2,
		marginRight: 2,
	},
	buttonText: {
		color: CommonStyle.themeColorGreen,
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	textMsgArea: {
		padding: CommonStyle.pageHorizontalMargin,
		height: CommonStyle.commonRowHeight * 1 - CommonStyle.borderWidth * 2,
	},
	textMsg: {
		flex: 1,
	},
	subHeadRow: {
		alignItems: 'center',
		flexDirection: 'row',
		height: CommonStyle.commonRowHeight,
		backgroundColor: CommonStyle.themeColorGreen,
	},
	typeArea: {
		marginLeft: CommonStyle.pageHorizontalMargin,
		height: CommonStyle.iconSizeBig,
		width: CommonStyle.iconSizeBig,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: CommonStyle.borderWidth,
		borderColor: 'white',
		borderRadius: CommonStyle.iconSizeBig/2,
	},
	textType: {
		fontSize: CommonStyle.mediumFont,
		color: 'white',
	},
	subTitle: {
		color: 'white',
		fontSize: CommonStyle.bigFont,
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	spaceTypeArea: {
		marginRight: CommonStyle.pageHorizontalMargin,
		height: CommonStyle.iconSizeBig,
		width: CommonStyle.iconSizeBig,
	}

});

function ListHeader({order}) {
  return(
		<View>

			<View
				style={styles.subHeadRow}>
				<View
					style={styles.typeArea}
				>
				<Text style={styles.textType}>拼</Text>
    		</View>

				<Text
					style={styles.subTitle}
				>
				{order.batch_name}
				</Text>

				<View
					style={styles.spaceTypeArea}
				>
    		</View>

   		</View>

	    <View style={styles.cardBg2x}>

	      <View style={styles.commonRow}>
	        <Text style={styles.textTripNo}>
	          派单号: {order.id}
	      	</Text>

		      <Text style={styles.textStatus}>
		        {StringRes.getOrderStatus(order.status)}
		    	</Text>
	      </View>

				<View style={styles.commonRow}>
	        <Text style={styles.textTripNo}>
	          发车时间: {order.start_time}
	      	</Text>
	      </View>

	    </View>

		</View>
  );
};

class TTButton extends Component {

	constructor(props) {
    super(props);

		this.onItemClick = this.onItemClick.bind(this);
	}

	onItemClick() {
		this.props.onPress && this.props.onPress(this.props.data);
	}

	render() {
		return(
			<TouchableOpacity
				style={styles.buttonArea}
				onPress={this.onItemClick}
			>
				<Icon
					style={styles.buttonIcon}
					name={this.props.iconName}
					size={CommonStyle.iconSizeSmall}
					color={this.props.color} />
				<Text style={[styles.buttonText, {color: this.props.color}]}>{this.props.text}</Text>
	  	</TouchableOpacity>
		);
	}
}

class UserList extends Component{

	constructor(props) {
    super(props);

		const userList = props.data.order_bus_passengers;

		let buttonTextPick = '';
		if (props.data.status === 'assigned') {
			buttonTextPick = '接到乘客';
		} else if(props.data.status === 'trip'){
			buttonTextPick = '乘客到达';
		} else {
			buttonTextPick = '';
		}

		// alert(props.orderStatus);

		let buttonShow = false;
		if (props.orderStatus === 'start' && buttonTextPick != '') {
			buttonShow = true;
		}

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	    dataSource: ds.cloneWithRows(userList),
			buttonShow,
			buttonTextPick,
			ds,
	  };

		this.renderButton = this.renderButton.bind(this);
		this.onButtonPickArriveClick = this.onButtonPickArriveClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data != null) {

			let buttonTextPick = '';
			if (nextProps.data.status === 'assigned') {
				buttonTextPick = '接到乘客';
			} else if(nextProps.data.status === 'trip'){
				buttonTextPick = '乘客到达';
			} else {
				buttonTextPick = '';
			}

			// alert(props.orderStatus);

			let buttonShow = false;
			if (nextProps.orderStatus === 'start' && buttonTextPick != '') {
				buttonShow = true;
			}


			this.setState({
				dataSource: this.state.ds.cloneWithRows(
					nextProps.data.order_bus_passengers,
				),
				buttonShow,
				buttonTextPick,
			});
		};
	}

	onCallPressed(phone) {
		Communications.phonecall(phone, true);
	}

	onButtonPickArriveClick(order) {
		this.props.onPickArriveClick && this.props.onPickArriveClick(order.id, order.status);
	}

	renderButton(user) {
		if (this.state.buttonShow) {
			return (
				<View style={{ flexDirection: 'row' }}
				>
					<TTButton iconName="ios-person"
						text="联系乘客"
						color={CommonStyle.themeColorGreen}
						onPress={this.onCallPressed}
						data={user.phone}
					/>

					<TTButton iconName="ios-person"
						text={this.state.buttonTextPick}
						color={CommonStyle.themeColorGreen}
						onPress={this.onButtonPickArriveClick}
						data={this.props.data}
					/>
	   		</View>
			);
		} else {
			return null;
		}
	}

	renderItem(user) {
		return (
			<View style={styles.userRow}>

				<View style={styles.userLeftIconArea}>
					<Icon
						name='ios-person'
						size={CommonStyle.iconSize}>
					</Icon>
				</View>

				<View style={styles.userDetailArea}>
					<Text style={styles.textUserInfo}>
						{user.name}
					</Text>

					{
						this.renderButton(user)
					}

    		</View>

			</View>
		);
	}

	render(){
		return(
			<ListView
				dataSource={this.state.dataSource}
				renderRow={(rowData) => this.renderItem(rowData)}
			/>
		);

	};
};

class OrderPinContent extends Component {
  constructor(props) {
    super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	    dataSource: ds.cloneWithRows(
				props.order.order_busices
			),
			order: props.order,
			isRefreshing: false,
			ds,
	  };

		this.renderItem = this.renderItem.bind(this);
		this.onPickArriveClick = this.onPickArriveClick.bind(this);
		this.apiPick = this.apiPick.bind(this);
		this.apiArrived = this.apiArrived.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
  }

	componentWillReceiveProps(nextProps) {
		if (nextProps.order != null) {
			this.setState({
				dataSource: this.state.ds.cloneWithRows(
					nextProps.order.order_busices
				),
				order: nextProps.order,
			});
		};
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// }

	onPickArriveClick(subOrderId, subOrderStatus) {
		if (subOrderStatus === 'assigned') {
			this.apiPick(subOrderId);
		} else {
			this.apiArrived(subOrderId);
		}
	}

	apiPick(subOrderId) {
		const callback = {
			success: (data) => {
				this.setState(
					{
						isRefreshing: false,
						order: data,
					},
				);
				// alert(JSON.stringify(data));
				this.onRefresh();
			},
			failed: (msg) => {
				alert('apiPick failed ' + msg);
				this.setState(
					{
						isRefreshing: false,
					}
				);
			}
		};

		const params = {
			bus_line_batch_id: this.state.order.id,
			order_bus_id: subOrderId,
		}

		ApiUtils.postRequest({funcName: 'busline/order/catched/piece', params, callback});
	}

	apiArrived(subOrderId) {
		const callback = {
			success: (data) => {
				this.setState(
					{
						isRefreshing: false,
					},
				);
				this.onRefresh();
				// alert(JSON.stringify(data));
			},
			failed: (msg) => {
				alert('apiArrived failed ' + msg);
				this.setState(
					{
						isRefreshing: false,
					}
				);
			}
		};

		const params = {
			bus_line_batch_id: this.state.order.id,
			order_bus_id: subOrderId,
		}

		ApiUtils.postRequest({funcName: 'busline/order/arrived/piece', params, callback});
	}

	onRefresh() {
		this.props.onRefresh();
	}

	renderMsgArea(show, msg) {
		if (show) {
			return (
				<View style={styles.textMsgArea}>
					<Text style={styles.textMsg}>
						留言:{msg}
					</Text>
    		</View>
			);
		} else {
			return null;
		}
	}

	renderItem(order) {
		var userCount = order.order_bus_passengers.length;
		var msgHeight = 0;
		if (order.msg != null && order.msg.length > 0) {
			msgHeight = 1;
		}

		return (
			<View style={[styles.cardBg, {height: CommonStyle.commonRowHeight * (3+msgHeight+userCount)}]}>
				<View style={styles.commonRow}>
					<Text style={styles.textTripNo}>
						订单号: {order.id}
					</Text>

					<Text style={styles.textPassagerCount}>
						{userCount}位乘客
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
	            <Text style={styles.textAddressColor}>
	              {order.start_area}
	            </Text>
							<Text style={styles.textAddress}>
	              {order.start_place}
	            </Text>
	          </View>


	          <View style={styles.textAddressArea}>
	            <Text style={styles.textAddressColor}>
	              {order.end_area}
	            </Text>
							<Text style={styles.textAddress}>
	              {order.end_place}
	            </Text>
	          </View>

	        </View>
	      </View>

				<UserList
					data={order}
					orderStatus={this.state.order.status}
					onPickArriveClick={this.onPickArriveClick}
				/>
				{
					this.renderMsgArea(msgHeight === 1, order.remark)
				}
   		</View>
		);
	}

  render() {
      return (
				<View style={styles.content}>
				<ListHeader
					order={this.state.order}
				/>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => this.renderItem(rowData)}
				/>
    		</View>
  	   );
  }
}

OrderPinContent.propTypes = {
	navigator: PropTypes.object,
};

module.exports = OrderPinContent;
