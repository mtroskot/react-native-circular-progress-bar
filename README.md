# react-native-circular-progress-bar

Fully Native customizable circular progress indicator for React Native.

## Installation

```sh
npm install react-native-circular-progress-bar
```

https://user-images.githubusercontent.com/26821326/131260116-055a9d48-e45d-4971-a9d9-ea2133d654cd.mp4



## Usage

```js
import CircularProgressBar from "react-native-circular-progress-bar";

// ...

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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
