// set_background(id) {
//   document.getElementById(id).style.backgroundColor = this.background
// }

class Cell {
  constructor(id, value) {
    this.id = id
    this.value = value
    this.opened = false
  }
}


class Game {

  constructor() {
    this.opened = 0
    this.num_rows = 4
    this.data = ['Anton', 'Anton', 'Bohdan', 'Bohdan', 'Mark', 'Mark', 'Marian', 'Marian', 'Ivan', 'Ivan', 'VASYL2000', 'VASYL2000', 'IS7', 'IS7', 'BWT', 'BWT', '100', '100', 'XD', 'XD']
    this.cells = []

    for (var i = 0; i < this.data.length; i++) {
      this.cells.push(new Cell(i, this.data[i]))
    }

    this.opened_cells = []

    this.init()
  }

  flip(tile) {
    if (this.opened_cells.length < 2 && !this.cells[tile.id].opened) {

      tile.style.backgroundColor = '#ff0000'

      this.opened_cells.push(this.cells[tile.id])

      if (this.opened_cells.length === 2) {

        if (this.opened_cells[0].value === this.opened_cells[1].value) {

          this.opened += 2
          this.opened_cells = []

          if (this.opened === this.data.length) {
            alert('End of the game')
          }

        } else {

          setTimeout(()=> {
            document.getElementById(this.opened_cells[0].id).style.backgroundColor = '#123C69'
            document.getElementById(this.opened_cells[1].id).style.backgroundColor = '#123C69'
            this.opened_cells = []
          }, 1000)

        }
      }
    }
  }

  init() {
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