class Spaceship extends ControlledItem{
    constructor(){
        super(
            config.spaceshipRadius,
            config.fieldHeight / 2,
            config.spaceshipRadius,
            config.spaceshipView,
            [config.spaceshipRadius, Math.floor(config.fieldWidth / 2)],
            [config.spaceshipRadius, config.fieldHeight - config.spaceshipRadius]
        )
    }

    update(isPressed){
        super.update(isPressed)
        super.updateView()
    }
}

const spaceship = new Spaceship()
