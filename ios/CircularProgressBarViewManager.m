#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(CircularProgressBarViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(backgroundProgressBarColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(progressBarColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(progressBarWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(backgroundProgressBarWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(fill, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(archAngle, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(startAngle, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(clockwiseFill, BOOL)
RCT_EXPORT_VIEW_PROPERTY(roundBorder, BOOL)
RCT_EXPORT_VIEW_PROPERTY(animateProgress, BOOL)
@end
