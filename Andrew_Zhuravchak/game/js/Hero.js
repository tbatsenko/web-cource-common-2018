class Hero extends GameObject {
  constructor(position_x, position_y) {
    super(position_x, position_y)
    this.z_index = 100
    this.image = PLANE_IMG

    this.keysmap = {}

    console.log("Created keysmap")
    console.log(this.keysmap)

    setTimeout(() => {}, 1000)

    this.startListening()
  }

  startListening(){
    document.addEventListener('keydown', this.onkeydown)
    document.addEventListener('onkeyup', this.onkeydown)
  }

  onkeydown(e) {
    console.log(e)
    console.log(this.keysmap)
    const offset = 5

    this.keysmap[e.key] = (e.type === 'keydown');

    for (let key in this.keysmap) {

      if (! this.keysmap.hasOwnProperty(key) || this.keysmap[key] === false)
        continue

      switch (key) {
        case 'w': {
          this.y -= offset; return
        }
        case 's': {
          this.y += offset; return
        }
        case 'd' : {
          this.x+= offset; return
        }
        case 'a': {
          this.x -= offset; return
        }
      }

    }
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