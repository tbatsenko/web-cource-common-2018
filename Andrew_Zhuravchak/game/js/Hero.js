class Hero extends GameObject {
  constructor(position_x, position_y) {
    super(position_x, position_y)
    this.z_index = 100
    this.image = PLANE_IMG

    this.keysmap = {}

    console.log('Created keysmap')
    console.log(this.keysmap)

    setTimeout(() => {
    }, 1000)

    this.startListeningMoves()
  }

  startListeningMoves() {
    let offsetUp = 5
    let offsetDown = 5

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'w': {
          this.y -= offsetUp
          offsetUp *= 1.05
          offsetDown = 5
          return
        }
        case 's': {
          this.y += Math.max(offsetDown, 10)
          offsetDown *= 1.05
          offsetUp = 5
          return
        }
      }
    })
  }

  render() {
    let hero

    if (this.htmlObject === undefined) {
      hero = document.createElement('div')

      hero.className = 'gameobject'
      hero.id = `hero-${this.id}`
      hero.style.top = `${this.y}px`
      hero.style.left = `${this.x}px`
      hero.style.zIndex = `${this.z_index}`
      hero.style.backgroundImage = `url("${this.image}")`

      this.htmlObject = hero

    } else {
      hero = document.getElementById(`hero-${this.id}`)
      hero.style.top = `${this.y}px`
      hero.style.left = `${this.x}px`
    }

    return hero
  }
}