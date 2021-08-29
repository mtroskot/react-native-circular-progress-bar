#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(CircularProgressBarViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(backgroundProgressBarColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(progressBarColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(progressBarWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(backgroundProgressBarWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(fill, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(archAngle, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(startingAngle, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(clockwiseFill, BOOL)
RCT_EXPORT_VIEW_PROPERTY(roundBorder, BOOL)
RCT_EXPORT_VIEW_PROPERTY(animateProgress, BOOL)
RCT_EXPORT_VIEW_PROPERTY(progressBarGradient, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(backgroundProgressBarGradient, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(animationConfig, NSDictionary)
RCT_EXTERN_METHOD(animateProgress:(nonnull NSNumber *)node
                  progress:(nonnull NSNumber *)progress
                  duration:(nonnull NSTimeInterval *)duration
                  delay:(nonnull NSTimeInterval *)progress)

@end
