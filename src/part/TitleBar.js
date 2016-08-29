import {
	StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import React, {
	PropTypes,
  Component,
} from 'react';

import CommonStyle from './res/CommonStyle';

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  navigationBar: {
    height: CommonStyle.navBarHeight,
    flexDirection: 'row',
  },

  navigationLeftButtonTextArea: {
    justifyContent: 'center',
  },

  navigationLeftButtonIcon: {
    marginLeft: 20,
  },

	navigationRightButtonIcon: {
		marginRight: 20,
	},

  navigationRightButtonArea: {
		justifyContent: 'center',
  },

	navigationTitleArea: {
		flex: 1,
		justifyContent: 'center',
	},

  navigationTitle: {
    textAlign: 'center',
    color: 'black',
    fontSize: CommonStyle.bigFont,
  },

});

const TitleBarProps = {
  navigationTitle: PropTypes.string,
  rightButtonText: PropTypes.string,
  rightButtonAction: PropTypes.function,
  isShowBackButton: PropTypes.bool,
  isShowRightButton: PropTypes.bool,
  navigator: PropTypes.object,
};

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.backButtonClicked = this.backButtonClicked.bind(this);
    this.renderBackButton = this.renderBackButton.bind(this);
		this.renderRightButton = this.renderRightButton.bind(this);

    let bgColor = props.bgColor;
    if (bgColor == null) {
      bgColor = CommonStyle.themeColor;
    }

    this.state = {
      bgColor,
    };
  }

  backButtonClicked() {
    if (this.props.navigator.getCurrentRoutes().length > 1) {
      this.props.navigator.pop();
    }
  }

  renderBackButton() {
    if (this.props.isShowBackButton) {
      return (
        <Icon name="angle-left"
          size={CommonStyle.iconSize}
          color={CommonStyle.iconGray}
          style={styles.navigationLeftButtonIcon}
          />
      );
    }
  }

	renderRightButton() {
		if (this.props.isShowRightButton) {
			return (
				<Icon name={this.props.rightButtonText}
					size={CommonStyle.iconSize}
					color={CommonStyle.iconGray}
					style={styles.navigationRightButtonIcon}
					/>
			);
		}
	}


  render() {
      return (
        <View
          style={[styles.navigationBar, { backgroundColor: this.state.bgColor }]}>
          <TouchableOpacity
            onPress={this.backButtonClicked}
            style={styles.navigationLeftButtonTextArea}>
            {this.renderBackButton()}
          </TouchableOpacity>

					<View style={styles.navigationTitleArea}>
     				<Text style={styles.navigationTitle}>{this.props.navigationTitle}</Text>
     			</View>

          <TouchableOpacity
            style={styles.navigationRightButtonArea}
						onPress={this.props.rightButtonAction}
						>
						{this.renderRightButton()}
          </TouchableOpacity>
        </View>
  	   );
  }
}

TitleBar.propTypes = TitleBarProps;

module.exports = TitleBar;
