import React from "react";
import { StyleSheet, FlatList } from "react-native";
import Animated from "react-native-reanimated";

import CollapsibleHeader from "./CollapsibleHeader";
import HeaderTitle from "./HeaderTitle";
import SongItem from "./SongItem";
import { NAV_BAR_HEIGHT, PLAYER_HEIGHT } from "../utils/constants";

const { event, interpolate, Extrapolate, Value } = Animated;
const SongList = ({
  songs,
  currentSong,
  onSongPress,
  onSongRemove,
  onFavouriteToggle
}) => {
  const scrollY = new Value(0);
  const shadowOpacity = interpolate(scrollY, {
    inputRange: [0, 130],
    outputRange: [0, 0.5],
    extrapolate: Extrapolate.CLAMP
  });
  const renderRow = item => {
    return (
      <SongItem
        item={item.item}
        onSongRemove={onSongRemove}
        onSongFavouriteToggle={onFavouriteToggle}
        onPress={onSongPress}
      />
    );
  };

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  return (
    <React.Fragment>
      <CollapsibleHeader scrollY={scrollY} currentSong={currentSong} />
      <AnimatedFlatList
        data={songs}
        renderItem={renderRow}
        keyExtractor={item => item.track.id}
        // bounces={false}
        contentContainerStyle={styles.listContainer}
        scrollEventThrottle={16}
        style={[styles.shadow, { shadowOpacity: shadowOpacity }]}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }
        ])}
      />

      {/* We will need it later */}
      <HeaderTitle currentSong={currentSong} scrollY={scrollY} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: NAV_BAR_HEIGHT,
    paddingBottom: PLAYER_HEIGHT
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowRadius: 11.95,
    elevation: 18
  }
});

export default SongList;
