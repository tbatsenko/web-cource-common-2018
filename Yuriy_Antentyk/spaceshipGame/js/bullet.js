let bullets = []

class Bullet extends UniformlyMovingItem{
    constructor(speedX, speedY){
        const view = document.createElement("div")
        view.classList.add("field__bullet")
        config.fieldView.appendChild(view)

        super(spaceship.x, spaceship.y, config.bulletRadius, speedX, speedY, view)
    }

    update(){
        super.update()
        super.updateView()
    }
}

const spawnPackOfBullets = () => {
    speedX = Array(3).fill(config.maxSpeedAllowed)
    speedY = [
        config.maxSpeedAllowed * config.sideBulletSpeedMultiplier,
        0,
        -config.maxSpeedAllowed * config.sideBulletSpeedMultiplier
    ]

    for(let i = 0; i < speedX.length; ++i){
        bullets.push(new Bullet(speedX[i], speedY[i]))
        bullets[bullets.length - 1].updateView()
    }
}
