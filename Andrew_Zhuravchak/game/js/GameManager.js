class GameManager {
  constructor(game_container) {
    this.game_container = game_container
    this.height = game_container.offsetHeight
    this.width = game_container.offsetWidth

    this.objects = []

    this.cloudManager = new CloudManager()
    this.cloudManager.start_clouds_generating(this.height, this.width, this)

    this.hero = new Hero(100, parseInt(this.height / 2))
    this.addObject(this.hero)
  }

  addObject(object) {
    this.game_container.appendChild(object.render())

    this.objects.push(object)
  }

  start() {
    setInterval(() => {
      for (let scene_object in this.objects) {
        this.objects[scene_object].render()
      }


      let clouds = this.objects.slice(1)
      // check for collisions
      for(let i = 0; i < clouds.length; i++){
        let cloud = clouds[i]
        console.log("Checking: ", cloud.y >= this.hero.y, cloud.y <= (this.hero.y + 150), cloud.x >= 175, cloud.x <= 350)
        if (cloud.y >= this.hero.y && cloud.y <= (this.hero.y + 150) && cloud.x >= 175 && cloud.x <= 350){
          alert("You looseee....")
        }
      }

    }, UPDATE_INTERVAL)
  }

}