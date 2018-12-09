class Cloud extends GameObject {
  constructor(position_x, position_y) {
    super(position_x, position_y)

    const cloud = CLOUD_IMAGES[parseInt(Math.random() * 2)]
    this.image = cloud["src"]
    this.width = cloud["width"]
    this.height = cloud["height"]
  }

  render(context) {
    let cloud_image = new Image()

    cloud_image.src = this.image
    context.drawImage(cloud_image, this.x, this.y, this.width, this.height)
  }
}

function generate_cloud(window_height, window_width, game_manager, cloud_manager)  {
  const cloud = new Cloud(window_width, parseInt(Math.random() * window_height))

  cloud_manager.clouds.push(cloud)
  game_manager.addObject(cloud)

  cloud_manager.cloud_generation_speed = Math.max(cloud_manager.cloud_generation_speed * 0.99, 100)
  setTimeout(generate_cloud, cloud_manager.cloud_generation_speed, window_height, window_width, game_manager, cloud_manager)
}

class CloudManager {
  constructor() {
    this.clouds = []
    this.cloud_generation_speed = UPDATE_INTERVAL * 200
    this.dx = 0.8

    setInterval(() => {
      for (let cloud_id in this.clouds) {
        this.clouds[cloud_id].x -= this.dx
        this.dx = Math.min( this.dx * 1.00005, 3)
      }
    }, 0.2)
  }


  start_clouds_generating(window_height, window_width, game_manager) {
    setTimeout(generate_cloud, this.cloud_generation_speed, window_height, window_width, game_manager, this)
  }
}