class Cube{
  constructor() {
    var white = "#ffffff";
    var yellow = "#ffff00";
    var green = "#00ff00";
    var blue = "#0000ff";
    var red = "#ff0000";
    var orange = "#ff8000";

    this.clockwise = true;

    this.up = [[white, white, white], [white, white, white], [white, white, white]];
    this.down = [[yellow, yellow, yellow], [yellow, yellow, yellow], [yellow, yellow, yellow]];
    this.front = [[green, green, green], [green, green, green], [green, green, green]];
    this.back = [[blue, blue, blue], [blue, blue, blue], [blue, blue, blue]];
    this.left = [[orange, orange, orange], [orange, orange, orange], [orange, orange, orange]];
    this.right = [[red, red, red], [red, red, red], [red, red, red]];

    this.update_view()
  }

  update_view(){
    this.sides_dict = {"up":this.up, "front": this.front, "right": this.right};
    for(const name of ["up", "front", "right"]){
      for(var i=0;i<9;i++) {
        document.getElementById(name+(i+1)).style.backgroundColor = this.sides_dict[name][Math.floor(i/3)][i%3];
      }
    }
  }

  static rotate_face(face){
    var face_corner_buf = face[0][0];
    face[0][0] = face[2][0];
    face[2][0] = face[2][2];
    face[2][2] = face[0][2];
    face[0][2] = face_corner_buf;
    var face_edge_buf = face[0][1];
    face[0][1] = face[1][0];
    face[1][0] = face[2][1];
    face[2][1] = face[1][2];
    face[1][2] = face_edge_buf;
  }

  U(){
    this.U_D(true);
  }

  U_(){
    this.U();this.U();this.U();
  }

  D(){
    this.U_D(false);
  }

  D_(){
    this.D();this.D();this.D();
  }

  U_D(is_u){
    var index = (is_u ? 0 : 2)
    var first_face = this.front
    var second_face = (is_u ? this.right : this.left)
    var third_face = this.back
    var fourth_face = (!is_u ? this.right : this.left)

    var buffer = first_face[index];
    first_face[index] = second_face[index];
    second_face[index] = third_face[index];
    third_face[index] = fourth_face[index];
    fourth_face[index] = buffer;

    Cube.rotate_face((is_u ? this.up : this.down));

    this.update_view();
  }

  R(){
    this.R_L(true);
  }

  R_(){
    this.R();this.R();this.R();
  }

  L(){
    this.R_L(false);
  }

  L_(){
    this.L();this.L();this.L();
  }

  R_L(is_r){
    var face_index = (is_r ? 2 : 0);
    var back_index = (is_r ? 0 : 2);
    var first_face = this.front;
    var second_face = (is_r ? this.down : this.up);
    var third_face = this.back;
    var fourth_face = (is_r ? this.up : this.down)

    var buffer = [0,1,2].map(function(i) {
      return new Array(3).fill(first_face[i][face_index]);
    })

    var faces = [first_face, second_face, third_face, fourth_face, buffer]

    for(var i=0;i<4;i++){
      var face_index_1 = (i != 2 ? face_index : back_index)
      var face_index_2 = (i != 1 ? face_index : back_index)
      faces[i][(i != 2 ? 0 : 2)][face_index_1] = faces[i+1][(i != 1 ? 0 : 2)][face_index_2];
      faces[i][(i != 2 ? 1 : 1)][face_index_1] = faces[i+1][(i != 2 ? 1 : 1)][face_index_2];
      faces[i][(i != 2 ? 2 : 0)][face_index_1] = faces[i+1][(i != 1 ? 2 : 0)][face_index_2];
    }

    Cube.rotate_face((is_r ? this.right : this.left));

    this.update_view()
  }

  F(){
    {
      var buffer = [this.up[2][0], this.up[2][1], this.up[2][2]];
      this.up[2][0] = this.left[2][2];
      this.up[2][1] = this.left[1][2];
      this.up[2][2] = this.left[0][2];
      this.left[2][2] = this.down[0][2];
      this.left[1][2] = this.down[0][1];
      this.left[0][2] = this.down[0][0];
      this.down[0][2] = this.right[0][0];
      this.down[0][1] = this.right[1][0];
      this.down[0][0] = this.right[2][0];
      this.right[0][0] = buffer[0];
      this.right[1][0] = buffer[1];
      this.right[2][0] = buffer[2];
    }

    Cube.rotate_face(this.front);

    this.update_view()
  }

  F_(){
    this.F();this.F();this.F();
  }

  B(){
    {
      var buffer = [this.up[0][0], this.up[0][1], this.up[0][2]];
      this.up[0][0] = this.right[0][2];
      this.up[0][1] = this.right[1][2];
      this.up[0][2] = this.right[2][2];
      this.right[0][2] = this.down[2][2];
      this.right[1][2] = this.down[2][1];
      this.right[2][2] = this.down[2][0];
      this.down[2][2] = this.left[2][0];
      this.down[2][1] = this.left[1][0];
      this.down[2][0] = this.left[0][0];
      this.left[2][0] = buffer[0];
      this.left[1][0] = buffer[1];
      this.left[0][0] = buffer[2];
    }

    Cube.rotate_face(this.back);

    this.update_view();
  }

  B_(){
    this.B();this.B();this.B();
  }

  E(){
    var buffer = this.front[1];
    this.front[1] = this.left[1];
    this.left[1] = this.back[1];
    this.back[1] = this.right[1];
    this.right[1] = buffer;

    this.update_view();
  }

  E_(){
    this.E();this.E();this.E();
  }

  M(){
    var buffer = [this.front[0][1], this.front[1][1], this.front[2][1]];
    this.front[0][1] = this.up[0][1];
    this.front[1][1] = this.up[1][1];
    this.front[2][1] = this.up[2][1];
    this.up[0][1] = this.back[2][1];
    this.up[1][1] = this.back[1][1];
    this.up[2][1] = this.back[0][1];
    this.back[2][1] = this.down[0][1];
    this.back[1][1] = this.down[1][1];
    this.back[0][1] = this.down[2][1];
    this.down[0][1] = buffer[0];
    this.down[1][1] = buffer[1];
    this.down[2][1] = buffer[2];

    this.update_view();
  }

  M_(){
    this.M();this.M();this.M();
  }

  S(){
    var buffer = [this.up[1][0], this.up[1][1], this.up[1][2]];
    this.up[1][0] = this.left[2][1];
    this.up[1][1] = this.left[1][1];
    this.up[1][2] = this.left[0][1];
    this.left[2][1] = this.down[1][2];
    this.left[1][1] = this.down[1][1];
    this.left[0][1] = this.down[1][0];
    this.down[1][2] = this.right[0][1];
    this.down[1][1] = this.right[1][1];
    this.down[1][0] = this.right[2][1];
    this.right[0][1] = buffer[0];
    this.right[1][1] = buffer[1];
    this.right[2][1] = buffer[2];

    this.update_view();
  }

  S_(){
    this.S();this.S();this.S();
  }

  X(){
    this.R();
    this.M_();
    this.L_();
  }

  X_(){
    this.R_();
    this.M();
    this.L();
  }

  Y(){
    this.U();
    this.D_();
    this.E_();
  }

  Y_(){
    this.U_();
    this.D();
    this.E();
  }

  Z(){
    this.F();
    this.S();
    this.B_();
  }

  Z_(){
    this.F_();
    this.S_();
    this.B();
  }

}

rubiks = new Cube();

function keyUp(event){
  if(event.keyCode == 16){
    rubiks.clockwise = !rubiks.clockwise;
    return;
  }

  if(event.code.length != 4){return}

  rubiks[event.code[3]+(!rubiks.clockwise ? '_' : '')]()

  rubiks.clockwise = true;
}

document.body.addEventListener('keyup', keyUp);
