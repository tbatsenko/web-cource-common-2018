let stones = []

class Stone extends UniformlyMovingItem{
    constructor(y){
        const view = document.createElement("div")
        view.classList.add("field__stone")
        config.fieldView.appendChild(view)

        super(
            config.fieldWidth,
            y,
            config.stoneRadius,
            -config.maxSpeedAllowed,
            0,
            view
        )
    }

    update(){
        super.update()
        super.updateView()
    }
}

const spawnStone = () => {
    stones.push(new Stone(getRandomInt(config.stoneRadius, config.fieldHeight - config.stoneRadius)))
    stones[stones.length - 1].updateView()
}

const spawnPackOfStones = () => {
    for(let i = 0; i < config.stoneColCounter; ++i)
        spawnStone()
}