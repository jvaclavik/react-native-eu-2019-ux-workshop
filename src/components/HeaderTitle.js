import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const { event, interpolate, Extrapolate, Value } = Animated;

class HeaderTitle extends React.Component {
  opacity = interpolate(this.props.scrollY, {
    inputRange: [50, 130],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  render() {
    const { currentSong } = this.props;

    return (
      <Animated.View style={[styles.container, { opacity: this.opacity }]}>
        <Text style={styles.text}>{currentSong.track.artists[0].name}</Text>
      </Animated.View>
    );
  }
}

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "#f5f9ff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f9ff",
    elevation: 5
  },
  text: {
    color: "#131313",
    fontSize: 15
  }
});
