import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../App';

interface ColorPickerProps {
  selectedColor: string;
  title: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onColorChange,
  selectedColor,
  title,
}) => {
  return (
    <>
      <Text style={{ color: selectedColor }}>{title}</Text>
      <Slider
        style={styles.slider}
        value={colors.findIndex((val) => val === selectedColor)}
        onSlidingComplete={(value) => onColorChange(colors[value])}
        onValueChange={(value) => onColorChange(colors[value])}
        minimumValue={0}
        step={1}
        maximumValue={colors.length - 1}
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

export default React.memo(ColorPicker);
