import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import Animated from "react-native-reanimated";
import { runLinearTiming } from "../utils/animationHelpers";

import iconHeart from "../../assets/icon_heart.png";
const { Value, Clock, View } = Animated;

class FavouriteIcon extends React.Component {
  clock = new Clock();
  toValue = new Value(0.2);
  opacity = runLinearTiming({
    clock: this.clock,
    toValue: this.toValue,
    position: new Value(0.2)
  });

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.toValue.setValue(this.props.checked ? 1 : 0.2);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        enabled={this.props.tapEnabled}
        onPress={this.props.onToggle}
      >
        <View
          style={{
            opacity: this.opacity
          }}
        >
          <Image source={iconHeart} style={style.icon} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default FavouriteIcon;

const style = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: "#3903fc"
  }
});
