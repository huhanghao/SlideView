import {
	StyleSheet,
  View,
  Text,
  TouchableOpacity,
	ListView,
	RefreshControl,
} from 'react-native';

import React, {
	PropTypes,
  Component,
} from 'react';

import CommonStyle from './res/CommonStyle';
import StringRes from './res/StringRes';
import Communications from 'react-native-communications';

import Icon from 'react-native-vector-icons/Ionicons';
import ApiUtils from './utils/ApiUtils';

const styles = StyleSheet.create({
	cardBg6x: {
		backgroundColor: 'white',
		height: CommonStyle.commonRowHeight * 6,
    margin: CommonStyle.pageHorizontalMargin,
		borderColor: CommonStyle.dividerGray,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
	},
  cardBg: {
		backgroundColor: 'white',
    height: CommonStyle.commonRowHeight * 5,
    margin: CommonStyle.pageHorizontalMargin,
		borderColor: CommonStyle.dividerGray,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
  },
  commonRow: {
    paddingLeft: CommonStyle.pageHorizontalMargin,
    flexDirection: 'row',
		alignItems: 'center',
    height: CommonStyle.commonRowHeight,
		borderColor: CommonStyle.dividerGray,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
  },
	marginLeftRow: {
		paddingLeft: CommonStyle.pageHorizontalMargin * 2 + CommonStyle.iconSize,
    flexDirection: 'row',
		alignItems: 'center',
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
  textTypeArea: {
    height: CommonStyle.iconSizeBig,
    width: CommonStyle.iconSizeBig,
    backgroundColor: CommonStyle.themeColorGreen,
		justifyContent: 'center',
  },
	textType: {
		color: 'white',
		fontSize: CommonStyle.bigFont,
		textAlign: 'center',
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
	dotLine: {
		borderStyle: 'dotted',
		borderWidth: CommonStyle.borderWidth,
		borderColor: CommonStyle.dividerGray,
		width: 0,
		flex: 1,
		marginLeft: CommonStyle.pageHorizontalMargin + CommonStyle.iconSize/2,
	},
	textIcon: {
		color: 'white',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
  startIcon: {
    marginTop: 15,
    marginLeft: CommonStyle.pageHorizontalMargin,
    height: CommonStyle.iconSize,
    width: CommonStyle.iconSize,
    backgroundColor: CommonStyle.themeColorGreen,
		justifyContent: 'center',
  },
  endIcon: {
    marginLeft: CommonStyle.pageHorizontalMargin,
    marginBottom: 15,
    height: CommonStyle.iconSize,
    width: CommonStyle.iconSize,
    backgroundColor: CommonStyle.themeColorRed,
		justifyContent: 'center',
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
	},
});

const TYPE_PIN = 0;
const TYPE_BAO = 1;
const TYPE_AIR = 2;

function ListPinItem({navigator, order}) {

	let orderCount = 1;
	let userCount = 1;
	if (order.order_busices == null) {
		orderCount = 0;
		userCount = 0;
	} else {
			orderCount = order.order_busices.length;
			userCount = 0;

			const orderList = order.order_busices;
			const size = orderList.length;
			let pos = 0;

			for(; pos <size; pos++) {
					userCount += orderList[pos].order_bus_passengers.length;
			}
	}

	const goToPinDetail = function() {
		navigator.push(
			{
					name: 'OrderPinDetailPage',
					params: {
						order: order,
					},
			}
		);
	};

  return(
    <TouchableOpacity
			style={styles.cardBg}
			onPress={goToPinDetail}
		>

      <View style={styles.commonRow}>
        <Text style={styles.textStatus}>
          {StringRes.getOrderStatus(order.status)}
        </Text>


				<View style={styles.textTypeArea}>
					<Text style={styles.textType}>
						拼
					</Text>
    		</View>

      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textTripNo}>
          派单号: {order.id}
      </Text>

      <Text style={styles.textTripOrders}>
        {orderCount}个订单{userCount}位乘客
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
              {order.start_area}
            </Text>
          </View>


          <View style={styles.textAddressArea}>
            <Text style={styles.textAddress}>
              {order.end_area}
            </Text>
          </View>

        </View>
      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textSendingTime}>
          发车时间: {order.start_time}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

function ListAirItem({navigator, order}) {

	let orderCount = 1;
	let userCount = 1;
	if (order.order_busices == null) {
		orderCount = 0;
		userCount = 0;
	} else {
			orderCount = order.order_busices.length;
			userCount = 0;

			const orderList = order.order_busices;
			const size = orderList.length;
			let pos = 0;

			for(; pos <size; pos++) {
					userCount += orderList[pos].order_bus_passengers.length;
			}
	}

	const goToAriDetail = function() {
		navigator.push(
			{
					name: 'OrderAirDetailPage',
					params: {
						order: order,
					},
			}
		);
	};

  return(
    <TouchableOpacity
			style={styles.cardBg}
			onPress={goToAriDetail}
		>

      <View style={styles.commonRow}>
        <Text style={styles.textStatus}>
          {StringRes.getOrderStatus(order.status)}
        </Text>


				<View style={styles.textTypeArea}>
					<Text style={styles.textType}>
						机
					</Text>
    		</View>

      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textTripNo}>
          派单号: {order.id}
      </Text>

      <Text style={styles.textTripOrders}>
        {orderCount}个订单{userCount}位乘客
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
              {order.start_area}
            </Text>
          </View>


          <View style={styles.textAddressArea}>
            <Text style={styles.textAddress}>
              {order.end_area}
            </Text>
          </View>

        </View>
      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textSendingTime}>
          发车时间: {order.start_time}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

function ListBaoItem({order, navigator}) {

	let userCount = 1;
	let user = {};
	if (order.order_busices == null && order.order_busices[0] == null) {
		userCount = 1;
	} else {
		// userCount = order.order_busices[0].order_bus_passengers == null ? 1 : order.order_busices[0].order_bus_passengers.length;
		userCount = 1;
	}

	const goToBaoDetail = function() {
		navigator.push(
			{
					name: 'OrderBaoDetailPage',
					params: {
		        order: order,
		      },
			}
		);
	};


  return(
    <TouchableOpacity
			style={styles.cardBg6x}
			onPress={goToBaoDetail}
		>

      <View style={styles.commonRow}>
        <Text style={styles.textStatus}>
          {StringRes.getOrderStatus(order.status)}
        </Text>


				<View style={styles.textTypeArea}>
					<Text style={styles.textType}>
						包
					</Text>
    		</View>
      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textTripNo}>
          派单号: {order.id}
      </Text>

      <Text style={styles.textTripOrders}>
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
            <Text style={styles.textAddress}>
              {order.start_area}
            </Text>
          </View>


          <View style={styles.textAddressArea}>
            <Text style={styles.textAddress}>
              {order.end_area}
            </Text>
          </View>

        </View>
      </View>

      <View style={styles.marginLeftRow}>
        <Text style={styles.textSendingTime}>
          发车时间: {order.start_time}
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
          {order.order_busices[0].user_name} {order.order_busices[0].user_phone}
        </Text>

				<TouchableOpacity style={styles.userRightIconArea}
					onPress={() => {
							Communications.phonecall(order.order_busices[0].user_phone, true);;
						}
					}

				>
					<Icon
						name='ios-call'
						size={CommonStyle.iconSize}>
					</Icon>
				</TouchableOpacity>

      </View>

    </TouchableOpacity>
  );
};

var flagTime = '';

class TripList extends Component {
  constructor(props) {
    super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	    dataSource: ds.cloneWithRows([]),
			page: 1,
			pageSize: 10,
			hasMore: false,
			data: [],
			refreshing: false,
			start_time: props.start_time,
			end_time: props.end_time,
	  };

		this.renderItem = this.renderItem.bind(this);
		this.loadDataFromServe = this.loadDataFromServe.bind(this);
		this.reloadOrderList = this.reloadOrderList.bind(this);
		this.loadMoreOrderList = this.loadMoreOrderList.bind(this);
  }

	componentDidMount() {
		this.reloadOrderList()
	}

	componentWillReceiveProps(nextProps) {
			console.log('componentWillReceiveProps nextProps = ' + nextProps.start_time + ' this.props = ' + this.props.start_time);
			console.log('componentWillReceiveProps nextProps = ' + nextProps.end_time + ' this.props = ' + this.props.end_time);
			let startTimeEqual = nextProps.start_time === this.props.start_time;
			let endTimeEqual = nextProps.end_time === this.props.end_time;
			//
			// // three step
			// // 1. when different, save next time flagTime
			// if (!startTimeEqual) flagTime = nextProps.start_time;
			// // 2. when flagTime equals current time, enough! let's start
			// if (flagTime === this.props.start_time) {
			// 	this.reloadOrderList();
			// }
			if (!startTimeEqual || !endTimeEqual) {
				// this.setState({
				// 	start_time: nextProps.start_time,
				// 	end_time: nextProps.end_time
				// });

				console.log('props func start_time = ' + nextProps.start_time);
				console.log('props func end_time = ' + nextProps.end_time);

				this.reloadOrderList(nextProps.start_time, nextProps.end_time);
			}
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('nextProps = ' + nextProps.start_time + ' this.props = ' + this.props.start_time);
	// 	let startTimeEqual = nextProps.start_time === this.props.start_time;
	// }
	//
	// componentWillUpdate() {
	// 	this.loadDataFromServe();
	// }

	goToPinDetail(rowData) {
		this.props.navigator.push(
			{
					name: 'OrderPinDetailPage',
					params: {
		        order: rowData,
		      },
			}
		);
	}

	arrayMerge(arr1, arr2) {
	 return arr1.concat(arr2.filter((item) =>
		 arr1.indexOf(item) < 0
	 ));
 	}

	reloadOrderList(start_time, end_time) {
    this.setState({ page: 1 });

		if (start_time == null) {
			start_time = this.props.start_time;
		}

		if (end_time == null) {
			end_time = this.props.end_time;
		}

    this.loadDataFromServe(start_time, end_time, 1);
  }

  loadMoreOrderList() {
    if (this.state.hasMore) {
      this.setState({
        page: this.state.page + 1,
      });

			const start_time = this.props.start_time;
			const end_time = this.props.end_time;

      this.loadDataFromServe(start_time, end_time);
    }
  }

	loadDataFromServe(start_time, end_time, page) {

		const callback = {
			success: data => {
				if (this.props.loadingViewFunc != null) {
					this.props.loadingViewFunc(false);
				}

				let hasMore = true;
				if (data != null && data.length < this.state.pageSize) {
					hasMore = false;
				}

				if (data == null) {
					data = [];
				}

				console.log('success, page = ' + this.state.page + ' data.size = ' + data.length);

				if (this.state.page === 1) {
					this.setState({
					 dataSource: this.state.dataSource.cloneWithRows(data),
					 data,
					 hasMore,
					 refreshing: false,
					});
				} else {
					const originData = this.state.data;
					const combinedArray = this.arrayMerge(originData, data);
					this.setState({
					 dataSource: this.state.dataSource.cloneWithRows(combinedArray),
					 data: combinedArray,
					 hasMore,
					 refreshing: false,
					});
 				}
			},
			failed: msg => {
				if (this.props.loadingViewFunc != null) {
					this.props.loadingViewFunc(false);
				}
				alert(msg);
			},
		};

		if (this.props.loadingViewFunc != null) {
			this.props.loadingViewFunc(true);
		}

		let requestPage = 0;
		if (page != null) {
			requestPage = page;
		} else {
			requestPage = this.state.page;
		}

		const params = {
			start_time: start_time,
			end_time: end_time,
			status: this.props.status,
			page_num: requestPage,
			page_size: this.state.pageSize,
		};

		console.log('post params = ' + JSON.stringify(params));

		ApiUtils.postRequest({funcName: 'busline/batch/list', params
			, callback});
	}

	renderItem(rowData) {
		console.log('rowData.type = ' + rowData.type);
		if (rowData.type == TYPE_PIN) {
			return (
				<ListPinItem
					navigator={this.props.navigator}
					order={rowData}
				/>
			);
		} else if (rowData.type == TYPE_BAO) {
			return (
				<ListBaoItem
					navigator={this.props.navigator}
					order={rowData}
				/>
			);
		} else if (rowData.type == TYPE_AIR) {
			return (
				<ListAirItem
					navigator={this.props.navigator}
					order={rowData}
				/>
			);
		}
	}

  render() {
      return (
					<ListView
						dataSource={this.state.dataSource}
						renderRow={(rowData) => this.renderItem(rowData)}
						onEndReached={this.loadMoreOrderList}
						refreshControl={
		          <RefreshControl
		            refreshing={this.state.refreshing}
		            onRefresh={this.reloadOrderList}
		          />
		        }
					/>
  	   );
  }
}

TripList.propTypes = {
	navigator: PropTypes.object,
	status: PropTypes.String,
	start_time: PropTypes.String,
	end_time: PropTypes.String,
	loadingViewFunc: PropTypes.func,
};

module.exports = TripList;
