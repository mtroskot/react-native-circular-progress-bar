
@objc(CircularProgressBarViewManager)
class CircularProgressBarViewManager: RCTViewManager {
    
    override func view() -> (CircularProgressBarView) {
        return CircularProgressBarView()
    }
}

class CircularProgressBarView : CircularProgressBar {
    var animateFill=false;
    
    @objc var backgroundProgressBarColor: String = "" {
        didSet {
            self.backgroundShapeColor = hexStringToUIColor(hexColor: backgroundProgressBarColor)
        }
    }
    
    @objc var progressBarColor: String = "" {
        didSet {
            self.progressShapeColor = hexStringToUIColor(hexColor: progressBarColor)
        }
    }
    
    @objc var progressBarWidth: CGFloat = 10 {
        didSet {
            self.lineWidth = progressBarWidth
        }
    }
    
    @objc var backgroundProgressBarWidth: CGFloat = 0.0 {
        didSet {
            self.inset = -backgroundProgressBarWidth
        }
    }
    
    @objc var fill: CGFloat = 10 {
        didSet {
            self.setProgress(progress: fill/100, animated: animateFill)
        }
    }
    
    @objc var archAngle: CGFloat = 10 {
        didSet {
            self.spaceDegree = archAngle
        }
    }
    
    @objc var startAngle: CGFloat = 90 {
        didSet {
            self.defaultStartAngle = startAngle
        }
    }
    
    @objc var clockwiseFill: Bool = true {
        didSet {
            self.clockwise = clockwiseFill
        }
    }
    
    @objc var roundBorder: Bool = true {
        didSet {
            self.lineCap = roundBorder ? .round : .square
        }
    }
    
    @objc var animateProgress: Bool = false {
        didSet {
            animateFill = animateProgress
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
