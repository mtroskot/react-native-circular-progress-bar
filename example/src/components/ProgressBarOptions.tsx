import React from 'react';
import { View, Text, Switch, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import type {
  GradientDirection,
  ProgressGradient,
} from 'react-native-circular-progress-bar';
import ColorPicker from './ColorPicker';

interface ProgressBarOptionsProps {
  title: string;
  barWidth: number;
  onBarWidthChange: (barWidth: number) => void;
  enableGradientColors: boolean;
  onEnableGradientColorsChange: (enable: boolean) => void;
  barColor: string;
  onBarColorChange: (color: string) => void;
  gradientDirections: GradientDirection[];
  barGradient: ProgressGradient;
  onGradientStartColorChange: (color: string) => void;
  onGradientEndColorChange: (color: string) => void;
  onGradientDirectionChange: (value: number) => void;
}

const ProgressBarOptions: React.FC<ProgressBarOptionsProps> = ({
  title,
  barWidth,
  onBarWidthChange,
  enableGradientColors,
  onEnableGradientColorsChange,
  barGradient,
  barColor,
  gradientDirections,
  onGradientDirectionChange,
  onGradientEndColorChange,
  onGradientStartColorChange,
  onBarColorChange,
}) => {
  return (
    <>
      <View style={styles.centerContent}>
        <Text>
          {title} Width {barWidth}
        </Text>
        <Slider
          style={styles.slider}
          value={barWidth}
          onSlidingComplete={onBarWidthChange}
          onValueChange={onBarWidthChange}
          minimumValue={1}
          step={1}
          maximumValue={100}
        />
      </View>
      <View style={styles.centerContent}>
        <Text>Progress Gradient</Text>
        <Switch
          value={enableGradientColors}
          onValueChange={onEnableGradientColorsChange}
        />
      </View>
      {!enableGradientColors ? (
        <ColorPicker
          title={`${title} Color`}
          onColorChange={onBarColorChange}
          selectedColor={barColor}
        />
      ) : (
        <>
          <ColorPicker
            title={`${title} Start Color`}
            onColorChange={onGradientStartColorChange}
            selectedColor={barGradient.startColor}
          />
          <ColorPicker
            title={`${title} End Color`}
            onColorChange={onGradientEndColorChange}
            selectedColor={barGradient.endColor}
          />
          <Text>
            Progress Gradient Direction {barGradient.gradientDirection}
          </Text>
          <Slider
            style={styles.slider}
            value={gradientDirections.findIndex(
              (val) => val === barGradient.gradientDirection
            )}
            onValueChange={onGradientDirectionChange}
            onSlidingComplete={onGradientDirectionChange}
            minimumValue={0}
            step={1}
            maximumValue={gradientDirections.length - 1}
          />
        </>
      )}
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

export default React.memo(ProgressBarOptions);
