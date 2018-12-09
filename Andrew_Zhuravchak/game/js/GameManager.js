import { CloudManager } from "./Cloud"
import { Hero } from "./Hero"
import { UPDATE_INTERVAL } from './env'

export class GameManager {
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
      let clouds = this.objects.slice(1)
      // check for collisions
      for (let i = 0; i < clouds.length; i++) {
        let cloud = clouds[i]
        if ((this.hero.y <= cloud.y - 25 + cloud.height) && (cloud.y <= this.hero.y + this.hero.height - 25) &&
          (this.hero.x <= cloud.x + cloud.width - 20) && (cloud.x <= this.hero.x + this.hero.width - 20)) {
          alert('You looseeee!')
        }
      }

      this.context.clearRect(0, 0, this.width, this.height)

      for (let scene_object in this.objects)
        this.objects[scene_object].render(this.context)


    }, UPDATE_INTERVAL)
  }

}