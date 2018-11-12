const FIELD_SIZE = 40
const field = Array(FIELD_SIZE)
  .fill()
  .map(() => Array(FIELD_SIZE).fill(0))

let snake = [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6]]

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

const restrictAtRange = ([A, B]) => X => (X < A ? B : X > B ? A : X)

const restrictAtField = restrictAtRange([0, FIELD_SIZE - 1])

const addObjectToField = (field, coordinates, object = 1) => {
  const newField = JSON.parse(JSON.stringify(field))
  coordinates.forEach(([x, y]) => (newField[x][y] = object))
  return newField
}

const renderCell = cellNumber =>
  //prettier-ignore
  (cellNumber === 0) ? `<div class="Game__cell Game__cell--ground"></div>`
: (cellNumber === 1) ? `<div class="Game__cell Game__cell--snake"></div>`
: (cellNumber === 2) ? `<div class="Game__cell Game__cell--apple"></div>`
                     : `<div class="Game__cell"></div>`

const renderField = (field, container) => {
  container.innerHTML = `
        <div class="Game">
        
        ${field
          .map(
            row =>
              `<div class="Game__row">${row.map(renderCell).join('')}</div>`
          )
          .join('')}
        </div>
    `
}

const KEY_DOWN = 40
const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_UP = 38

const getNextSnakeHead = (snake, direction) => {
  if (direction === 'BOTTOM') {
    const [x, y] = snake[snake.length - 1]
    return [x, restrictAtField(y + 1)]
  }

  if (direction === 'TOP') {
    const [x, y] = snake[snake.length - 1]
    return [x, restrictAtField(y - 1)]
  }

  if (direction === 'LEFT') {
    const [x, y] = snake[snake.length - 1]
    return [restrictAtField(x - 1), y]
  }

  if (direction === 'RIGHT') {
    const [x, y] = snake[snake.length - 1]
    return [restrictAtField(x + 1), y]
  }
}

let direction = 'BOTTOM'

const generateRandomApple = () => [
  getRandomInt(0, FIELD_SIZE),
  getRandomInt(0, FIELD_SIZE),
]

let apples = [
  generateRandomApple(),
  generateRandomApple(),
  generateRandomApple(),
]

const checkIfSnakeAteApple = (snakeHead, apples) => {
  const head = snakeHead
  return apples.findIndex(([x, y]) => head[0] === x && head[1] === y) >= 0
}

setInterval(() => {
  const snakeHead = getNextSnakeHead(snake, direction)
  const fieldWithSnake = addObjectToField(field, snake)

  if (checkIfSnakeAteApple(snakeHead, apples)) {
    apples = apples.filter(
      ([x, y]) => !(snakeHead[0] === x && snakeHead[1] === y)
    )
  } else {
    snake.shift()
  }

  const fieldWithSnakeAndApple = addObjectToField(fieldWithSnake, apples, 2)

  snake.push(snakeHead)

  renderField(fieldWithSnakeAndApple, document.body)
}, 100)

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
