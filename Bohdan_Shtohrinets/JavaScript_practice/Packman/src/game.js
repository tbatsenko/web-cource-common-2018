import getCharacter from './character'
import {field, pacman, ghost} from './field'
import renderField from './render'

let gameOver = false
let direction = 'RIGHT'

const KEY_DOWN = 40
const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_UP = 38

const addObjectToField = (field, coordinates, object = 1) => {
    const newField = JSON.parse(JSON.stringify(field))
    coordinates.forEach(([x, y]) => (newField[x][y] = object))

    return newField
}

const getRandomDirection = () => {
    let directions = ["TOP", "BOTTOM", "RIGHT", "LEFT"]
    let randomIndex = Math.floor(Math.random() * directions.length);

    return directions[randomIndex]
}

renderField(field, document.body)

setInterval(() => {
    const pacmanHead = getCharacter(pacman, direction, "pacman")
    const fieldWithPacman = addObjectToField(field, pacman)
    pacman.shift()
    pacman.push(pacmanHead)

    const ghostHead = getCharacter(ghost, getRandomDirection(), "ghost")
    const fieldWithPacmanAndGhost = addObjectToField(fieldWithPacman, ghost, 2)
    ghost.shift()
    ghost.push(ghostHead)

    if (pacmanHead.join("") === ghost[0].join("") || pacman[0].join("") === ghostHead.join("")) {
        console.log("game over!!!")
        gameOver = true
    }

    if (!gameOver) renderField(fieldWithPacmanAndGhost, document.body, direction)
}, 350)

document.addEventListener('keypress', e => {
    switch (e.keyCode) {
        case KEY_DOWN: {
            direction = 'BOTTOM'
            return
        }
        case KEY_LEFT: {
            direction = 'LEFT'
            return
        }
        case KEY_RIGHT: {
            direction = 'RIGHT'
            return
        }
        case KEY_UP: {
            direction = 'TOP'
            return
        }
    }
})
