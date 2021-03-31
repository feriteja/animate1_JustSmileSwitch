import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  interpolateColor,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const App = () => {
  const [expressState, setExpressState] = useState(0);

  const expressValue = useSharedValue(expressState);

  useMemo(() => (expressValue.value = expressState), [expressState]);

  const expressStyle = useAnimatedStyle(() => {
    const translateX = interpolate(expressValue.value, [0, 1], [30, 80]);
    const color = interpolateColor(
      expressValue.value,
      [0, 1],
      ['#00ff00', '#dcbaaa'],
    );
    return {
      transform: [{translateX: withTiming(translateX)}],
      color: withTiming(color),
    };
  });

  const shadowStyle = useAnimatedStyle(() => {
    const translateX = interpolate(expressValue.value, [0, 1], [59, 0]);

    return {
      transform: [{translateX: withTiming(translateX)}],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <View style={styles.switchContent}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.switchState}
            onPress={() => setExpressState(0)}>
            <Text
              style={[
                styles.textSwitch,
                {
                  color: '#00ff00',
                  left: 20,
                  opacity: expressState === 0 ? 1 : 0.2,
                },
              ]}>
              :
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.switchState, {alignItems: 'flex-end'}]}
            onPress={() => setExpressState(1)}>
            <Text
              style={[
                styles.textSwitch,
                {
                  color: '#dcbaaa',
                  right: 20,
                  opacity: expressState === 1 ? 1 : 0.2,
                },
              ]}>
              :
            </Text>
          </TouchableOpacity>
          <Animated.Text
            style={[
              {position: 'absolute', top: 7},
              styles.textSwitch,
              expressStyle,
            ]}>
            )
          </Animated.Text>
        </View>
        <Animated.View style={[styles.switchShadow, shadowStyle]} />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  switchContainer: {
    height: 50,
    width: 120,
    borderRadius: 999,
    // overflow: 'hidden',
  },
  switchContent: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderRadius: 999,
    zIndex: 10,
    transform: [{rotateX: '10deg'}],
  },
  switchShadow: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.2)',
    height: 25,
    width: 60,
    bottom: -2,
    left: 1,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 99,
    borderBottomStartRadius: 90,
    // transform: [{translateX: 59}],
  },
  switchState: {
    flex: 1,
    justifyContent: 'center',
  },
  textSwitch: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
