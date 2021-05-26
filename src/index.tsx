import { requireNativeComponent, ViewStyle } from 'react-native';

type CircularProgressBarProps = {
  color: string;
  style: ViewStyle;
};

export const CircularProgressBarViewManager = requireNativeComponent<CircularProgressBarProps>(
'CircularProgressBarView'
);

export default CircularProgressBarViewManager;
