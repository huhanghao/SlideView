import {
  Image,
  Text,
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';

import React, {
  PropTypes,
} from 'react';

const leftImagehalfIconSize = 30;
const leftImageDefaultLeft = 10;
const horizonMargin = 20;
const screenWidth = Dimensions.get('window').width;

import CommonStyle from './res/CommonStyle';

const styles = StyleSheet.create({
  mainContainer: {
    height: leftImagehalfIconSize * 2 + CommonStyle.pageHorizontalMargin,
    justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: CommonStyle.commonGray,
  },
  container: {
    marginHorizontal: horizonMargin,
    width: screenWidth - (2 * horizonMargin),
    height: leftImagehalfIconSize * 2,
    backgroundColor: 'white',
    borderRadius: leftImagehalfIconSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftImage: {
    position: 'absolute',
    left: leftImageDefaultLeft,
    top: 0,
    width: leftImagehalfIconSize * 2,
    height: leftImagehalfIconSize * 2,
    borderRadius: leftImagehalfIconSize,
    borderColor: 'gray',
    borderWidth: 1,
  },
  midText: {
    fontSize: 14,
  },
  rightImage: {
    position: 'absolute',
    top: 0,
    right: leftImageDefaultLeft,
    width: leftImagehalfIconSize * 2,
    height: leftImagehalfIconSize * 2,
    borderRadius: leftImagehalfIconSize,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const iconStart = require('./img/slider_start.png');
const iconEnd = require('./img/slider_end.png');

const SliderViewProps = {
  eventListener: PropTypes.object,
};

class SliderView extends React.Component {

  constructor(props) {
    super(props);

    this.moveStyles = {
      style: {
        left: leftImageDefaultLeft,
      },
    };

    this.reset = this.reset.bind(this);
  }

  componentWillMount() {
    this.leftImageResponder = PanResponder.create({
     // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: (evt, gestureState) => {
       // The most recent move distance is gestureState.move{X,Y}

       // The accumulated gesture distance since becoming responder is
       // gestureState.d{x,y}
        this.moveStyles.style.left = gestureState.moveX - leftImagehalfIconSize;
        // min x
        if (this.moveStyles.style.left <= leftImageDefaultLeft) {
          this.moveStyles.style.left = leftImageDefaultLeft;
        }
        // max x
        if (this.moveStyles.style.left >=
          (screenWidth - leftImageDefaultLeft - (leftImagehalfIconSize * 2) - horizonMargin * 2)) {
          this.moveStyles.style.left
          = screenWidth - leftImageDefaultLeft - (leftImagehalfIconSize * 2) - horizonMargin * 2;
        }
        this.updateNativeStyles();
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
       // The user has released all touches while this view is the
       // responder. This typically means a gesture has succeeded

      // enough talk lets fight
        if (this.moveStyles.style.left >
          screenWidth - leftImageDefaultLeft - (leftImagehalfIconSize * 3) - horizonMargin * 2) {
          this.moveStyles.style.left =
            screenWidth - leftImageDefaultLeft - leftImagehalfIconSize * 2 - horizonMargin * 2;
            console.log('attach on right');
          if (this.props.eventListener != null) {
            console.log('eventListener onIconAttachRight');
            this.props.eventListener.onIconAttachRight();
          }
        } else {
          this.moveStyles.style.left = leftImageDefaultLeft;
        }
        this.updateNativeStyles();
      },
    });
  }

  reset() {
    this.moveStyles.style.left = leftImageDefaultLeft;
    this.updateNativeStyles();
  }

  updateNativeStyles() {
    this.leftImage.setNativeProps(this.moveStyles);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.midText} >
            滑动出发
          </Text>
          {/*<Image style={styles.rightImage} source={iconStart} />*/}
          <Image
            style={styles.leftImage}
            source={iconEnd}
            ref={left => { this.leftImage = left; }}
            {...this.leftImageResponder.panHandlers}
          />
        </View>
      </View>
    );
  }

}

SliderView.propTypes = SliderViewProps;

module.exports = SliderView;
