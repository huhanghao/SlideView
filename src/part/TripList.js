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
import AlertUtils from './utils/AlertUtils';

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
		borderBottomWidth: CommonStyle.borderWidth,
    borderBottomColor: CommonStyle.dividerGray,
  },
	commonRowVertical: {
		paddingLeft: CommonStyle.pageHorizontalMargin,
		height: CommonStyle.commonRowHeight,
		justifyContent: 'center',
		borderBottomWidth: CommonStyle.borderWidth,
		borderBottomColor: CommonStyle.dividerGray,
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
	textTripNoPro: {

	},
	textOrderUsersCount: {
		marginTop: 5,
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
	addressArea1x: {
		flexDirection: 'row',
		height: CommonStyle.commonRowHeight,
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
const TYPE_GONG = 3;

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

      <View style={styles.commonRowVertical}>
        <Text style={styles.textTripNoPro}>
          派单号: {order.id}
	      </Text>

	      <Text style={styles.textOrderUsersCount}>
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

function ListGongItem({navigator, order}) {

	const goToOrderGovDetailPage = function() {
		navigator.push(
			{
					name: 'OrderGovDetailPage',
					params: {
						order: order,
					},
			}
		);
	};

	return (
		<TouchableOpacity
			style={styles.cardBg}
			onPress={goToOrderGovDetailPage}
		>

      <View style={styles.commonRow}>
        <Text style={styles.textStatus}>
          {StringRes.getOrderStatus(order.status)}
        </Text>


				<View style={styles.textTypeArea}>
					<Text style={styles.textType}>
						公
					</Text>
    		</View>

      </View>

      <View style={styles.commonRowVertical}>
        <Text style={styles.textTripNoPro}>
          派单号: {order.id}
      	</Text>
      </View>


      <View style={styles.addressArea1x}>

        {/*left icon area*/}
        <View>
          <View style={styles.startIcon}>
            <Text style={styles.textIcon}>
              起
            </Text>
          </View>
        </View>

        {/*right address info*/}
        <View style={styles.startEndArea}>

          <View style={styles.textAddressArea}>
            <Text style={styles.textAddress}>
              {order.start_place}
            </Text>
          </View>
        </View>

      </View>

      <View style={styles.commonRow}>
        <Text style={styles.textSendingTime}>
          发车时间: {order.use_time}
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
					{order.user == null ? '' : order.user.username} {order.user == null ? '' : StringRes.getEncodePhoneNum(order.user.phone)}
				</Text>

				<TouchableOpacity style={styles.userRightIconArea}
					onPress={() => {
							// Communications.phonecall(order.order_busices[0].user_phone, true);;
							Communications.phonecall(order.user.phone, true);;
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
}

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

      <View style={styles.commonRowVertical}>
        <Text style={styles.textTripNoPro}>
          派单号: {order.id}
      </Text>

      <Text style={styles.textOrderUsersCount}>
        {orderCount}个订单{userCount}位乘客
      </Text>
      </View>


      <View style={styles.addressArea}>


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

			<View style={styles.commonRowVertical}>
				<Text style={styles.textTripNoPro}>
						派单号: {order.id}
				</Text>

				<Text style={styles.textOrderUsersCount}>
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
					if (data.length == 0) {
						// for empty view
						data = ['bilibili'];
					}

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
				var data = [];

				// for empty view
				data = ['bilibili'];

				// data.push(JSON.parse('{ "id": "6e5134d1ef3e4dbbba0c6f87b8434408", "car_id": "7a29c859f52d4a54bae838f069f9866e", "staff_id": "3aab99ebd6b34c328ebef84d30514e68", "user_id": "70550e1b04884171a83b1fea9fe80ad1", "start_place": "滇缅大道137号", "start_lat": 25, "start_lng": 102, "fact_start_place": null, "fact_start_lat": null, "fact_start_lng": null, "fact_end_place": null, "fact_end_lat": null, "fact_end_lng": null, "use_time": "2016-10-20 22:00:00", "start_time": null, "end_time": null, "start_mile": null, "end_mile": null, "total_fee": null, "status": "normal", "create_date": "2016-10-19 17:06:37", "status_date": "2016-10-20 10:15:47", "type": 3, "car": { "id": "7a29c859f52d4a54bae838f069f9866e", "model": "ABCD", "shift": "手动", "volume": "1.6", "color": "白", "seat": 4, "text": null, "avatar": null, "car_num": "云A11011", "car_start_date": "2016-10-03 00:00:00", "car_category_id": 1, "is_charter": 1, "is_special": 1, "staff_id": "29cdcf8beafa455ab2d5cc3be8b19fd1", "is_rent": 1, "status": 0, "area_id": 530100, "company_id": "2b00e97a2a2a45ab9f5fb92982910bc8", "create_date": "2016-10-10 15:35:53", "status_date": "2016-10-18 15:05:19" }, "user": { "id": "70550e1b04884171a83b1fea9fe80ad1", "avatar": null, "username": "雷锋", "password": "202CB962AC59075B964B07152D234B70", "phone": "13220161903", "sex": 1, "openid": null, "account": 9977945.23, "company_id": null, "status": 1, "create_date": "2016-10-11 16:46:48", "status_date": "2016-10-18 11:15:00" }, "driver": { "id": "3aab99ebd6b34c328ebef84d30514e68", "avatar": null, "name": "龚江鹏", "phone": "18502818214", "id_card": "530112199108191618", "driving_license_type": 1, "driving_license": "530112199108191618", "stars": 0, "account": 0, "status": 1, "car_num": "云A11111", "model": "EDC", "company_id": "2b00e97a2a2a45ab9f5fb92982910bc8", "company_name": "你猜" }, "evaluate": null, "car_price": { "id": "1ee3927c1b0141979e2da8f6b2845c42", "car_id": "7a29c859f52d4a54bae838f069f9866e", "day_price": 100, "base_mile": 80, "mile_price": 1.2, "base_hour": 8, "hour_price": 1, "create_date": "2016-10-12 15:40:39", "status_date": "2016-10-19 13:10:05" }, "order_fee_detail_list": [ ] }'));
				//
				// console.log('data = ' + JSON.stringify(data));
				//
				// var hasMore = false;
				//
				// try{
				// 	this.setState({
				// 	 dataSource: this.state.dataSource.cloneWithRows(data),
				// 	 data,
				// 	 hasMore,
				// 	 refreshing: false,
				// 	});
				// } catch (e) {
				// 	console.log(e);
				// }

				if (this.props.loadingViewFunc != null) {
					this.props.loadingViewFunc(false);
				}

				AlertUtils.alert(msg);

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
		if ('bilibili' == rowData) {
			return (
				<View style={
					{
						height: 400,
						alignItems: 'center',
						justifyContent: 'center',
					}
				}>

				<Text
					style={
						{

						}
					}
				>
						您暂时没有订单任务，可以下拉刷新试试哦。
				</Text>


				</View>
			)
		}
		else if (rowData.type == TYPE_PIN) {
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
		} else if (rowData.type == TYPE_GONG) {
			return (
				<ListGongItem
					navigator={this.props.navigator}
					order={rowData}
				/>
			);
		}
	}

  render() {
      return (
					<View style={ {flex: 1} }>
						<ListView
							style={ {flex: 1} }
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
     			</View>

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
