import cardTemplate from "./card.hbs"
import $ from "jquery"
import { shuffle } from "./utils"

class Game {
  gameOver() {
    const modal = document.getElementById("game-modal")
    const restart = document.getElementsByClassName("game-over-window__close-button")[0]

    modal.style.display = "flex"
    restart.onclick = function() {
      location.reload()
    }
  }

  constructor() {

    let board = document.createElement(`section`)
    board.className = "game-block"
    board.innerHTML = `<section class="game-block">
    <section class="round-info shadow">
        <h3 class="round-info__title3">TIME:</h3>
        <time id="timer" class="round-info__num-text">1:00</time>
    </section>

    <section id="field" class="field shadow"></section>

    <section class="round-info shadow">
        <h3 class="round-info__title3">MOVES:</h3>
        <span id="moves" class="round-info__num-text">0</span>
    </section>
    </section>`

    let timer = board.querySelector("#timer")
    let field = board.querySelector("#field")
    let move = board.querySelector("#moves")


    document.body.appendChild(board)

    //Additional functions
    const _this = this

    function wrong_cards() {
      field.getElementsByClassName("card__sides")[active_images[0]].style.transform = "rotateY(0deg)"
      field.getElementsByClassName("card__sides")[active_images[1]].style.transform = "rotateY(0deg)"
      active_images = []
      ++moves
      move.innerHTML = moves.toString()
      field.style.pointerEvents = "auto"
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
      var presentTime = timer.innerHTML;
      var timeArray = presentTime.split(/[:]+/);
      var m = +timeArray[0];
      var s = checkSecond((timeArray[1] - 1));
      if(s==59){
        m=m-1;
      }
      if(m<0){
        game_over();
        stop_timer=true;
      }
      if(!stop_timer){
        timer.innerHTML =
          m + ":" + s;
        setTimeout(startTimer, 1000);
      }
    }

    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) {sec = "0" + sec}
      if (sec < 0) {sec = "59"}
      return sec;
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

    field.innerHTML = photos
      .map(photo => ({ photo: "img/" + photo }))
      .map(context => cardTemplate(context))
      .join("")

    $(field).on("click", ".card__sides", ({ currentTarget: cardEl }) => {
      cardEl.style.transform = cardEl.style.transform === "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)"
      cardEl = cardEl.parentNode
      active_images.push($(cardEl).index())

      if (active_images.find(imageIndex => photos[imageIndex] === "talon.svg")) {
        setTimeout(explosion, 700)
      }

      if (active_images.length === 2 && photos[active_images[0]] !== photos[active_images[1]]) {
        field.style.pointerEvents = "none"
        setTimeout(wrong_cards, 800)
      } else if (active_images.length === 2 && photos[active_images[0]] === photos[active_images[1]]) {
        field.getElementsByClassName("card__sides")[active_images[0]].style.pointerEvents = "none"
        field.getElementsByClassName("card__sides")[active_images[1]].style.pointerEvents = "none"
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
