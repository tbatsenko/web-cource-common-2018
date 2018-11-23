class GameManager {
  constructor(game_container) {
    this.game_container = game_container
    this.height = game_container.offsetHeight
    this.width = game_container.offsetWidth

    this.objects = []

    this.cloudManager = new CloudManager()
    this.cloudManager.start_clouds_generating(this.height, this.width, this)

    this.addObject(new Hero(100, parseInt(this.height / 2)))
  }

  addObject(object) {
    this.game_container.appendChild(object.render())

    this.objects.push(object)
  }

  start() {
    setInterval(() => {
      // console.log(this.objects)
      for (let scene_object in this.objects) {
        this.objects[scene_object].render()
      }

      // console.log('game is running...')
    }, UPDATE_INTERVAL)
  }

}