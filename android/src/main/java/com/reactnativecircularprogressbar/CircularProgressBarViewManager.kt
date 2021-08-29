package com.reactnativecircularprogressbar

import android.animation.TimeInterpolator
import android.graphics.Color
import android.util.Log
import android.view.animation.AccelerateDecelerateInterpolator
import android.view.animation.AccelerateInterpolator
import android.view.animation.DecelerateInterpolator
import android.view.animation.LinearInterpolator
import com.facebook.common.logging.FLog
import com.facebook.infer.annotation.Assertions
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class CircularProgressBarViewManager : SimpleViewManager<CircularProgressBar>() {
  private var progressDuration = 1000L; // 1 second
  private var animationEasing = "linear";
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

  @ReactProp(name = "fill")
  fun setProgress(circularProgressBar: CircularProgressBar, fill: Float) {
    progressFromProp = fill;
    calculateProgress(circularProgressBar, fill, animateProgress)
  }

  @ReactProp(name = "startingAngle")
  fun setStartingAngle(circularProgressBar: CircularProgressBar, startingAngle: Float) {
    circularProgressBar.defaultAngle = startingAngle;
  }

  @ReactProp(name = "archAngle")
  fun setArchAngle(circularProgressBar: CircularProgressBar, archAngle: Float) {
    circularProgressBar.startAngle = archAngle;
      calculateProgress(circularProgressBar, progressFromProp, animateProgress)
  }

  @ReactProp(name = "clockwiseFill")
  fun setProgressDirection(circularProgressBar: CircularProgressBar, clockwise: Boolean) {
    circularProgressBar.progressDirection = if (clockwise) CircularProgressBar.ProgressDirection.TO_RIGHT else CircularProgressBar.ProgressDirection.TO_LEFT;
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
  fun setProgressBarGradient(circularProgressBar: CircularProgressBar, gradientProps: ReadableMap?) {
  if(gradientProps!=null){
    circularProgressBar.progressBarColorStart = Color.parseColor(gradientProps.getString("startColor"));
    circularProgressBar.progressBarColorEnd = Color.parseColor(gradientProps.getString("endColor"));
    val gradientDirection: CircularProgressBar.GradientDirection = when (gradientProps.getString("gradientDirection")) {
      "LEFT_TO_RIGHT" -> CircularProgressBar.GradientDirection.LEFT_TO_RIGHT
      "RIGHT_TO_LEFT" -> CircularProgressBar.GradientDirection.RIGHT_TO_LEFT
      "TOP_TO_BOTTOM" -> CircularProgressBar.GradientDirection.TOP_TO_BOTTOM
      else -> CircularProgressBar.GradientDirection.BOTTOM_TO_END
    }
    circularProgressBar.progressBarColorDirection = gradientDirection;
    }else{
        circularProgressBar.progressBarColorStart = null
        circularProgressBar.progressBarColorEnd = null
    }
  }

  @ReactProp(name = "backgroundProgressBarGradient")
  fun setBackgroundProgressBarGradient(circularProgressBar: CircularProgressBar, gradientProps: ReadableMap?) {
  if(gradientProps!=null){
    circularProgressBar.backgroundProgressBarColorStart = Color.parseColor(gradientProps.getString("startColor"));
    circularProgressBar.backgroundProgressBarColorEnd = Color.parseColor(gradientProps.getString("endColor"));
    val gradientDirection: CircularProgressBar.GradientDirection = when (gradientProps.getString("gradientDirection")) {
       "LEFT_TO_RIGHT" -> CircularProgressBar.GradientDirection.LEFT_TO_RIGHT
       "RIGHT_TO_LEFT" -> CircularProgressBar.GradientDirection.RIGHT_TO_LEFT
       "TOP_TO_BOTTOM" -> CircularProgressBar.GradientDirection.TOP_TO_BOTTOM
      else -> CircularProgressBar.GradientDirection.BOTTOM_TO_END
    }
    circularProgressBar.backgroundProgressBarColorDirection = gradientDirection;
  }else{
  circularProgressBar.backgroundProgressBarColorStart = null
  circularProgressBar.backgroundProgressBarColorEnd = null
  }
  }

  @ReactProp(name = "animationConfig")
  fun setAnimationConfig(circularProgressBar: CircularProgressBar, animationConfig: ReadableMap) {
    progressDuration = animationConfig.getInt("duration").toLong();
    if (animationConfig.hasKey("delay")) {
      progressDelay = animationConfig.getInt("delay").toLong();
    }else {
      progressDelay = 0L;
    }
    if (animationConfig.hasKey("easing")) {
       animationEasing = animationConfig.getString("easing").toString();
    }else {
      animationEasing = "linear";
    }
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
        var delay = args?.getDouble(2)?.toLong();
        if (progress !== null && duration !== null) {
          view.setProgressWithAnimation(progress, duration,getTimeInterpolator(animationEasing),delay)
        }
        return
      }
      else -> throw IllegalArgumentException(java.lang.String.format(
        "Unsupported command %d received by %s.",
        commandId,
        javaClass.simpleName))
    }
  }

  private fun calculateProgress(circularProgressBar: CircularProgressBar, progress: Float, animate: Boolean = false) {
    var newProgress = progress;
    if (animate) {
      circularProgressBar.setProgressWithAnimation(newProgress, progressDuration, getTimeInterpolator(animationEasing), progressDelay)
    } else {
      circularProgressBar.progress = newProgress;
    }
  }

  private fun getTimeInterpolator(type: String): TimeInterpolator? {
    return when (type) {
      "linear" -> LinearInterpolator()
      "easeOut" -> DecelerateInterpolator()
      "easeIn" -> AccelerateInterpolator()
      "easeInOut" -> AccelerateDecelerateInterpolator()
      else -> LinearInterpolator()
    }
  }

}
