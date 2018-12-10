class UniformlyMovingItem extends MovingItem{
    constructor(x, y, radius, speedX, speedY, view){
        super(x, y, radius, view)

        this.__speedX = Math.max(Math.min(speedX, config.maxSpeedAllowed), -config.maxSpeedAllowed)
        this.__speedY = Math.max(Math.min(speedY, config.maxSpeedAllowed), -config.maxSpeedAllowed)
    }

    update(){
        this.x += this.__speedX
        this.y += this.__speedY
    }
}
