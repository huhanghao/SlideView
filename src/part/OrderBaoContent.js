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
	content: {
		flex: 1,
	},
	cardBg6x: {
		backgroundColor: 'white',
		height: CommonStyle.commonRowHeight * 6,
    borderColor: CommonStyle.dividerGray,
    margin: CommonStyle.pageHorizontalMargin,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
	},
  cardBg5x: {
		backgroundColor: 'white',
    height: CommonStyle.commonRowHeight * 5,
    borderColor: CommonStyle.dividerGray,
    margin: CommonStyle.pageHorizontalMargin,
    borderWidth: CommonStyle.borderWidth,
		borderRadius: CommonStyle.commonRadius,
  },
  cardBg2x: {
    backgroundColor: 'white',
    height: CommonStyle.commonRowHeight * 2,
    borderColor: CommonStyle.dividerGray,
    margin: CommonStyle.pageHorizontalMargin,
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
		        等待出发
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

function TTButton({onPress, text, iconName, color}) {
	return(
		<TouchableOpacity
			style={styles.buttonArea}
			onPress={onPress}
		>
			<Icon
				style={styles.buttonIcon}
				name={iconName}
				size={CommonStyle.iconSizeSmall}
				color={color} />
			<Text style={[styles.buttonText, {color: color}]}>{text}</Text>
  	</TouchableOpacity>
	);
};

class OrderBaoContent extends Component {
  constructor(props) {
    super(props);
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

  render() {
			const order = this.props.order;

			const user = {
				user_name: order.order_busices[0].user_name,
				user_phone: order.order_busices[0].user_phone,
			}

			let msgHeight = 0;
			const userCount = order.order_busices[0].order_bus_passengers.length;
			if (order.remark != null && order.remark.length > 0) {
				msgHeight = 1;
			}

      return (
				<View style={styles.content}>
				<ListHeader order={order} />

        <View style={[styles.cardBg, {height: CommonStyle.commonRowHeight * (4+msgHeight)}]}>
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
  	              {order.order_busices[0].start_area}
  	            </Text>
  							<Text style={styles.textAddress}>
  	              {order.order_busices[0].start_place}
  	            </Text>
  	          </View>


  	          <View style={styles.textAddressArea}>
  	            <Text style={styles.textAddressColor}>
  	              {order.order_busices[0].end_area}
  	            </Text>
  							<Text style={styles.textAddress}>
  	              {order.order_busices[0].end_place}
  	            </Text>
  	          </View>

  	        </View>
  	      </View>

          <View style={styles.userRow}>

    				<View style={styles.userLeftIconArea}>
    					<Icon
    						name='ios-person'
    						size={CommonStyle.iconSize}>
    					</Icon>
    				</View>

    				<View style={styles.userDetailArea}>
    					<Text style={styles.textUserInfo}>
    						{user.user_name}
    					</Text>

    					<TTButton iconName="ios-person"
    					 	text="联系乘客"
    						color={CommonStyle.themeColorGreen}
    					/>

    					<TTButton iconName="ios-person"
    					 	text="接到乘客"
    						color={CommonStyle.themeColorGreen}
    					/>


        		</View>

    			</View>
  				{
  					this.renderMsgArea(msgHeight === 1, order.remark)
  				}
     		</View>

    		</View>
  	   );
  }
}

OrderBaoContent.propTypes = {
	navigator: PropTypes.object,
};

module.exports = OrderBaoContent;
