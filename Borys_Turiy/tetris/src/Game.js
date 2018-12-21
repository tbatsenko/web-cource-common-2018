const FIELD_SIZE = 10
const TILE_SIZE = 4
const field = Array(FIELD_SIZE)
  .fill()
  .map(() => Array(FIELD_SIZE).fill(0))
console.log(field)
class tile {
  constructor() {
    this.coords = Array(FIELD_SIZE)
      .fill()
      .map(() => Array(FIELD_SIZE).fill(0))
  }

  // Adding a method to the constructor
  greet() {
    return `${this.name} says hello.`;
  }
}




const renderCell = cellNumber => {
  //prettier-ignore
  switch (cellNumber) {
    case 0:
      return `<div class="Game__cell Game__cell--clean"></div>`
    case 1:
      return `<div class="Game__cell Game__cell--cyan"></div>`
    case 2:
      return `<div class="Game__cell Game__cell--blue"></div>`
    case 3:
      return `<div class="Game__cell Game__cell--orange"></div>`
    case 4:
      return `<div class="Game__cell Game__cell--yellow"></div>`
    case 5:
      return `<div class="Game__cell Game__cell--green"></div>`
    case 6:
      return `<div class="Game__cell Game__cell--violet"></div>`
    case 7:
      return `<div class="Game__cell Game__cell--red"></div>`

  }
}
const renderField = (field, container) => {
  container.innerHTML = `
        <div class="Game">
        
        ${field
    .map(
      row =>
        `<div class="Game__row">${row.map(renderCell).join('')}</div>`,
    )
    .join('')}
        </div>
    `
}
const KEY_DOWN = 40
const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_UP = 38
document.addEventListener('keydown', e => {
  console.log(e)
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

function randomPieceNumber() {
  // 0 -> 6
  return Math.floor(Math.random() * 6)
}

let pieces = [
  [[1, 1, 1, 1], [0, 0, 0, 0]],
  [[1, 0, 0, 0], [1, 1, 1, 0]],
  [[0, 0, 1, 0], [1, 1, 1, 0]],
  [[1, 1, 0, 0], [1, 1, 0, 0]],
  [[0, 1, 1, 0], [1, 1, 0, 0]],
  [[0, 1, 0, 0], [1, 1, 1, 0]],
  [[1, 1, 0, 0], [0, 1, 1, 0]]]

function addTileToField() {
  let newPieceNumber = randomPieceNumber()
  if (FIELD_SIZE[0] === 3) {
    while (newPieceNumber === 0) {
      newPieceNumber = randomPieceNumber()
    }
  }
  else if (FIELD_SIZE[0] < 4) {
    printError('Too small field')
  }
  let piece = pieces[newPieceNumber]
  let fieldCenter = Math.ceil(FIELD_SIZE / 2)
  let leftEdge = fieldCenter - 2
  console.log(leftEdge)
  for (let i = 0; i <= 3; i++) {
    field[0][leftEdge + i] = (newPieceNumber + 1) * piece[0][i]
    field[1][leftEdge + i] = (newPieceNumber + 1) * piece[1][i]
    console.log(field)
  }
}

setInterval(() => {
  addTileToField()
  renderField(field, document.body)
}, 1000)