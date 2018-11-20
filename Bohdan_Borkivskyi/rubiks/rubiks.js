class Cube {
  constructor() {
    this.init_layout()
    this.update_view()
  }

  init_layout() {
    var white = '#ffffff'
    var yellow = '#ffff00'
    var green = '#00ff00'
    var blue = '#0000ff'
    var red = '#ff0000'
    var orange = '#ff8000'

    this.up = [[white, white, white], [white, white, white], [white, white, white]]
    this.down = [[yellow, yellow, yellow], [yellow, yellow, yellow], [yellow, yellow, yellow]]
    this.front = [[green, green, green], [green, green, green], [green, green, green]]
    this.back = [[blue, blue, blue], [blue, blue, blue], [blue, blue, blue]]
    this.left = [[orange, orange, orange], [orange, orange, orange], [orange, orange, orange]]
    this.right = [[red, red, red], [red, red, red], [red, red, red]]
  }

  update_view() {
    this.sides_dict = { 'up': this.up, 'front': this.front, 'right': this.right }
    for (const name of ['up', 'front', 'right']) {
      for (var i = 0; i < 9; i++) {
        document.getElementById(name + (i + 1)).style.backgroundColor = this.sides_dict[name][Math.floor(i / 3)][i % 3]
      }
    }
  }

  static rotate_face(face) {
    var face_corner_buf = face[0][0]
    face[0][0] = face[2][0]
    face[2][0] = face[2][2]
    face[2][2] = face[0][2]
    face[0][2] = face_corner_buf
    var face_edge_buf = face[0][1]
    face[0][1] = face[1][0]
    face[1][0] = face[2][1]
    face[2][1] = face[1][2]
    face[1][2] = face_edge_buf
  }

  U() {
    return this.U_D(true)
  }

  U_() {
    return this.U().U().U()
  }

  D() {
    return this.U_D(false)
  }

  D_() {
    return this.D().D().D()
  }

  U_D(is_u) {
    var index = (is_u ? 0 : 2)
    var first_face = this.front
    var second_face = (is_u ? this.right : this.left)
    var third_face = this.back
    var fourth_face = (!is_u ? this.right : this.left)

    var buffer = first_face[index]
    first_face[index] = second_face[index]
    second_face[index] = third_face[index]
    third_face[index] = fourth_face[index]
    fourth_face[index] = buffer

    Cube.rotate_face((is_u ? this.up : this.down))

    this.update_view()
    return this
  }

  R() {
    return this.R_L(true)
  }

  R_() {
    return this.R().R().R()
  }

  L() {
    return this.R_L(false)
  }

  L_() {
    return this.L().L().L()
  }

  R_L(is_r) {
    var face_index = (is_r ? 2 : 0)
    var back_index = (is_r ? 0 : 2)
    var first_face = this.front
    var second_face = (is_r ? this.down : this.up)
    var third_face = this.back
    var fourth_face = (is_r ? this.up : this.down)

    var buffer = [0, 1, 2].map(function(i) {
      return new Array(3).fill(first_face[i][face_index])
    })

    var faces = [first_face, second_face, third_face, fourth_face, buffer]

    for (var i = 0; i < 4; i++) {
      var face_index_1 = (i != 2 ? face_index : back_index)
      var face_index_2 = (i != 1 ? face_index : back_index)
      faces[i][(i != 2 ? 0 : 2)][face_index_1] = faces[i + 1][(i != 1 ? 0 : 2)][face_index_2]
      faces[i][(i != 2 ? 1 : 1)][face_index_1] = faces[i + 1][(i != 2 ? 1 : 1)][face_index_2]
      faces[i][(i != 2 ? 2 : 0)][face_index_1] = faces[i + 1][(i != 1 ? 2 : 0)][face_index_2]
    }

    Cube.rotate_face((is_r ? this.right : this.left))

    this.update_view()
    return this
  }

  F() {
    return this.F_B(true)
  }

  F_() {
    return this.F().F().F()
  }

  B() {
    return this.F_B(false)
  }

  B_() {
    return this.B().B().B()
  }

  F_B(is_f) {
    var face_index = (is_f ? 2 : 0)
    var down_index = (is_f ? 0 : 2)

    var first_face = this.up
    var second_face = (is_f ? this.left : this.right)
    var third_face = this.down
    var fourth_face = (is_f ? this.right : this.left)

    var buffer = [first_face[face_index][0], first_face[face_index][1], first_face[face_index][2]]

    first_face[face_index][0] = second_face[face_index][2]
    first_face[face_index][1] = second_face[1][2]
    first_face[face_index][2] = second_face[down_index][2]
    second_face[face_index][2] = third_face[down_index][2]
    second_face[1][2] = third_face[down_index][1]
    second_face[down_index][2] = third_face[down_index][0]
    third_face[down_index][2] = fourth_face[down_index][0]
    third_face[down_index][1] = fourth_face[1][0]
    third_face[down_index][0] = fourth_face[face_index][0]
    fourth_face[down_index][0] = buffer[0]
    fourth_face[1][0] = buffer[1]
    fourth_face[face_index][0] = buffer[2]

    Cube.rotate_face((is_f ? this.front : this.back))

    this.update_view()
    return this
  }

  E() {
    var buffer = this.front[1]
    this.front[1] = this.left[1]
    this.left[1] = this.back[1]
    this.back[1] = this.right[1]
    this.right[1] = buffer

    this.update_view()
    return this
  }

  E_() {
    return this.E().E().E()
  }

  M() {
    var buffer = [this.front[0][1], this.front[1][1], this.front[2][1]]
    this.front[0][1] = this.up[0][1]
    this.front[1][1] = this.up[1][1]
    this.front[2][1] = this.up[2][1]
    this.up[0][1] = this.back[2][1]
    this.up[1][1] = this.back[1][1]
    this.up[2][1] = this.back[0][1]
    this.back[2][1] = this.down[0][1]
    this.back[1][1] = this.down[1][1]
    this.back[0][1] = this.down[2][1]
    this.down[0][1] = buffer[0]
    this.down[1][1] = buffer[1]
    this.down[2][1] = buffer[2]

    this.update_view()
    return this
  }

  M_() {
    return this.M().M().M()
  }

  S() {
    var buffer = [this.up[1][0], this.up[1][1], this.up[1][2]]
    this.up[1][0] = this.left[2][1]
    this.up[1][1] = this.left[1][1]
    this.up[1][2] = this.left[0][1]
    this.left[2][1] = this.down[1][2]
    this.left[1][1] = this.down[1][1]
    this.left[0][1] = this.down[1][0]
    this.down[1][2] = this.right[0][1]
    this.down[1][1] = this.right[1][1]
    this.down[1][0] = this.right[2][1]
    this.right[0][1] = buffer[0]
    this.right[1][1] = buffer[1]
    this.right[2][1] = buffer[2]

    this.update_view()
    return this
  }

  S_() {
    return this.S().S().S()
  }

  X() {
    return this.R().M_().L_()
  }

  X_() {
    return this.R_().M().L()
  }

  Y() {
    this.U().D_().E_()
  }

  Y_() {
    this.U_().D().E()
  }

  Z() {
    this.F().S().B_()
  }

  Z_() {
    this.F_().S_().B()
  }

  J() {
    return this.R().U().R_().F_().R().U().R_().U_().R_().F().R().R().U_().R_().U_()
  }

  J_() {
    return this.L_().U_().L().F().L_().U_().L().U().L().F_().L().L().U().L().U()
  }

  scramble(length = 20) {
    this.init_layout()
    this.scramble_text = ''

    var moves = ['U', 'U_', 'D', 'D_', 'R', 'R_', 'L', 'L_', 'F', 'F_', 'B', 'B_']
    var last_move = '-'
    var random_move = '-'

    for (var _ = 0; _ < length; ++_) {
      random_move = moves[Math.floor(Math.random() * moves.length)]
      while (random_move[0] == last_move[0]) {
        random_move = moves[Math.floor(Math.random() * moves.length)]
      }
      this.scramble_text += random_move + ' '
      this[random_move]()
      last_move = random_move
    }
    return this.scramble_text
  }

  is_solved() {
    var sides = [this.up, this.down, this.front, this.back, this.right]
    for (var j = 0; j < sides.length; ++j) {
      var colors = []
      for (var i = 0; i < 3; ++i) {
        for (var y = 0; y < 3; ++y) {
          if (i == 0 && y == 0) {
            colors = [sides[j][i][y]]
          } else if (!colors.includes(sides[j][i][y])) {
            return false
          }
        }
      }
    }
    return true
  }
}

class Game {
  constructor() {
    this.rubiks = new Cube()
    this.game = false
    this.clockwise = true
  }

  keyUp(event) {
    if (event.keyCode == 16) {
      this.clockwise = !this.clockwise
      return
    }

    if (event.code.length != 4) {
      return
    }

    try {
      this.rubiks[event.code[3] + (!this.clockwise ? '_' : '')]()
      if (this.game && this.rubiks.is_solved()) {
        this.game = false
        alert('you win')
      }
    } catch (e) {
      console.log('Move ' + event.code[3] + (!this.clockwise ? '_' : '') + ' is not implemented')
    }

    this.clockwise = true
  }

  start() {
    this.rubiks.scramble()
    this.game = true
  }
}

help_window = document.getElementById('help')
var my_game = new Game()

function help_clicked(event) {
  if (help_window.classList.contains('help--small')) {
    help_window.classList.remove('help--small')
    help_window.classList.add('help--big')
    help_window.innerHTML += '<p>Keys on keyboard corresponds to face rotations, slice turns and whole cube rotations, as showed <a href=\'https://ruwix.com/the-rubiks-cube/notation/\' title=\'rubiks cube notation\'>here</a></p><p>To do counterclockwise move press single Shift key before move</p>'
  } else {
    help_window.classList.remove('help--big')
    help_window.innerText = ''
    help_window.classList.add('help--small')
  }

}

document.body.addEventListener('keyup', function(e) {
  my_game.keyUp(e)
})
help_window.addEventListener('click', help_clicked)
