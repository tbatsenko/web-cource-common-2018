class Hero extends GameObject {
  constructor(position_x, position_y) {
    super(position_x, position_y)

    this.image = PLANE_IMG
    this.height = 80
    this.width = 150


    let offsetUp = 4, offsetDown = 4
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'w': {
          this.y -= Math.min(offsetUp, 10)
          offsetUp *= 1.1
          offsetDown = 5
          return
        }
        case 's': {
          this.y += Math.min(offsetDown, 10)
          offsetDown *= 1.1
          offsetUp = 5
          return
        }
      }
    })
  }

  render(context) {
    let plane_image = new Image()

    plane_image.src = this.image
    context.drawImage(plane_image, this.x, this.y, this.width, this.height)
  }
}