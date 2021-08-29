
@objc(CircularProgressBarViewManager)
class CircularProgressBarViewManager: RCTViewManager {
    var progressBarView:CircularProgressBarView!
    
    override func view() -> (CircularProgressBarView) {
        progressBarView=CircularProgressBarView()
        return progressBarView
    }
    
    @objc public func animateProgress(_ node:NSNumber,progress:NSNumber, duration:TimeInterval,delay:TimeInterval) {
        DispatchQueue.main.async {
            self.progressBarView.isInAnimate=true
            let toAngle=Double(truncating: progress)/100
            self.progressBarView.animate(fromAngle: self.progressBarView.progress, toAngle: toAngle, duration: duration,delay:delay ,relativeDuration: true, completion: { completed in
                if(delay>0 && completed){
                    self.progressBarView.progress=toAngle
                }
            })
        }
    }
    
    override static func requiresMainQueueSetup() -> Bool {
      return true
    }
}

class CircularProgressBarView : KDCircularProgress {
    var animateFill=false;
    var animationDuration:TimeInterval=1;
    var animationDelay:TimeInterval=0;
    var animationEasing:CAMediaTimingFunctionName=CAMediaTimingFunctionName.linear
    var isInAnimate=false;
    
    @objc var backgroundProgressBarColor: String = "#aad2b4" {
        didSet {
            self.trackColor = hexStringToUIColor(hexColor: backgroundProgressBarColor)
        }
    }
    
    @objc var progressBarColor: String = "#fdbd00" {
        didSet {
            self.progressColors = [hexStringToUIColor(hexColor: progressBarColor)]
        }
    }
    
    @objc var progressBarWidth: CGFloat = 50 {
        didSet {
            self.progressThickness = progressBarWidth/100
        }
    }
    
    @objc var backgroundProgressBarWidth: CGFloat = 50 {
        didSet {
            self.trackThickness = backgroundProgressBarWidth/100
        }
    }
    
    @objc var fill: Double = 10 {
        didSet {
            if(animateFill){
                isInAnimate=true
                let toAngle=fill/100
                let delay=self.animationDelay/1000
                self.animate(fromAngle: self.progress, toAngle: toAngle, duration: self.animationDuration/1000,delay:delay ,relativeDuration: true, completion: { completed in
                    if(delay>0 && completed){
                        self.progress=toAngle
                    }
                })
            }else{
                if(isInAnimate){
                    progressLayer.removeAllAnimations()
                    isInAnimate=false
                }
                self.progress = fill/100
            }
        }
    }
    
    @objc var archAngle: Double = 0 {
        didSet {
            self.angle = archAngle
        }
    }
    
    @objc var startingAngle: Double = 90 {
        didSet {
            self.startAngle = startingAngle
        }
    }
    
    @objc var clockwiseFill: Bool = true {
        didSet {
            self.clockwise = clockwiseFill
        }
    }
    
    @objc var roundBorder: Bool = true {
        didSet {
            self.roundedCorners = roundBorder
        }
    }
    
    @objc var animateProgress: Bool = false {
        didSet {
            animateFill = animateProgress
        }
    }
    
    @objc var progressBarGradient: NSDictionary = [:] {
        didSet {
            if(progressBarGradient.count>0){
                let startColor=progressBarGradient.value(forKey: "startColor") as! String
                let endColor=progressBarGradient.value(forKey: "endColor") as! String
                let gradientDirection=progressBarGradient.value(forKey: "gradientDirection") as! String
                self.progressColors = [hexStringToUIColor(hexColor: startColor),hexStringToUIColor(hexColor:endColor)]
                self.gradientDirection=gradientDirection
            }else{
                self.progressColors=[hexStringToUIColor(hexColor: progressBarColor)]
            }
        }
    }
    
    @objc var backgroundProgressBarGradient: NSDictionary = [:] {
        didSet {
            if(backgroundProgressBarGradient.count>0){
                let startColor=backgroundProgressBarGradient.value(forKey: "startColor") as! String
                let endColor=backgroundProgressBarGradient.value(forKey: "endColor") as! String
                self.progressColors = [hexStringToUIColor(hexColor: startColor),hexStringToUIColor(hexColor:endColor)]
            }else{
                self.progressColors=[hexStringToUIColor(hexColor: backgroundProgressBarColor)]
            }
        }
    }
    
    @objc var animationConfig: NSDictionary = [:] {
        didSet {
            if(animationConfig.count>0){
                let duration=animationConfig.value(forKey: "duration") as! TimeInterval
                var delay:TimeInterval=0
                if((animationConfig.value(forKey: "delay")) != nil){
                    delay=animationConfig.value(forKey: "delay") as! TimeInterval
                }
                var easing="linear"
                if((animationConfig.value(forKey: "easing")) != nil){
                    easing=animationConfig.value(forKey: "easing") as! String
                }
                if((duration) != 0){
                    self.animationDuration=duration
                }else{
                    self.animationDuration=1
                }
                if((delay) != 0){
                    self.animationDelay=delay
                }else{
                    self.animationDelay=0
                }
                if(easing=="easeInOut"){
                    self.animationEasing=CAMediaTimingFunctionName.easeInEaseOut
                }else if(easing=="easeIn"){
                    self.animationEasing=CAMediaTimingFunctionName.easeIn
                } else if(easing=="easeOut"){
                    self.animationEasing=CAMediaTimingFunctionName.easeOut
                }else{
                    self.animationEasing=CAMediaTimingFunctionName.linear
                }
            }
        }
    }
    
    func hexStringToUIColor(hexColor: String) -> UIColor {
        let stringScanner = Scanner(string: hexColor)
        
        if(hexColor.hasPrefix("#")) {
            stringScanner.scanLocation = 1
        }
        var color: UInt32 = 0
        stringScanner.scanHexInt32(&color)
        
        let r = CGFloat(Int(color >> 16) & 0x000000FF)
        let g = CGFloat(Int(color >> 8) & 0x000000FF)
        let b = CGFloat(Int(color) & 0x000000FF)
        
        return UIColor(red: r / 255.0, green: g / 255.0, blue: b / 255.0, alpha: 1)
    }
}
