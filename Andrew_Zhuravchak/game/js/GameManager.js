class GameManager {
  constructor(game_container) {
    this.height = game_container.offsetHeight
    this.width = game_container.offsetWidth
    this.context = game_container.getContext('2d')

    this.objects = []

    this.cloudManager = new CloudManager()
    this.cloudManager.start_clouds_generating(this.height, this.width, this)

    this.hero = new Hero(100, parseInt(this.height / 2), game_container)
    this.addObject(this.hero)
  }

  addObject(object) {
    this.objects.push(object)
  }

  start() {
    setInterval(() => {
      this.context.clearRect(0, 0, this.width, this.height);

      for (let scene_object in this.objects)
        this.objects[scene_object].render(this.context)


      let clouds = this.objects.slice(1)
      // check for collisions
      for(let i = 0; i < clouds.length; i++){
        let cloud = clouds[i]
        if( (this.hero.y <= cloud.y + cloud.height) && (cloud.y <= this.hero.y + this.hero.height) &&
          (this.hero.x <= cloud.x + cloud.width) && (cloud.x <= this.hero.x + this.hero.width) ){
          alert("You looseeee!")
        }

      }

    }, UPDATE_INTERVAL)
  }

}