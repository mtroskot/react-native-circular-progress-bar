import React from 'react';
import { View, Text, Switch, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

interface CommonOptionsProps {
  archAngle: number;
  setArchAngle: (angle: number) => void;
  startAngle: number;
  setStartAngle: (angle: number) => void;
  clockwise: boolean;
  onClockwiseChange: (value: boolean) => void;
  roundBorder: boolean;
  onRoundBorderChange: (value: boolean) => void;
}

const CommonOptions: React.FC<CommonOptionsProps> = ({
  archAngle,
  setArchAngle,
  clockwise,
  roundBorder,
  onClockwiseChange,
  onRoundBorderChange,
  startAngle,
  setStartAngle,
}) => {
  return (
    <>
      <View style={styles.centerContent}>
        <Text>Arch Angle {archAngle}</Text>
        <Slider
          style={styles.slider}
          value={archAngle}
          onSlidingComplete={setArchAngle}
          onValueChange={setArchAngle}
          minimumValue={0}
          step={1}
          maximumValue={360}
        />
      </View>
      <View style={styles.centerContent}>
        <Text>Start Angle {startAngle}</Text>
        <Slider
          style={styles.slider}
          value={startAngle}
          onSlidingComplete={setStartAngle}
          onValueChange={setStartAngle}
          minimumValue={0}
          step={1}
          maximumValue={360}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.centerContent}>
          <Text>Clockwise</Text>
          <Switch value={clockwise} onValueChange={onClockwiseChange} />
        </View>
        <View style={styles.centerContent}>
          <Text>Round Border</Text>
          <Switch value={roundBorder} onValueChange={onRoundBorderChange} />
        </View>
      </View>
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

export default React.memo(CommonOptions);
