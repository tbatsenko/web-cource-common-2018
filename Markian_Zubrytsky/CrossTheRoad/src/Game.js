const FIELD = 13
var field = Array(FIELD)
  .fill()
  .map(() => Array(FIELD).fill(0))

function calcBackground(row_number) {
  if (row_number === 0 || row_number === 13) {
    return 0
  } else if (row_number % 2 === 1) {
    return 1
  } else if (row_number % 2 === 0) {
    return 0
  }
}

function renderCell(cellNumber, background) {
  var cell
  if (background === 0) {
    cell = `<div class="Game__cell__grass">`
  } else if (background === 1) {
    cell = `<div class="Game__cell__road">`
  }
  if (cellNumber === 1) {
    cell += `<img src="./images/spider.png" class="Game__cell__spider">`
  } else if (cellNumber === 2) {
    cell += `<img src="./images/white_car.png" class="Game__cell__car">`
  }

  return cell += `</div>`
}

function renderRow(row, background) {
  var result = `<div class="Game__row">`
  background = calcBackground(background)
  for (var i = 0; i < row.length; i++) {
    result += renderCell(row[i], background)
  }
  return result += `</div>`
}

function renderField(field, container) {
  var rows = `<main class="Game">`
  var background
  for (var i = 0; i < field.length; i++) {
    rows += renderRow(field[i], i)
  }
  container.innerHTML = rows + `</main>`
}

function setSpider(field, x, y) {
  field[x][y] = 1
  return [x, y]
}

function eraseSpider(field, coords) {
  field[coords[0]][coords[1]] = 0
}

// function setCar(field, x, y){
//   const set =  Math.floor(Math.random() * (1 + 1));
//   if(set === 1){
//     field[x][y] = 2;
//   }
// }
//
// function moveCar(field, current_x, current_y){
//   if(field[current_x][current_y] === 2){
//     field[current_x][current_y] = 0;
//     field[current_x][current_y + 1] = 2
//     console.log(current_y)
//   }if(current_y === 11){
//     eraseCar(field, current_x, current_y)
//   }
// }
//
// function eraseCar(field, current_x, current_y){
//     field[current_x][current_y] = 0;
// }

function moveSpider(direction, coords, field) {
  eraseSpider(field, coords)
  if (direction === 'TOP') {
    coords[0] -= 1
  }
  if (direction === 'BOTTOM') {
    coords[0] += 1
  }
  if (direction === 'LEFT') {
    coords[1] -= 1
  }
  if (direction === 'RIGHT') {
    coords[1] += 1
  }
  coords = setSpider(field, coords[0], coords[1])
  return coords
}

var direction
var x = 12
var y = 6
var coord = setSpider(field, x, y)
setInterval(() => {
  coord = moveSpider(direction, coord, field)
  direction = 'NONE'
  renderField(field, document.body)
}, 500)

document.addEventListener('keydown', e => {
  console.log(e)
  switch (e.key) {
    case 'ArrowDown': {
      direction = 'BOTTOM'
      return
    }
    case 'ArrowLeft': {
      direction = 'LEFT'
      return
    }
    case 'ArrowRight': {
      direction = 'RIGHT'
      return
    }
    case 'ArrowUp': {
      direction = 'TOP'
      return
    }
  }
})

