class Cloud extends GameObject {
  constructor(position_x, position_y) {
    super(position_x, position_y)

    this.z_index = 1
    this.image = CLOUD_IMAGES[parseInt(Math.random() * 2)]
  }

  render() {
    let cloud

    if (this.htmlObject === undefined) {
      cloud = document.createElement('div')

      cloud.className = 'gameobject'
      cloud.id = `cloud-${this.id}`
      cloud.style.top = `${this.y}px`
      cloud.style.left= `${this.x}px`
      cloud.style.zIndex= `${this.z_index}`
      cloud.style.backgroundImage= `url("${this.image}")`

      this.htmlObject = cloud

    } else {
      cloud = document.getElementById(`cloud-${this.id}`)
      cloud.style.top = `${this.y}px`
      cloud.style.left= `${this.x}px`
    }

    return cloud
  }
}

class CloudManager {
  constructor() {
    this.clouds = []

    setInterval(() => {
      for (let cloud_id in this.clouds){
        this.clouds[cloud_id].x -= 1
      }

    }, 0.2)
  }

  start_clouds_generating(window_height, window_width, game_manager) {
    setInterval(() => {
      const position_x = window_width
      const position_y = parseInt(Math.random() * window_height)

      let cloud = new Cloud(position_x, position_y)

      // console.log(cloud, position_x, position_y)
      this.clouds.push(cloud)

      game_manager.addObject(cloud)
    }, UPDATE_INTERVAL * 25)
  }
}