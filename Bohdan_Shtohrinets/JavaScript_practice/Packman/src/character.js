import {addToVisited, checkIfWall} from './check'

const getCharacter = (character, direction, characterName) => {
    let [x, y] = character[0]
    if (characterName === "pacman") addToVisited([x, y])

    if (direction === 'BOTTOM') {
        if (!(checkIfWall([x, y + 1])))
            y++
    }

    if (direction === 'TOP') {
        if (!(checkIfWall([x, y - 1])))
            y--
    }

    if (direction === 'LEFT') {
        if (!(checkIfWall([x - 1, y])))
            x--
    }

    if (direction === 'RIGHT') {
        if (!(checkIfWall([x + 1, y])))
            x++
    }

    return [x, y]
}

export default getCharacter