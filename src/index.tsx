import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

interface ProgressGradient {
  startColor: string;
  endColor: string;
  gradientDirection: 1 | 2 | 3 | 4;
}
interface AnimationConfig {
  duration: number;
  progressInterpolator: 0 | 1 | 2 | 3;
  progressDelay?: number;
}

type CircularProgressBarProps = {
  backgroundProgressBarColor: string;
  progressBarColor: string;
  progressBarWidth: number;
  backgroundProgressBarWidth: number;
  progress: number;
  startAngle: number;
  progressDirection: 0 | 1;
  roundBorder: boolean;
  indeterminateMode: boolean;
  matchAngleAndProgress: boolean;
  animateProgress: boolean;
  animationConfig: AnimationConfig;
  progressBarGradient: ProgressGradient;
  backgroundProgressBarGradient: ProgressGradient;
  style: StyleProp<ViewStyle>;
};

export const CircularProgressBarViewManager =
  requireNativeComponent<CircularProgressBarProps>('CircularProgressBarView');

export default CircularProgressBarViewManager;
