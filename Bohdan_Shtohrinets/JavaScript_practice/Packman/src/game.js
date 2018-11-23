const FIELD_SIZE = 20

let field = [
    Array(FIELD_SIZE).fill(0),
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 3, 3, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 3, 3, 0, 3, 3, 3, 3, 0, 0, 3, 0],
    [0, 3, 3, 3, 3, 0, 0, 3, 0, 3, 3, 0, 3, 0, 0, 3, 3, 3, 3, 0],
    [0, 3, 0, 0, 3, 3, 3, 3, 0, 3, 3, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 3, 3, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0],
    [0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 3, 3, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 3, 3, 3, 0, 3, 3, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 3, 3, 3, 0, 0, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 3, 3, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    [0, 3, 0, 0, 3, 0, 0, 3, 0, 3, 3, 0, 3, 0, 0, 3, 0, 0, 3, 0],
    Array(FIELD_SIZE).fill(0)
]

const pacman = [[10, 12]]
const ghost = [[10, 9]]


let visitedFrames = {}
let score = 0

console.log(score)
const addToVisited = (element) => {
    if (!(visitedFrames.hasOwnProperty(element.join(""))))
        visitedFrames[element.join("")] = element
}


const pacmanRotation = (direction) => {
    let degrees = {
        "TOP": `<div class="game__cell pacman pacman_top"></div>`,
        "BOTTOM": `<div class="game__cell pacman pacman_bottom"></div>`,
        "LEFT": `<div class="game__cell pacman pacman_left"></div>`,
        "RIGHT": `<div class="game__cell pacman pacman_right"></div>`
    }
    return degrees[direction]
}

const removeCoin = (coordinates, direction) => {
    let x = coordinates[0]
    let y = coordinates[1]
    if (direction === "LEFT") {
        if (!(checkIfWall([x + 1, y]))) {
            addToVisited([x + 1, y])
        }
    }
    if (direction === "RIGHT") {
        if (!(checkIfWall([x - 1, y]))) {
            addToVisited([x - 1, y])
        }
    }
    if (direction === "TOP") {
        if (!(checkIfWall([x, y + 1]))) {
            addToVisited([x, y + 1])
        }
    }
    if (direction === "BOTTOM") {
        if (!(checkIfWall([x, y - 1]))) {
            addToVisited([x, y - 1])
        }
    }
}

const renderCell = (cellNumber, pacmanDirection) => {
    if (cellNumber === 0)
        return `<div class="game__cell game__cell_wall"></div>`

    else if (cellNumber === 1)
        return pacmanRotation(pacmanDirection)

    else if (cellNumber === 2)
        return `<div class="game__cell game__cell_ghost"></div>`

    else if (cellNumber === 3)
        return `<div class="game__cell game__cell_with-coin"></div>`

    return `<div class="game__cell"></div>`
}

const renderField = (field, container, direction = []) => {
    let counter = 0
    container.innerHTML = `
        <div class="game">
        ${field
        .map(
            (row) => {
                let result = []
                for (let i = 0; i < row.length; i++) {
                    if (visitedFrames.hasOwnProperty([counter, i].join("")) && row[i] !== 1) {
                        result.push(renderCell(4, direction))
                    }
                    else
                        result.push(renderCell(row[i], direction))
                }
                counter++
                return `<div class="game__row">${result.join('')}</div>`
            }
        )
        .join('')}
        </div>
    `
}


renderField(field, document.body)

const KEY_DOWN = 40
const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_UP = 38

const addObjectToField = (field, coordinates, object = 1) => {
    const newField = JSON.parse(JSON.stringify(field))
    coordinates.forEach(([x, y]) => (newField[x][y] = object))
    return newField
}

checkIfWall = (coordinate) => field[coordinate[0]][coordinate[1]] === 0

const getRandomDirection = () => {
    let directions = ["TOP", "BOTTOM", "RIGHT", "LEFT"]
    let randomIndex = Math.floor(Math.random() * directions.length);

    return directions[randomIndex]
}

const getPacman = (pacman, direction) => {
    if (direction === 'BOTTOM') {
        const [x, y] = pacman[0]
        if (checkIfWall([x, y + 1])) {
            return [x, y]
        }
        return [x, y + 1]
    }

    if (direction === 'TOP') {
        const [x, y] = pacman[0]
        if (checkIfWall([x, y - 1])) {
            return [x, y]
        }
        return [x, y - 1]
    }

    if (direction === 'LEFT') {
        const [x, y] = pacman[0]
        if (checkIfWall([x - 1, y])) {
            return [x, y]
        }
        return [x - 1, y]
    }

    if (direction === 'RIGHT') {
        const [x, y] = pacman[0]
        if (checkIfWall([x + 1, y])) {
            return [x, y]
        }
        return [x + 1, y]
    }
}

const getGhost = (ghost, direction) => {
    if (direction === 'BOTTOM') {
        const [x, y] = ghost[0]
        if (checkIfWall([x, y + 1])) {
            return [x, y]
        }
        return [x, y + 1]
    }

    if (direction === 'TOP') {
        const [x, y] = ghost[0]
        if (checkIfWall([x, y - 1])) {
            return [x, y]
        }
        return [x, y - 1]
    }

    if (direction === 'LEFT') {
        const [x, y] = ghost[0]
        if (checkIfWall([x - 1, y])) {
            return [x, y]
        }
        return [x - 1, y]
    }

    if (direction === 'RIGHT') {
        const [x, y] = ghost[0]
        if (checkIfWall([x + 1, y])) {
            return [x, y]
        }
        return [x + 1, y]
    }
}

let direction = 'RIGHT'

setInterval(() => {
    const pacmanHead = getPacman(pacman, direction)
    const fieldWithPacman = addObjectToField(field, pacman)
    removeCoin(pacman[0], direction)
    pacman.shift()
    pacman.push(pacmanHead)

    const ghostHead = getGhost(ghost, getRandomDirection())
    const fieldWithPacmanAndGhost = addObjectToField(fieldWithPacman, ghost, 2)
    ghost.shift()
    ghost.push(ghostHead)

    renderField(fieldWithPacmanAndGhost, document.body, direction)
}, 300)


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
