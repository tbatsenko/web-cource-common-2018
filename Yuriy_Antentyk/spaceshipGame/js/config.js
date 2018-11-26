class Config{
    constructor(){
        this.__fieldView = document.getElementById("field")
        this.__fieldHeight = this.__fieldView.offsetHeight
        this.__fieldWidth = this.__fieldView.offsetWidth

        this.__scoreView = document.getElementById("score")
        this.__spaceshipView = document.getElementById("spaceship")

        this.__stoneRadius = Math.ceil(this.fieldHeight / 10)
        this.__spaceshipRadius = Math.ceil(this.fieldHeight / 20)
        this.__bulletRaduis = Math.ceil(this.fieldHeight / 30)

        document.documentElement.style.setProperty('--field__stone-size', 2 * this.stoneRadius + "px")
        document.documentElement.style.setProperty('--field__spaceship-size', 2 * this.spaceshipRadius + "px")
        document.documentElement.style.setProperty('--field__bullet-size', 2 * this.bulletRadius + "px")
    }

    get upKey(){ return 38 }
    get downKey(){ return 40 }
    get leftKey(){ return 37 }
    get rightKey(){ return 39 }

    get controlKeys(){ return [this.upKey, this.downKey, this.leftKey, this.rightKey] }

    get fieldView(){ return this.__fieldView }
    get scoreView(){ return this.__scoreView }
    get spaceshipView(){ return this.__spaceshipView }

    get renderTimeDelta(){ return 15 }
    get garbageCollectingTimeDelta(){ return 1000 }
    get bulletSpawnTimeDelta(){ return 600 }
    get stoneSpawnTimeDelta(){ return 600 }
    get sideBulletSpeedMultiplier(){ return 1/4 }

    get movementFadeCoefficient(){ return 0.95 }
    get movementSpeedGain(){ return 0.5 }
    get maxSpeedAllowed(){ return 5 }

    get fieldHeight(){ return this.__fieldHeight }
    get fieldWidth(){ return this.__fieldWidth }

    get spaceshipRadius(){ return this.__spaceshipRadius }
    get stoneRadius(){ return this.__stoneRadius }
    get bulletRadius(){ return this.__bulletRaduis }

    get stoneColCounter(){ return 4 }
}

const config = new Config()
