import cardTemplate from "./card.hbs"
import $ from "jquery"
import { shuffle } from "./utils"

class Game {
  gameOver() {
    var modal = document.getElementById("game-modal")
    var restart = document.getElementsByClassName("game-over-window__close-button")[0]

    modal.style.display = "flex"
    restart.onclick = function() {
      location.reload()
    }
  }

  constructor(gameContainer) {
    //Additional functions
    const _this = this

    function wrong_cards() {
      document.getElementsByClassName("card__sides")[active_images[0]].style.transform = "rotateY(0deg)"
      document.getElementsByClassName("card__sides")[active_images[1]].style.transform = "rotateY(0deg)"
      active_images = []
      ++moves
      document.getElementById("moves").innerHTML = moves.toString()
      document.getElementById("field").style.pointerEvents = "auto"
    }

    function explosion() {
      var explosion_sound = document.getElementById("explosion-audio")
      explosion_sound.volume = 0.4
      explosion_sound.play()
      document.getElementsByClassName("overlay-explosion")[0].style.display = "block"
      setTimeout(() => (document.getElementsByClassName("overlay-explosion")[0].style.display = "none"), 2000)
      stop_timer = true
      setTimeout(_this.gameOver, 1800)
    }

    //Timer functions
    function startTimer() {
      var presentTime = document.getElementById("timer").innerHTML
      var timeArray = presentTime.split(/[:]+/)
      var m = +timeArray[0]
      var s = checkSecond(timeArray[1] - 1)
      if (s == 59) {
        m = m - 1
      }
      if (m < 0) {
        _this.gameOver()
        stop_timer = true
      }
      if (!stop_timer) {
        document.getElementById("timer").innerHTML = m + ":" + s
        setTimeout(startTimer, 1000)
      }
    }

    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) sec = "0" + sec
      if (sec < 0) sec = "59"
      return sec
    }
    //Generating field
    const photos = shuffle([
      "pear.svg",
      "pear.svg",

      "apple.svg",
      "apple.svg",

      "cherry.svg",
      "cherry.svg",

      "blueberries.svg",
      "blueberries.svg",

      "talon.svg",
    ])

    gameContainer.innerHTML = photos
      .map(photo => ({ photo: "img/" + photo }))
      .map(context => cardTemplate(context))
      .join("")

    $(gameContainer).on("click", ".card__sides", ({ currentTarget: cardEl }) => {
      cardEl.style.transform = cardEl.style.transform === "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)"
      cardEl = cardEl.parentNode
      active_images.push($(cardEl).index())

      if (active_images.find(imageIndex => photos[imageIndex] === "talon.svg")) {
        setTimeout(explosion, 700)
      }

      if (active_images.length === 2 && photos[active_images[0]] !== photos[active_images[1]]) {
        document.getElementById("field").style.pointerEvents = "none"
        setTimeout(wrong_cards, 800)
      } else if (active_images.length === 2 && photos[active_images[0]] === photos[active_images[1]]) {
        document.getElementsByClassName("card__sides")[active_images[0]].style.pointerEvents = "none"
        document.getElementsByClassName("card__sides")[active_images[1]].style.pointerEvents = "none"
        active_images = []
      }
    })

    //Game process
    var active_images = []
    var moves = 0
    var stop_timer = false

    startTimer()
  }
}

export default Game
