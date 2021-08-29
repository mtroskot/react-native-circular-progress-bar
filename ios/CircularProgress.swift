//
//  KDCircularProgress.swift
//  KDCircularProgress
//
//  Copyright (c) 2019 Kaan Dedeoglu. All rights reserved.
//
import UIKit

@objc public enum KDCircularProgressGlowMode: Int {
    case forward, reverse, constant, noGlow
}

@IBDesignable
@objcMembers
public class KDCircularProgress: UIView, CAAnimationDelegate {
    var progressLayer: KDCircularProgressViewLayer {
        get {
            return layer as! KDCircularProgressViewLayer
        }
    }
    
    private var radius: CGFloat = 0.0 {
        didSet {
            progressLayer.radius = radius
        }
    }
    
    @IBInspectable public var progress: Double = 0.0 {
        didSet {
            pauseIfAnimating()
            progressLayer.progress = progress
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var angle: Double = 0.0 {
        didSet {
            pauseIfAnimating()
            progressLayer.angle = angle
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var startAngle: Double = 0.0 {
        didSet {
            startAngle = startAngle.mod(between: 0.0, and: 360.0, byIncrementing: 360.0)
            progressLayer.startAngle = startAngle
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var clockwise: Bool = true {
        didSet {
            progressLayer.clockwise = clockwise
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var roundedCorners: Bool = true {
        didSet {
            progressLayer.roundedCorners = roundedCorners
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var gradientDirection: String = "LEFT_TO_RIGHT" {
        didSet {
            progressLayer.gradientDirection = gradientDirection
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var progressThickness: CGFloat = 0.4 {
        didSet {
            progressThickness = progressThickness.clamp(lowerBound: 0.0, upperBound: 1.0)
            progressLayer.progressThickness = progressThickness / 2.0
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var trackThickness: CGFloat = 0.5 {//Between 0 and 1
        didSet {
            trackThickness = trackThickness.clamp(lowerBound: 0.0, upperBound: 1.0)
            progressLayer.trackThickness = trackThickness / 2.0
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var trackColor: UIColor = .black {
        didSet {
            progressLayer.trackColor = trackColor
            progressLayer.setNeedsDisplay()
        }
    }
    
    @IBInspectable public var progressInsideFillColor: UIColor? = nil {
        didSet {
            progressLayer.progressInsideFillColor = progressInsideFillColor ?? .clear
        }
    }
    
    public var progressColors: [UIColor] {
        get { return progressLayer.colorsArray }
        set { set(colors: newValue) }
    }
    
    //These are used only from the Interface-Builder. Changing these from code will have no effect.
    //Also IB colors are limited to 3, whereas programatically we can have an arbitrary number of them.
    @objc @IBInspectable private var IBColor1: UIColor?
    @objc @IBInspectable private var IBColor2: UIColor?
    @objc @IBInspectable private var IBColor3: UIColor?
    
    private var animationCompletionBlock: ((Bool) -> Void)?
    
    override public init(frame: CGRect) {
        super.init(frame: frame)
        setInitialValues()
        refreshValues()
    }
    
    convenience public init(frame:CGRect, colors: UIColor...) {
        self.init(frame: frame)
        set(colors: colors)
    }
    
    required public init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        translatesAutoresizingMaskIntoConstraints = false
        setInitialValues()
        refreshValues()
    }
    
    public override func awakeFromNib() {
        checkAndSetIBColors()
    }
    
    override public class var layerClass: AnyClass {
        return KDCircularProgressViewLayer.self
    }
    
    public override func layoutSubviews() {
        super.layoutSubviews()
        radius = (frame.size.width / 2.0) * 0.8
    }
    
    private func setInitialValues() {
        radius = (frame.size.width / 2.0) * 0.8 //We always apply a 20% padding, stopping glows from being clipped
        backgroundColor = .clear
        set(colors: .white, .cyan)
    }
    
    private func refreshValues() {
        progressLayer.angle = angle
        progressLayer.startAngle = startAngle
        progressLayer.clockwise = clockwise
        progressLayer.roundedCorners = roundedCorners
        progressLayer.progressThickness = progressThickness / 2.0
        progressLayer.trackColor = trackColor
        progressLayer.trackThickness = trackThickness / 2.0
    }
    
    private func checkAndSetIBColors() {
        let IBColors = [IBColor1, IBColor2, IBColor3].compactMap { $0 }
        if IBColors.isEmpty == false {
            set(colors: IBColors)
        }
    }
    
    public func set(colors: UIColor...) {
        set(colors: colors)
    }
    
    private func set(colors: [UIColor]) {
        progressLayer.colorsArray = colors
        progressLayer.setNeedsDisplay()
    }
    
    public func animate(fromAngle: Double, toAngle: Double, duration: TimeInterval=1,delay:TimeInterval=0,easing:CAMediaTimingFunctionName=CAMediaTimingFunctionName.linear, relativeDuration: Bool = true, completion: ((Bool) -> Void)?) {
        pauseIfAnimating()
        let animationDuration: TimeInterval
        if relativeDuration {
            animationDuration = duration
        } else {
            let traveledAngle = (toAngle - fromAngle).mod(between: 0.0, and: 360.0, byIncrementing: 360.0)
            let scaledDuration = TimeInterval(traveledAngle) * duration / 360.0
            animationDuration = scaledDuration
        }
        
        let animation = CABasicAnimation(keyPath: #keyPath(KDCircularProgressViewLayer.progress))
        animation.fromValue = fromAngle
        animation.toValue = toAngle
        animation.duration = animationDuration
        animation.delegate = self
        animation.timingFunction=CAMediaTimingFunction(name: easing)
        animation.isRemovedOnCompletion = false
        animationCompletionBlock = completion
        if(delay<=0){
            progress=toAngle
        }else{
            animation.fillMode=CAMediaTimingFillMode.forwards
            animation.beginTime = CACurrentMediaTime() + delay
            progress=fromAngle
        }
        progressLayer.add(animation, forKey: "progress")
    }
    
    public func animate(toAngle: Double, duration: TimeInterval, relativeDuration: Bool = true, completion: ((Bool) -> Void)?) {
        pauseIfAnimating()
        animate(fromAngle: progress, toAngle: toAngle, duration: duration, relativeDuration: relativeDuration, completion: completion)
    }
    
    public func pauseAnimation() {
        guard let presentationLayer = progressLayer.presentation() else { return }
        
        let currentValue = presentationLayer.progress
        progressLayer.removeAllAnimations()
        progress = currentValue
    }
    
    private func pauseIfAnimating() {
        if isAnimating() {
            pauseAnimation()
        }
    }
    
    public func stopAnimation() {
        progressLayer.removeAllAnimations()
        progress = 0
    }
    
    public func isAnimating() -> Bool {
        return progressLayer.animation(forKey: "progress") != nil
    }
    
    public func animationDidStop(_ anim: CAAnimation, finished flag: Bool) {
        animationCompletionBlock?(flag)
        animationCompletionBlock = nil
    }
    
    public override func didMoveToWindow() {
        window.map { progressLayer.contentsScale = $0.screen.scale }
    }
    
    public override func willMove(toSuperview newSuperview: UIView?) {
        if newSuperview == nil {
            pauseIfAnimating()
        }
    }
    
    public override func prepareForInterfaceBuilder() {
        setInitialValues()
        refreshValues()
        checkAndSetIBColors()
        progressLayer.setNeedsDisplay()
    }
    
    class KDCircularProgressViewLayer: CALayer {
        @NSManaged var angle: Double
        var radius: CGFloat = 0.0 {
            didSet { invalidateGradientCache() }
        }
        var startAngle: Double = 0.0
        @NSManaged var progress : Double
        var clockwise: Bool = true {
            didSet {
                if clockwise != oldValue {
                    invalidateGradientCache()
                }
            }
        }
        var gradientDirection:String="LEFT_TO_RIGHT"
        var roundedCorners: Bool = true
        var lerpColorMode: Bool = false
        var gradientRotateSpeed: CGFloat = 0.0 {
            didSet { invalidateGradientCache() }
        }
        var glowAmount: CGFloat = 0.0
        var glowMode: KDCircularProgressGlowMode = .forward
        var progressThickness: CGFloat = 0.5
        var trackThickness: CGFloat = 0.5
        var trackColor: UIColor = .black
        var progressInsideFillColor: UIColor = .clear
        var colorsArray: [UIColor] = [] {
            didSet { invalidateGradientCache() }
        }
        private var gradientCache: CGGradient?
        private var locationsCache: [CGFloat]?
        
        override class func needsDisplay(forKey key: String) -> Bool {
            if key == #keyPath(progress) {
                return true
            }
            return super.needsDisplay(forKey: key)
        }
        
        override init(layer: Any) {
            super.init(layer: layer)
            let progressLayer = layer as! KDCircularProgressViewLayer
            progress = progressLayer.progress
            radius = progressLayer.radius
            angle = progressLayer.angle
            startAngle = progressLayer.startAngle
            clockwise = progressLayer.clockwise
            roundedCorners = progressLayer.roundedCorners
            progressThickness = progressLayer.progressThickness
            trackThickness = progressLayer.trackThickness
            trackColor = progressLayer.trackColor
            colorsArray = progressLayer.colorsArray
            progressInsideFillColor = progressLayer.progressInsideFillColor
            gradientDirection=progressLayer.gradientDirection
        }
        
        override init() {
            super.init()
        }
        
        required init?(coder aDecoder: NSCoder) {
            super.init(coder: aDecoder)
        }
        
        override func draw(in ctx: CGContext) {
            UIGraphicsPushContext(ctx)
            
            let size = bounds.size
            let width = size.width
            let height = size.height
            
            let trackLineWidth = radius * trackThickness
            let progressLineWidth = radius * progressThickness
            let arcRadius = max(radius - trackLineWidth / 2.0, radius - progressLineWidth / 2.0)
            let linecap: CGLineCap = roundedCorners ? .round : .butt
            
            let spaceDegree=CGFloat(startAngle)
            var archAngle=CGFloat(self.angle)
            if(!clockwise){
                archAngle = CGFloat(-self.angle)
            }
            var circle:Double = 360.0
            if(!clockwise){
                circle = -360.0
            }
            let angleStart = deg2rad(CGFloat(circle)-archAngle/2+spaceDegree)
            let angleEnd = deg2rad(0+archAngle/2+spaceDegree)
            //background arc
            ctx.addArc(center: CGPoint(x: width / 2.0, y: height / 2.0),
                       radius: arcRadius,
                       startAngle: angleStart,
                       endAngle: angleEnd,
                       clockwise:clockwise)
            
            ctx.setStrokeColor(trackColor.cgColor)
            ctx.setFillColor(progressInsideFillColor.cgColor)
            ctx.setLineWidth(trackLineWidth)
            ctx.setLineCap(linecap)
            ctx.drawPath(using: .fillStroke)
            
            UIGraphicsBeginImageContextWithOptions(size, false, 0.0)
            
            let imageCtx = UIGraphicsGetCurrentContext()
            
            var archProgress = -(360-angle)*progress
            if(!clockwise){
                archProgress = (360-angle)*progress
            }
            let progressAngleStart = deg2rad(720+(360-spaceDegree-archAngle/2))
            let progressAngleEnd=CGFloat((90-Double(archAngle/2))+archProgress);
            let progressAngleEndPosition = deg2rad(720+(270-spaceDegree)+progressAngleEnd)
            //progress arc
            imageCtx?.addArc(center: CGPoint(x: width / 2.0, y: height / 2.0),
                             radius: arcRadius,
                             startAngle: progressAngleStart,
                             endAngle: progressAngleEndPosition,
                             clockwise:clockwise)
            
            imageCtx?.setLineCap(linecap)
            imageCtx?.setLineWidth(progressLineWidth)
            imageCtx?.drawPath(using: .stroke)
            
            let drawMask: CGImage = UIGraphicsGetCurrentContext()!.makeImage()!
            UIGraphicsEndImageContext()
            
            ctx.saveGState()
            ctx.clip(to: bounds, mask: drawMask)
            
            if colorsArray.isEmpty {
                fillRect(withContext: ctx, color: .white)
            } else if colorsArray.count == 1 {
                fillRect(withContext: ctx, color: colorsArray[0])
            }  else {
                drawGradient(withContext: ctx, colorsArray: colorsArray)
            }
            
            ctx.restoreGState()
            UIGraphicsPopContext()
        }
        
        private func fillRect(withContext context: CGContext, color: UIColor) {
            context.setFillColor(color.cgColor)
            context.fill(bounds)
        }
        
        private func drawGradient(withContext context: CGContext, colorsArray: [UIColor]) {
            let baseSpace = CGColorSpaceCreateDeviceRGB()
            let start:CGFloat=0
            let end:CGFloat=1;
            var locations = [start,end]
            var startPoint=CGPoint(x:0,y:110)
            var endPoint=CGPoint(x:220,y:110)
            if(gradientDirection=="RIGHT_TO_LEFT" ){
                locations = [end,start]
            }else if(gradientDirection=="BOTTOM_TO_TOP"){
                startPoint=CGPoint(x:110,y:0)
                endPoint=CGPoint(x:110,y:220)
            }else if(gradientDirection=="TOP_TO_BOTTOM"){
                locations = [end,start]
                startPoint=CGPoint(x:110,y:0)
                endPoint=CGPoint(x:110,y:220)
            }
            let gradient: CGGradient
            if let cachedGradient = gradientCache {
                gradient = cachedGradient
            } else {
                guard let newGradient = CGGradient(colorSpace: baseSpace, colorComponents: colorsArray.rgbNormalized.componentsJoined,
                                                   locations: locations, count: colorsArray.count) else { return }
                gradientCache = newGradient
                gradient = newGradient
            }
            context.drawLinearGradient(gradient, start: startPoint, end: endPoint, options: .drawsBeforeStartLocation)
        }
        
        private func invalidateGradientCache() {
            gradientCache = nil
            locationsCache = nil
        }
    }
}

//Some helper extensions below
private extension Array where Element == UIColor {
    // Make sure every color in colors array is in RGB color space
    var rgbNormalized: [UIColor] {
        return map { color in
            guard color.cgColor.numberOfComponents == 2 else {
                return color
            }
            
            let white: CGFloat = color.cgColor.components![0]
            return UIColor(red: white, green: white, blue: white, alpha: 1.0)
        }
    }
    
    var componentsJoined: [CGFloat] {
        return flatMap { $0.cgColor.components ?? [] }
    }
}

private extension Comparable {
    func clamp(lowerBound: Self, upperBound: Self) -> Self {
        return min(max(self, lowerBound), upperBound)
    }
}

private extension FloatingPoint {
    var radians: Self {
        return self * .pi / Self(180)
    }
    
    func mod(between left: Self, and right: Self, byIncrementing interval: Self) -> Self {
        assert(interval > 0)
        assert(interval <= right - left)
        assert(right > left)
        
        if self >= left, self <= right {
            return self
        } else if self < left {
            return (self + interval).mod(between: left, and: right, byIncrementing: interval)
        } else {
            return (self - interval).mod(between: left, and: right, byIncrementing: interval)
        }
    }
}

private func deg2rad(_ number: CGFloat) -> CGFloat {
    return number * .pi / 180
}
