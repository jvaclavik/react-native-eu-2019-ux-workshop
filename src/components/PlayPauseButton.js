import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { runLinearTiming } from "../utils/animationHelpers";

const { Value, Clock, interpolate, concat } = Animated;

class PlayPauseButton extends React.Component {
  clock = new Clock();
  opacity = runLinearTiming({
    clock: this.clock,
    toValue: this.props.isPlaying,
    position: new Value(0),
    duration: 500
  });

  pauseOpacity = interpolate(this.opacity, {
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  rotation = interpolate(this.opacity, {
    inputRange: [0, 1],
    outputRange: [0, 180]
  });

  render() {
    console.log(this.props.isPlaying._value);
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <Animated.View
            style={{ transform: [{ rotateY: concat(this.rotation, "deg") }] }}
          >
            <Animated.View style={[styles.control, { opacity: this.opacity }]}>
              <Ionicons name="md-pause" size={26} color={"#131313"} />
            </Animated.View>

            <Animated.View
              style={[
                styles.control,
                styles.playIcon,
                {
                  opacity: this.pauseOpacity
                }
              ]}
            >
              <Ionicons name="md-play" size={26} color={"#131313"} />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default PlayPauseButton;

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 23
  },
  control: {
    position: "absolute",
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center"
  },
  playIcon: {
    marginLeft: 2
  }
});
