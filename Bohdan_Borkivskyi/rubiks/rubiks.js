class Cube{
  constructor() {
    var white = "#ffffff";
    var yellow = "#ffff00";
    var green = "#00ff00";
    var blue = "#0000ff";
    var red = "#ff0000";
    var orange = "#ff8000";

    this.clockwise = true;

    this.top = [[white, white, white], [white, white, white], [white, white, white]];
    this.down = [[yellow, yellow, yellow], [yellow, yellow, yellow], [yellow, yellow, yellow]];
    this.front = [[green, green, green], [green, green, green], [green, green, green]];
    this.back = [[blue, blue, blue], [blue, blue, blue], [blue, blue, blue]];
    this.left = [[orange, orange, orange], [orange, orange, orange], [orange, orange, orange]];
    this.right = [[red, red, red], [red, red, red], [red, red, red]];

    this.update_view()
  }

  update_view(){
    this.sides_dict = {"top":this.top, "front": this.front, "right": this.right};
    for(const name of ["top", "front", "right"]){
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
    var buffer = this.front[0];
    this.front[0] = this.right[0];
    this.right[0] = this.back[0];
    this.back[0] = this.left[0];
    this.left[0] = buffer;

    Cube.rotate_face(this.top);

    this.update_view()
  }

  U_(){
    this.U();this.U();this.U();
  }

  D(){
    var buffer = this.front[2];
    this.front[2] = this.left[2];
    this.left[2] = this.back[2];
    this.back[2] = this.right[2];
    this.right[2] = buffer;

    Cube.rotate_face(this.down);

    this.update_view();
  }

  D_(){
    this.D();this.D();this.D();
  }

  R(){
    var buffer = [this.front[0][2], this.front[1][2], this.front[2][2]];
    this.front[0][2] = this.down[0][2];
    this.front[1][2] = this.down[1][2];
    this.front[2][2] = this.down[2][2];
    this.down[0][2] = this.back[2][0];
    this.down[1][2] = this.back[1][0];
    this.down[2][2] = this.back[0][0];
    this.back[2][0] = this.top[0][2];
    this.back[1][0] = this.top[1][2];
    this.back[0][0] = this.top[2][2];
    this.top[0][2] = buffer[0];
    this.top[1][2] = buffer[1];
    this.top[2][2] = buffer[2];

    Cube.rotate_face(this.right);

    this.update_view()
  }

  R_(){
    this.R();this.R();this.R();
  }

  L(){
    var buffer = [this.front[0][0], this.front[1][0], this.front[2][0]];
    this.front[0][0] = this.top[0][0];
    this.front[1][0] = this.top[1][0];
    this.front[2][0] = this.top[2][0];
    this.top[0][0] = this.back[2][2];
    this.top[1][0] = this.back[1][2];
    this.top[2][0] = this.back[0][2];
    this.back[2][2] = this.down[0][0];
    this.back[1][2] = this.down[1][0];
    this.back[0][2] = this.down[2][0];
    this.down[0][0] = buffer[0];
    this.down[1][0] = buffer[1];
    this.down[2][0] = buffer[2];

    Cube.rotate_face(this.left);

    this.update_view()
  }

  L_(){
    this.L();this.L();this.L();
  }

  F(){
    {
      var buffer = [this.top[2][0], this.top[2][1], this.top[2][2]];
      this.top[2][0] = this.left[2][2];
      this.top[2][1] = this.left[1][2];
      this.top[2][2] = this.left[0][2];
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
      var buffer = [this.top[0][0], this.top[0][1], this.top[0][2]];
      this.top[0][0] = this.right[0][2];
      this.top[0][1] = this.right[1][2];
      this.top[0][2] = this.right[2][2];
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
    this.front[0][1] = this.top[0][1];
    this.front[1][1] = this.top[1][1];
    this.front[2][1] = this.top[2][1];
    this.top[0][1] = this.back[2][1];
    this.top[1][1] = this.back[1][1];
    this.top[2][1] = this.back[0][1];
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
    var buffer = [this.top[1][0], this.top[1][1], this.top[1][2]];
    this.top[1][0] = this.left[2][1];
    this.top[1][1] = this.left[1][1];
    this.top[1][2] = this.left[0][1];
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
