import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

export type GradientDirection =
  | 'LEFT_TO_RIGHT'
  | 'RIGHT_TO_LEFT'
  | 'TOP_TO_BOTTOM'
  | 'BOTTOM_TO_TOP';

export type AnimationEasing = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';

export interface ProgressGradient {
  startColor: string;
  endColor: string;
  gradientDirection?: GradientDirection;
}
export interface AnimationConfig {
  duration: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  delay?: number;
}

type CircularProgressBarProps = {
  backgroundProgressBarColor?: string;
  progressBarColor?: string;
  progressBarWidth?: number;
  backgroundProgressBarWidth?: number;
  fill: number;
  startingAngle?: number;
  archAngle?: number;
  clockwiseFill?: boolean;
  roundBorder?: boolean;
  animateProgress?: boolean;
  animationConfig?: AnimationConfig;
  progressBarGradient?: ProgressGradient;
  backgroundProgressBarGradient?: ProgressGradient;
  style?: StyleProp<ViewStyle>;
};

export const CircularProgressBarViewManager =
  requireNativeComponent<CircularProgressBarProps>('CircularProgressBarView');

export default CircularProgressBarViewManager;
