// set_background(id) {
//   document.getElementById(id).style.backgroundColor = this.background
// }

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}


class Cell {
  constructor(id, value) {
    this.id = id
    this.value = value
  }
}


class Game {

  constructor() {
    this.init_const()
    this.init()
  }

  flip(tile) {
    if (this.opened_cells.length < 2) {
      tile.innerHTML = '<img src="images/' + this.cells[tile.id].value + '.png">'
      tile.style.backgroundColor = '#ffffff'

      this.opened_cells.push(this.cells[tile.id])

      if (this.opened_cells.length === 2) {

        if (this.opened_cells[0].value === this.opened_cells[1].value) {

          this.opened += 2
          this.opened_cells = []

          setTimeout(() => {

            if (this.opened === this.data.length) {
              alert('End of the game')
              this.init()
            }

          }, 1000)


        } else {

          setTimeout(() => {
            var tile1 = document.getElementById(this.opened_cells[0].id)
            tile1.style.backgroundColor = '#123C69'
            tile1.innerHTML = ''

            var tile2 = document.getElementById(this.opened_cells[1].id)
            tile2.style.backgroundColor = '#123C69'
            tile2.innerHTML = ''

            this.opened_cells = []
          }, 1000)

        }
      }
    }
  }

  init_const() {

    this.num_rows = 4
    this.data = ['android', 'android', 'apple', 'apple', 'cpp', 'cpp', 'css', 'css', 'html', 'html', 'java', 'java', 'js', 'js', 'python', 'python', 'swift', 'swift', 'windows', 'windows']
  }

  init() {

    this.opened = 0

    this.data = shuffle(this.data)

    this.cells = []

    for (var j = 0; j < this.data.length; j++) {
      this.cells.push(new Cell(j, this.data[j]))
    }

    this.opened_cells = []

    var divs = ''
    var i = 0
    for (var r = 0; r < this.num_rows; r++) {
      divs += '<div class="row">'
      for (var c = 0; c < (this.data.length / this.num_rows); c++) {
        divs += '<div class="cell" id="' + i + '" onclick="game.flip(this)"></div>'
        i++
      }
      divs += '</div>'
    }
    document.getElementById('main').innerHTML = divs
  }


}


game = new Game()

// var last_event;
//
// function clicked(event) {
//   last_event = event
//   alert('efjvj')
// }

// for (var cell: document.getElementsByClassName("cell")
// )
// {
//   addEventListener('click', clicked)
// }