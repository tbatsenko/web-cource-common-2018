import {field} from './field'
import {visitedFrames} from './render'

const addToVisited = (element) => {
    if (!(visitedFrames.hasOwnProperty(element.join(""))))
        visitedFrames[element.join("")] = element
}

const checkIfWall = (coordinate) => field[coordinate[0]][coordinate[1]] === 0

const pacmanRotation = (direction) => {
    let degrees = {
        "TOP": `<div class="game__cell pacman pacman_top"></div>`,
        "BOTTOM": `<div class="game__cell pacman pacman_bottom"></div>`,
        "LEFT": `<div class="game__cell pacman pacman_left"></div>`,
        "RIGHT": `<div class="game__cell pacman pacman_right"></div>`
    }

    return degrees[direction]
}


export {addToVisited, checkIfWall, pacmanRotation}