class GameObject {
  constructor(position_x, position_y) {
    if (new.target === GameObject) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }

    this.x = position_x
    this.y = position_y
    this.id = ID++

    this.htmlObject = undefined
  }

  render(context){} // needs to be override
}