var pong1;
var pong2;
var ball;
var myScore;
var myScore1;
var point1 = 0;
var point2 = 0;

function startGame() {
  myGameArea.start();

  pong1 = new component(8, 60, "yellow", 20, 150);
  pong2 = new component(8, 60, "lime", 670, 150);
  ball = new component(7, 7, "orange", 350, 170);
  myScore = new component("16px", "consolas", "yellow", 200, 25, "text");
  myScore1 = new component("16px", "consolas", "lime", 410, 25, "text");
}

var myGameArea = {
  canvas : document.createElement('canvas'),
  start: function() {
    this.canvas.width = 700;
    this.canvas.height = 390;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 30);

    window.addEventListener('keydown', function(e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    })

    window.addEventListener('keyup', function(e) {
      myGameArea.keys[e.keyCode] = false;
    })
  },

  clear: function() {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
  },

  stop: function() {
    clearInterval(this.interval);
  }
}

//constructor function
function component(width, height, color, x, y, type) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.type = type;
  this.speedX = 0;
  this.speedY = 0;

  this.update = function() {
    ctx = myGameArea.context;
    if(this.type == 'text'){
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x,  this.y);
    }else {
      ctx.fillStyle = color
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);

    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);

    var crash = true;

    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
      var crash = false;
    }

    return crash;
  }
}

//update game function
function updateGameArea() {

  ////////////////ball moving////////////////
  ball.newPos()
  if (ball.crashWith(pong1)){
    ball.speedY = 0;
    ball.speedX = 13;
  }
  else if (ball.crashWith(pong2)){
    ball.speedY = 0;
    ball.speedX = -8;
  }else {
    ball.x += -4;
  }

  if (ball.y <= 0){
    ball.speedY = 40;
  }
  if (ball.y >= 390){
    ball.speedY = -4;
  }
  if (ball.x <= 2){
    ball.x = 690;
    point2 += 1;
  }
  if (ball.x >= 700){
    ball.x = 0;
    point1 += 1;
  }


  ///////////////pong control/////////////////
  const topLimit = 350;
  const downLimit = 0;

  if(pong1.y <= downLimit){
    pong1.y = downLimit;
  }
  if (pong1.y >= topLimit){
    pong1.y = topLimit
  }

  if(pong2.y <= downLimit){
    pong2.y = downLimit;
  }
  if (pong2.y >= topLimit){
    pong2.y = topLimit
  }

  ///////////////keyboard control////////////////
  if(myGameArea.keys && myGameArea.keys[38]){
    pong1.y -= 10;
    if (ball.crashWith(pong1)){
      ball.speedY = -4;
      ball.speedX = 14;
    }
  }

  if(myGameArea.keys && myGameArea.keys[40]){
    pong1.y += 10;
    if (ball.crashWith(pong1)){
      ball.speedY = 4;
      ball.speedX = 14;
    }
  }

  if(myGameArea.keys && myGameArea.keys[37]){
    pong2.y -= 10;
    if (ball.crashWith(pong2)){
      ball.speedY = -2;
      ball.speedX = -4;
    }
  }

  if(myGameArea.keys && myGameArea.keys[39]){
    pong2.y += 10;
    if (ball.crashWith(pong2)){
      ball.speedY = 4;
      ball.speedX = -8;
    }
  }

  myGameArea.clear()

  pong1.update();
  pong2.update();
  ball.update();

  myScore.text = "Score: " + point1;
  myScore1.text = "Score: " + point2;

  myScore.update();
  myScore1.update();
}