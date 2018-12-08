const FIELD_SIZE = 4
let field = Array(FIELD_SIZE)
  .fill()
  .map(() => Array(FIELD_SIZE).fill(0))
let move = 0


const renderField = (field, gameClass) => {
  document.querySelector(gameClass).innerHTML = `
    
      ${field
    .map(
      row => `<div class="Game__col">${row.map(renderCell).join('')}</div>`,
    )
    .join('')}
    
    `
}

const renderCell = cellNumber =>
  //prettier-ignore
  (cellNumber === 0) ? `<div class="Game__cell Game__cell--free"></div>`
    : `<div class="Game__cell Game__cell--num">${cellNumber}</div>`


function createNumber() {
  let arr = []
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 0) arr.push([i, j])
    }
  }

  if (arr.length > 0) {
    const idx = Math.floor(Math.random() * arr.length)
    // console.log(idx, arr[idx])
    field[arr[idx][0]][arr[idx][1]] = randomNumberGenerator()

  }

}


function randomNumberGenerator() {
  let res = 2
  let ra = Math.random()
  while (ra < 1 / res - 1 / move) {
    res *= 2
  }
// console.log(ra , 1 / res - 1 / move)
  return res !== 2 ? (res / 2) : res
}

function isValid(i) {
  return (i > -1 && i < FIELD_SIZE)
}


function updateMovesNumber(movesClass) {
  document.querySelector(movesClass).innerHTML = `${move}`
}

function validKeyCode(e) {
  return (e.keyCode === KEY_DOWN || e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT || e.keyCode === KEY_UP)
}

const KEY_DOWN = 40
const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_UP = 38

document.addEventListener('keypress', e => {
  //prettier-ignore
  direction =
    e.keyCode === KEY_DOWN ? 'BOTTOM'
      : e.keyCode === KEY_LEFT ? 'LEFT'
      : e.keyCode === KEY_RIGHT ? 'RIGHT'
        : e.keyCode === KEY_UP ? 'TOP'
          : direction
  if (validKeyCode(e)) {
    let mv = moveBlocks(direction)
    if (mv) move++
    createNumber()
    renderField(field, '.Game')
    updateMovesNumber('.move')
    if (!thereAreMoreMoves()) {
      alert(' You lose.\n \n You done ' + move + ' moves')
      field = Array(FIELD_SIZE)
        .fill()
        .map(() => Array(FIELD_SIZE).fill(0))
      move = 0
      createNumber()
      updateMovesNumber('.move')
      renderField(field, '.Game')

    }
  }


})

function moveBlocks(direction) {
  // console.log(field)
  let moved = false
  if (direction === 'RIGHT') {

    for (let i = field.length - 1; i > -1; i--) {
      for (let j = 0; j < field[i].length; j++) {
        if (field[i][j] === 0) continue
        let ii = i + 1
        while (isValid(ii) && field[ii][j] === 0) {
          ii++
        }
        if (isValid(ii)) {
          if (field[ii][j] === field[i][j]) {
            field[ii][j] *= 2
            field[i][j] = 0
            moved = true
          }
          else {
            //  they are not next to each other
            if (ii - 1 !== i) {
              field[ii - 1][j] = field[i][j]
              field[i][j] = 0
              moved = true
            }
          }
        } else if (i !== field.length - 1) {
          field[field.length - 1][j] = field[i][j]
          field[i][j] = 0
          moved = true
        }
      }
    }
  }

  if (direction === 'LEFT') {
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        if (field[i][j] === 0) continue
        let ii = i - 1
        while (isValid(ii) && field[ii][j] === 0) {
          ii--
        }
        if (isValid(ii)) {
          if (field[ii][j] === field[i][j]) {
            field[ii][j] *= 2
            field[i][j] = 0
            moved = true
          }
          else {
            //  they are not next to each other
            if (ii + 1 !== i) {
              field[ii + 1][j] = field[i][j]
              field[i][j] = 0
              moved = true
            }
          }
        } else if (i !== 0) {
          field[0][j] = field[i][j]
          field[i][j] = 0
          moved = true
        }
      }
    }
  }

  if (direction === 'TOP') {
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        if (field[i][j] === 0) continue
        let jj = j - 1
        while (isValid(jj) && field[i][jj] === 0) {
          jj--
        }
        if (isValid(jj)) {
          if (field[i][jj] === field[i][j]) {
            field[i][jj] *= 2
            field[i][j] = 0
            moved = true
          }
          else {
            //  they are not next to each other
            if (jj + 1 !== j) {
              field[i][jj + 1] = field[i][j]
              field[i][j] = 0
              moved = true
            }
          }
        } else if (j !== 0) {
          field[i][0] = field[i][j]
          field[i][j] = 0
          moved = true
        }
      }
    }
  }

  if (direction === 'BOTTOM') {
    for (let i = 0; i < field.length; i++) {
      for (let j = field[i].length - 1; j > -1; j--) {
        if (field[i][j] === 0) continue
        let jj = j + 1
        while (isValid(jj) && field[i][jj] === 0) {
          jj++
        }
        if (isValid(jj)) {
          if (field[i][jj] === field[i][j]) {
            field[i][jj] *= 2
            field[i][j] = 0
            moved = true
          }
          else {
            //  they are not next to each other
            if (jj - 1 !== j) {
              field[i][jj - 1] = field[i][j]
              field[i][j] = 0
              moved = true
            }
          }
        } else if (j !== field[i].length - 1) {
          field[i][field[i].length - 1] = field[i][j]
          field[i][j] = 0
          moved = true
        }
      }
    }
  }


  return moved
  // console.log(direction)
}


function thereAreMoreMoves() {
  let res = false
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 0) return true
      if (isValid(i - 1) && field[i - 1][j] === field[i][j]) {
        return true
      }
      if (isValid(j - 1) && field[i][j - 1] === field[i][j]) {
        return true
      }
    }
  }
  return res
}


let direction = 'TOP'
createNumber()
renderField(field, '.Game')
