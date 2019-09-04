import Animated, { Easing } from "react-native-reanimated";
const {
  block,
  cond,
  clockRunning,
  set,
  stopClock,
  startClock,
  timing,
  Value,
  SpringUtils,
  spring
} = Animated;

export function runLinearTiming({ clock, toValue, duration = 200, position }) {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position,
    time: new Value(0)
  };
  const config = {
    toValue,
    duration,
    easing: Easing.linear
  };
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, toValue),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
}

export function runSwipeDecay() {}

export function runSpring(clock, position) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity: new Value(0)
  };
  const config = SpringUtils.makeDefaultConfig();
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, position),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position
  ]);
}
