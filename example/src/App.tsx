import React, { useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  findNodeHandle,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CircularProgressBar, {
  AnimationEasing,
  GradientDirection,
} from 'react-native-circular-progress-bar';
import ProgressBarOptions from './components/ProgressBarOptions';
import CommonOptions from './components/CommonOptions';
import AnimationOptions from './components/AnimationOptions';
import Option from './components/Option';

export const colors = [
  '#aad2b4',
  '#fdbd00',
  '#4f6ac1',
  '#7c0000',
  '#f170ac',
  '#7c0000',
  '#ff0000',
  '#0000cc',
  '#ffff99',
  '#006600',
  '#cc00cc',
  '#666699',
  '#800000',
  '#878858',
  '#d45510',
  '#516963',
  '#cdcdcd',
  '#000000',
];
const gradientDirections: GradientDirection[] = [
  'LEFT_TO_RIGHT',
  'RIGHT_TO_LEFT',
  'TOP_TO_BOTTOM',
  'BOTTOM_TO_TOP',
];
export const easingModes: AnimationEasing[] = [
  'linear',
  'easeIn',
  'easeOut',
  'easeInOut',
];

export default function App() {
  const [progress, setProgress] = useState(50);
  const [backgroundProgressBarColor, setBackgroundProgressBarColor] = useState(
    colors[0]
  );
  const [progressBarColor, setProgressBarColor] = useState(colors[1]);
  const [animationConfig, setAnimationConfig] = useState({
    duration: 1000,
    delay: 0,
    easing: easingModes[0],
  });
  const [expandAnimationProps, setExpandAnimationProps] = useState(false);
  const [expandCommonProps, setExpandCommonProps] = useState(false);
  const [expandBackgroundBarProps, setExpandBackgroundBarProps] =
    useState(false);
  const [expandProgressBarProps, setExpandProgressBarProps] = useState(false);
  const [clockwise, setClockwise] = useState(true);
  const [useGradientColors, setUseGradientColors] = useState(false);
  const [useBackgroundGradientColors, setUseBackgroundGradientColors] =
    useState(false);
  const [startAngle, setStartAngle] = useState(270);
  const [archAngle, setArchAngle] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(50);
  const [roundBorder, setRoundBorder] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [backgroundProgressBarWidth, setBackgroundProgressBarWidth] =
    useState(52);
  const [progressBarGradient, setProgressBarGradient] = useState({
    startColor: colors[8],
    endColor: colors[17],
    gradientDirection: gradientDirections[0],
  });
  const [backgroundBarGradient, setBackgroundBarGradient] = useState({
    startColor: colors[9],
    endColor: colors[12],
    gradientDirection: gradientDirections[0],
  });
  const progressBarRef = useRef(null);

  const saveCurrentDocument = function () {
    let newProgress = Math.round(Math.random() * 100);
    let duration = 1000;
    let delay = 500;
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(progressBarRef.current),
      UIManager.getViewManagerConfig('CircularProgressBarView').Commands
        .animateProgress,
      [newProgress, duration, delay]
    );
    setTimeout(() => {
      setProgress(newProgress);
    }, duration + delay + 50);
  };

  const hideProgressBarProps =
    expandAnimationProps || expandCommonProps || expandBackgroundBarProps;
  const hideBackgroundProgressBarProps =
    expandAnimationProps || expandCommonProps || expandProgressBarProps;
  const hideAnimationProps =
    expandProgressBarProps || expandCommonProps || expandBackgroundBarProps;
  const hideCommonProps =
    expandAnimationProps || expandProgressBarProps || expandBackgroundBarProps;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <CircularProgressBar
        ref={progressBarRef}
        animateProgress={animateProgress}
        backgroundProgressBarColor={backgroundProgressBarColor}
        progressBarColor={progressBarColor}
        backgroundProgressBarWidth={backgroundProgressBarWidth}
        progressBarWidth={progressBarWidth}
        fill={progress}
        startingAngle={startAngle}
        archAngle={archAngle}
        clockwiseFill={clockwise}
        roundBorder={roundBorder}
        animationConfig={animationConfig}
        progressBarGradient={
          useGradientColors ? progressBarGradient : undefined
        }
        backgroundProgressBarGradient={
          useBackgroundGradientColors ? backgroundBarGradient : undefined
        }
        style={styles.box}
      />
      <Button title={'Animate'} onPress={saveCurrentDocument} />
      <Text>Progress {progress}</Text>
      <Slider
        style={{ width: 200 }}
        value={progress}
        onValueChange={setProgress}
        onSlidingComplete={setProgress}
        minimumValue={0}
        step={1}
        maximumValue={100}
      />

      <Option
        hide={hideProgressBarProps}
        title={'Progress Bar'}
        expand={expandProgressBarProps}
        onClosePress={() => setExpandProgressBarProps(false)}
        onOpenPress={() => setExpandProgressBarProps(true)}
      >
        <ProgressBarOptions
          title={'Progress Bar'}
          barColor={progressBarColor}
          enableGradientColors={useGradientColors}
          gradientDirections={gradientDirections}
          onEnableGradientColorsChange={setUseGradientColors}
          onBarColorChange={setProgressBarColor}
          onBarWidthChange={setProgressBarWidth}
          barGradient={progressBarGradient}
          barWidth={progressBarWidth}
          onGradientDirectionChange={(value) => {
            setProgressBarGradient({
              ...progressBarGradient,
              gradientDirection: gradientDirections[value],
            });
          }}
          onGradientEndColorChange={(color) => {
            setProgressBarGradient({
              ...progressBarGradient,
              endColor: color,
            });
          }}
          onGradientStartColorChange={(color) => {
            setProgressBarGradient({
              ...progressBarGradient,
              startColor: color,
            });
          }}
        />
      </Option>

      <Option
        hide={hideBackgroundProgressBarProps}
        title={'Background Bar'}
        expand={expandBackgroundBarProps}
        onOpenPress={() => setExpandBackgroundBarProps(true)}
        onClosePress={() => setExpandBackgroundBarProps(false)}
      >
        <ProgressBarOptions
          title={'Background Bar'}
          barColor={backgroundProgressBarColor}
          enableGradientColors={useBackgroundGradientColors}
          gradientDirections={gradientDirections}
          onEnableGradientColorsChange={setUseBackgroundGradientColors}
          onBarColorChange={setBackgroundProgressBarColor}
          onBarWidthChange={setBackgroundProgressBarWidth}
          barGradient={backgroundBarGradient}
          barWidth={backgroundProgressBarWidth}
          onGradientDirectionChange={(value) => {
            setBackgroundBarGradient({
              ...backgroundBarGradient,
              gradientDirection: gradientDirections[value],
            });
          }}
          onGradientEndColorChange={(color) => {
            setBackgroundBarGradient({
              ...backgroundBarGradient,
              endColor: color,
            });
          }}
          onGradientStartColorChange={(color) => {
            setBackgroundBarGradient({
              ...backgroundBarGradient,
              startColor: color,
            });
          }}
        />
      </Option>

      <Option
        hide={hideCommonProps}
        title={'Common Props'}
        onOpenPress={() => setExpandCommonProps(true)}
        onClosePress={() => setExpandCommonProps(false)}
        expand={expandCommonProps}
      >
        <CommonOptions
          archAngle={archAngle}
          roundBorder={roundBorder}
          startAngle={startAngle}
          clockwise={clockwise}
          onClockwiseChange={setClockwise}
          onRoundBorderChange={setRoundBorder}
          setArchAngle={setArchAngle}
          setStartAngle={setStartAngle}
        />
      </Option>

      <Option
        hide={hideAnimationProps}
        title={'Animation Props'}
        expand={expandAnimationProps}
        onClosePress={() => setExpandAnimationProps(false)}
        onOpenPress={() => setExpandAnimationProps(true)}
      >
        <AnimationOptions
          duration={animationConfig.duration}
          animateProgress={animateProgress}
          delay={animationConfig.delay}
          easing={animationConfig.easing}
          easingModes={easingModes}
          onAnimateProgressChange={setAnimateProgress}
          onDelayChange={(delay) =>
            setAnimationConfig({ ...animationConfig, delay })
          }
          onDurationChange={(duration) =>
            setAnimationConfig({ ...animationConfig, duration })
          }
          onEasingChange={(easing) =>
            setAnimationConfig({ ...animationConfig, easing })
          }
        />
      </Option>
    </ScrollView>
  );
}

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
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});
