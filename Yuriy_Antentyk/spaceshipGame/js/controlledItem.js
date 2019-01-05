class ControlledItem extends MovingItem{
    constructor(x, y, radius, view, boundsX, boundsY){
        super(x, y, radius, view)

        this.__speedX = 0
        this.__speedY = 0

        this.__boundsX = boundsX
        this.__boundsY = boundsY
    }

    handleSpeed(){
        this.__speedX *= config.movementFadeCoefficient
        this.__speedY *= config.movementFadeCoefficient
        this.__speedX = Math.max(Math.min(this.__speedX, config.maxSpeedAllowed), -config.maxSpeedAllowed)
        this.__speedY = Math.max(Math.min(this.__speedY, config.maxSpeedAllowed), -config.maxSpeedAllowed)
    }

    handleCoord(){
        this.x = Math.min(Math.max(this.x, this.__boundsX[0]), this.__boundsX[1])
        this.y = Math.min(Math.max(this.y, this.__boundsY[0]), this.__boundsY[1])
    }

    update(isPressed){
        let deltaX = 0, deltaY = 0
        if(isPressed[config.leftKey])
            deltaX -= config.movementSpeedGain
        if(isPressed[config.rightKey])
            deltaX += config.movementSpeedGain
        if(isPressed[config.upKey])
            deltaY -= config.movementSpeedGain
        if(isPressed[config.downKey])
            deltaY += config.movementSpeedGain
        this.__speedX += deltaX
        this.__speedY += deltaY
        this.handleSpeed()
        this.x += this.__speedX
        this.y += this.__speedY
        this.handleCoord()
    }
}
