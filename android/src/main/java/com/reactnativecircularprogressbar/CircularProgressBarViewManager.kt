package com.reactnativecircularprogressbar

import android.animation.TimeInterpolator
import android.graphics.Color
import android.util.Log
import android.view.View
import android.view.animation.AccelerateDecelerateInterpolator
import android.view.animation.AccelerateInterpolator
import android.view.animation.DecelerateInterpolator
import android.view.animation.LinearInterpolator
import com.facebook.infer.annotation.Assertions
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.mikhaellopez.circularprogressbar.CircularProgressBar


class CircularProgressBarViewManager : SimpleViewManager<CircularProgressBar>() {
  private var matchAngleAndProgress = false
  private var progressDuration = 1000L; // 1 second
  private var progressInterpolator = 0;
  private var progressDelay = 0L;
  private var animateProgress = false
  private var progressFromProp = 0f;
  private val COMMAND_ANIMATE_PROGRESS = 1

  override fun getName() = "CircularProgressBarView"

  override fun createViewInstance(reactContext: ThemedReactContext): CircularProgressBar {
    return CircularProgressBar(reactContext)
  }

  @ReactProp(name = "backgroundProgressBarColor")
  fun setBackgroundProgressBarColor(circularProgressBar: CircularProgressBar, color: String) {
    circularProgressBar.backgroundProgressBarColor = Color.parseColor(color);
  }

  @ReactProp(name = "progressBarColor")
  fun setProgressBarColor(circularProgressBar: CircularProgressBar, color: String) {
    circularProgressBar.progressBarColor = Color.parseColor(color);
  }

  @ReactProp(name = "progressBarWidth")
  fun setProgressBarWidth(circularProgressBar: CircularProgressBar, width: Float) {
    circularProgressBar.progressBarWidth = width;
  }

  @ReactProp(name = "backgroundProgressBarWidth")
  fun setBackgroundProgressBarWidth(circularProgressBar: CircularProgressBar, width: Float) {
    circularProgressBar.backgroundProgressBarWidth = width;
  }

  @ReactProp(name = "progress")
  fun setProgress(circularProgressBar: CircularProgressBar, progress: Float) {
    progressFromProp = progress;
    calculateProgress(circularProgressBar, progress, matchAngleAndProgress, animateProgress)
  }

  @ReactProp(name = "startAngle")
  fun setStartAngle(circularProgressBar: CircularProgressBar, startAngle: Float) {
    circularProgressBar.startAngle = startAngle;
    if (matchAngleAndProgress) {
      calculateProgress(circularProgressBar, progressFromProp, true, animateProgress)
    }
  }

  @ReactProp(name = "progressDirection")
  fun setProgressDirection(circularProgressBar: CircularProgressBar, progressDirection: Int) {
    circularProgressBar.progressDirection = if (progressDirection == 0) CircularProgressBar.ProgressDirection.TO_RIGHT else CircularProgressBar.ProgressDirection.TO_LEFT;
  }

  @ReactProp(name = "roundBorder")
  fun setRoundBorder(circularProgressBar: CircularProgressBar, roundBorder: Boolean) {
    circularProgressBar.roundBorder = roundBorder;
  }

  @ReactProp(name = "indeterminateMode")
  fun setIndeterminateMode(circularProgressBar: CircularProgressBar, indeterminateMode: Boolean) {
    circularProgressBar.indeterminateMode = indeterminateMode;
  }

  @ReactProp(name = "progressBarGradient")
  fun setProgressBarGradient(circularProgressBar: CircularProgressBar, gradientProps: ReadableMap) {
    circularProgressBar.progressBarColorStart = Color.parseColor(gradientProps.getString("startColor"));
    circularProgressBar.progressBarColorEnd = Color.parseColor(gradientProps.getString("endColor"));
    val gradientDirection: CircularProgressBar.GradientDirection = when (gradientProps.getInt("gradientDirection")) {
      1 -> CircularProgressBar.GradientDirection.LEFT_TO_RIGHT
      2 -> CircularProgressBar.GradientDirection.RIGHT_TO_LEFT
      3 -> CircularProgressBar.GradientDirection.TOP_TO_BOTTOM
      else -> CircularProgressBar.GradientDirection.BOTTOM_TO_END
    }
    circularProgressBar.progressBarColorDirection = gradientDirection;
  }

  @ReactProp(name = "backgroundProgressBarGradient")
  fun setBackgroundProgressBarGradient(circularProgressBar: CircularProgressBar, gradientProps: ReadableMap) {
    circularProgressBar.backgroundProgressBarColorStart = Color.parseColor(gradientProps.getString("startColor"));
    circularProgressBar.backgroundProgressBarColorEnd = Color.parseColor(gradientProps.getString("endColor"));
    val gradientDirection: CircularProgressBar.GradientDirection = when (gradientProps.getInt("gradientDirection")) {
      1 -> CircularProgressBar.GradientDirection.LEFT_TO_RIGHT
      2 -> CircularProgressBar.GradientDirection.RIGHT_TO_LEFT
      3 -> CircularProgressBar.GradientDirection.TOP_TO_BOTTOM
      else -> CircularProgressBar.GradientDirection.BOTTOM_TO_END
    }
    circularProgressBar.backgroundProgressBarColorDirection = gradientDirection;
  }

  @ReactProp(name = "animationConfig")
  fun setAnimationConfig(circularProgressBar: CircularProgressBar, animationConfig: ReadableMap) {
    progressDuration = animationConfig.getInt("duration").toLong();
    progressInterpolator = animationConfig.getInt("progressInterpolator");
    if (animationConfig.hasKey("progressDelay")) {
      progressDelay = animationConfig.getInt("progressDelay").toLong();
    }
  }

  @ReactProp(name = "matchAngleAndProgress")
  fun setMatchAngleAndProgress(circularProgressBar: CircularProgressBar, match: Boolean) {
    matchAngleAndProgress = match;
    calculateProgress(circularProgressBar, progressFromProp, matchAngleAndProgress, animateProgress)
  }

  @ReactProp(name = "animateProgress")
  fun setAnimateProgress(circularProgressBar: CircularProgressBar, animate: Boolean) {
    animateProgress = animate;
  }

  override fun getCommandsMap(): MutableMap<String, Int> {
    return MapBuilder.of("animateProgress", COMMAND_ANIMATE_PROGRESS);
  }

  override fun receiveCommand(view: CircularProgressBar, commandId: Int, args: ReadableArray?) {
    Assertions.assertNotNull<Any>(view)
    Assertions.assertNotNull<Any>(args)
    when (commandId) {
      COMMAND_ANIMATE_PROGRESS -> {
        var progress = args?.getDouble(0)?.toFloat();
        var duration = args?.getDouble(1)?.toLong();
        if (progress !== null && duration !== null) {
          Log.d("SETO KAIBA", progress.toString() + " " + duration);
          view.setProgressWithAnimation(progress, duration)
        }
        return
      }
      else -> throw IllegalArgumentException(java.lang.String.format(
        "Unsupported command %d received by %s.",
        commandId,
        javaClass.simpleName))
    }
  }

  private fun calculateProgress(circularProgressBar: CircularProgressBar, progress: Float, adjustProgressWithAngle: Boolean = false, animate: Boolean = false) {
    var newProgress = progress;
    if (adjustProgressWithAngle) {
      newProgress = circularProgressBar.startAngle / 360f * progress;
    }
    if (animate) {
      circularProgressBar.setProgressWithAnimation(newProgress, progressDuration, getTimeInterpolator(progressInterpolator), progressDelay)
    } else {
      circularProgressBar.progress = newProgress;
    }
  }

  private fun getTimeInterpolator(type: Int): TimeInterpolator? {
    return when (type) {
      0 -> LinearInterpolator()
      1 -> DecelerateInterpolator()
      2 -> AccelerateInterpolator()
      3 -> AccelerateDecelerateInterpolator()
      else -> LinearInterpolator()
    }
  }

}
