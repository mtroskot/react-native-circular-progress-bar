import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import CircularProgressBar from 'react-native-circular-progress-bar';

export default function App() {
  const [progress, setProgress] = useState(50);
  const [progressDirection, setProgressDirection] = useState<0 | 1>(0);
  const [startAngle, setStartAngle] = useState(0);
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
        color={'#b7b701'}
        // animateProgress={animateProgress}
        // animationConfig={{ duration: 1000 }}
        // backgroundProgressBarColor={'#aad2b4'}
        // progressBarColor={'#be2020'}
        // backgroundProgressBarWidth={backgroundProgressBarWidth}
        // progressBarWidth={progressBarWidth}
        // progress={progress}
        // startAngle={startAngle}
        // progressDirection={progressDirection}
        // roundBorder={roundBorder}
        // indeterminateMode={indeterminateMode}
        // matchAngleAndProgress={matchAngleAndProgress}
        // animationConfig={{
        //   duration: 750,
        //   progressDelay: 0,
        //   progressInterpolator: 3,
        // }}
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
        style={styles.box}
      />
      {/*<Text>Progress</Text>*/}
      {/*<Slider*/}
      {/*  style={{ width: 200 }}*/}
      {/*  value={progress}*/}
      {/*  onValueChange={setProgress}*/}
      {/*  minimumValue={0}*/}
      {/*  step={1}*/}
      {/*  maximumValue={100}*/}
      {/*/>*/}
      {/*<Text>Progress Bar Width</Text>*/}
      {/*<Slider*/}
      {/*  style={{ width: 200 }}*/}
      {/*  value={progressBarWidth}*/}
      {/*  onValueChange={setProgressBarWidth}*/}
      {/*  minimumValue={1}*/}
      {/*  step={1}*/}
      {/*  maximumValue={100}*/}
      {/*/>*/}
      {/*<Text>Background Progress Bar Width</Text>*/}
      {/*<Slider*/}
      {/*  style={{ width: 200 }}*/}
      {/*  value={backgroundProgressBarWidth}*/}
      {/*  onValueChange={setBackgroundProgressBarWidth}*/}
      {/*  minimumValue={1}*/}
      {/*  step={1}*/}
      {/*  maximumValue={100}*/}
      {/*/>*/}
      {/*<Text>Start Angle</Text>*/}
      {/*<Slider*/}
      {/*  style={{ width: 200 }}*/}
      {/*  value={startAngle}*/}
      {/*  onValueChange={setStartAngle}*/}
      {/*  minimumValue={0}*/}
      {/*  step={1}*/}
      {/*  maximumValue={360}*/}
      {/*/>*/}
      {/*<Text>Anti Clockwise Direction</Text>*/}
      {/*<Switch*/}
      {/*  value={progressDirection !== 0}*/}
      {/*  onValueChange={(value) => setProgressDirection(value ? 1 : 0)}*/}
      {/*/>*/}
      {/*<Text>Round Border</Text>*/}
      {/*<Switch value={roundBorder} onValueChange={setRoundBorder} />*/}
      {/*<Text>IndeterminateMode</Text>*/}
      {/*<Switch value={indeterminateMode} onValueChange={setIndeterminateMode} />*/}
      {/*<Text>Match Angle And Progress</Text>*/}
      {/*<Switch*/}
      {/*  value={matchAngleAndProgress}*/}
      {/*  onValueChange={setMatchAngleAndProgress}*/}
      {/*/>*/}
      {/*<Text>Animate Progress</Text>*/}
      {/*<Switch value={animateProgress} onValueChange={setAnimateProgress} />*/}
      {/*<Button title={'animate progress'} onPress={animateProgress} />*/}
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
