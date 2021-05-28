import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import CircularProgressBar from 'react-native-circular-progress-bar';

export default function App() {
  const [progress, setProgress] = useState(50);
  const [clockwise, setClockwise] = useState(true);
  const [startAngle, setStartAngle] = useState(270);
  const [archAngle, setArchAngle] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(10);
  const [roundBorder, setRoundBorder] = useState(false);
  const [indeterminateMode, setIndeterminateMode] = useState(false);
  const [matchAngleAndProgress, setMatchAngleAndProgress] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [backgroundProgressBarWidth, setBackgroundProgressBarWidth] =
    useState(12);
  const progressBarRef = useRef(null);

  return (
    <View style={styles.container}>
      <CircularProgressBar
        ref={progressBarRef}
        animateProgress={animateProgress}
        backgroundProgressBarColor={'#aad2b4'}
        progressBarColor={'#be2020'}
        backgroundProgressBarWidth={backgroundProgressBarWidth}
        progressBarWidth={progressBarWidth}
        fill={progress}
        startAngle={startAngle}
        archAngle={archAngle}
        clockwiseFill={clockwise}
        roundBorder={roundBorder}
        indeterminateMode={indeterminateMode}
        matchAngleAndProgress={matchAngleAndProgress}
        animationConfig={{
          duration: 750,
          progressDelay: 0,
          progressInterpolator: 3,
        }}
        // progressBarGradient={{
        //   startColor: 'red',
        //   endColor: 'grey',
        //   gradientDirection: 1,
        // }}
        // backgroundProgressBarGradient={{
        //   startColor: 'green',
        //   endColor: 'yellow',
        //   gradientDirection: 2,
        // }}
        style={[styles.box, { transform: [{ rotate: `0deg` }] }]}
      />
      <Text>Progress {progress}</Text>
      <Slider
        style={{ width: 200 }}
        value={progress}
        onValueChange={setProgress}
        minimumValue={0}
        step={1}
        maximumValue={100}
      />
      <Text>Progress Bar Width {progressBarWidth}</Text>
      <Slider
        style={{ width: 200 }}
        value={progressBarWidth}
        onValueChange={setProgressBarWidth}
        minimumValue={1}
        step={1}
        maximumValue={100}
      />
      <Text>Background Progress Bar Width {backgroundProgressBarWidth}</Text>
      <Slider
        style={{ width: 200 }}
        value={backgroundProgressBarWidth}
        onValueChange={setBackgroundProgressBarWidth}
        minimumValue={1}
        step={1}
        maximumValue={100}
      />
      <Text>Arch Angle {archAngle}</Text>
      <Slider
        style={{ width: 200 }}
        value={archAngle}
        onValueChange={setArchAngle}
        minimumValue={0}
        step={1}
        maximumValue={360}
      />
      <Text>Start Angle {startAngle}</Text>
      <Slider
        style={{ width: 200 }}
        value={startAngle}
        onValueChange={setStartAngle}
        minimumValue={0}
        step={1}
        maximumValue={270}
      />
      <Text>Clockwise</Text>
      <Switch value={clockwise} onValueChange={setClockwise} />
      <Text>Round Border</Text>
      <Switch value={roundBorder} onValueChange={setRoundBorder} />
      <Text>IndeterminateMode</Text>
      <Switch value={indeterminateMode} onValueChange={setIndeterminateMode} />
      <Text>Match Angle And Progress</Text>
      <Switch
        value={matchAngleAndProgress}
        onValueChange={setMatchAngleAndProgress}
      />
      <Text>Animate Progress</Text>
      <Switch value={animateProgress} onValueChange={setAnimateProgress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
});
