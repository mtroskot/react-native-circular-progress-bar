import React from 'react';
import { View, Text, Switch, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import type { AnimationEasing } from 'react-native-circular-progress-bar';

interface AnimationOptionsProps {
  animateProgress: boolean;
  duration: number;
  delay: number;
  easing: AnimationEasing;
  onAnimateProgressChange: (value: boolean) => void;
  onDurationChange: (duration: number) => void;
  onDelayChange: (delay: number) => void;
  onEasingChange: (easing: AnimationEasing) => void;
  easingModes: AnimationEasing[];
}

const AnimationOptions: React.FC<AnimationOptionsProps> = ({
  easing,
  delay,
  duration,
  animateProgress,
  onAnimateProgressChange,
  onDelayChange,
  onDurationChange,
  onEasingChange,
  easingModes,
}) => {
  return (
    <>
      <View style={styles.centerContent}>
        <Text>Animate Progress</Text>
        <Switch
          value={animateProgress}
          onValueChange={onAnimateProgressChange}
        />
      </View>
      <View style={styles.centerContent}>
        <Text>Animation Duration {duration} ms</Text>
        <Slider
          style={styles.slider}
          value={duration}
          onSlidingComplete={onDurationChange}
          onValueChange={onDurationChange}
          minimumValue={100}
          step={50}
          maximumValue={5000}
        />
      </View>
      <View style={styles.centerContent}>
        <Text>Animation delay {delay} ms</Text>
        <Slider
          style={styles.slider}
          value={delay}
          onSlidingComplete={onDelayChange}
          onValueChange={onDelayChange}
          minimumValue={0}
          step={50}
          maximumValue={5000}
        />
      </View>
      <Text>Animation easing {easing}</Text>
      <Slider
        style={styles.slider}
        value={easingModes.findIndex((val) => val === easing)}
        onSlidingComplete={(value) => onEasingChange(easingModes[value])}
        onValueChange={(value) => onEasingChange(easingModes[value])}
        minimumValue={0}
        step={1}
        maximumValue={easingModes.length - 1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  centerContent: {
    alignItems: 'center',
  },
  slider: {
    width: Dimensions.get('screen').width * 0.8,
  },
  box: {
    width: 220,
    height: 220,
    marginVertical: 20,
  },
});

export default React.memo(AnimationOptions);
