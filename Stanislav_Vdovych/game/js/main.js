var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 20;
var jumpHeight = canvas.height-ballRadius*2-60;
var treeWidth = 10;
var smallTreeHeight = 25;
var bigTreeHeight = 40;
var x = ballRadius*2;
var y = canvas.height-ballRadius;
var dx = -8;
var dy = -6;
var inJump = false;
var score = 0;
var lives = 3;
var time = 0;

var trees = [];

document.addEventListener("keydown",keyDownHandler,false);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function keyDownHandler(e) {
  if(e.key == "Up" || e.key == "ArrowUp"|| e.key == "Space") {
    inJump = true;
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawTrees() {
  for(var i=0;i<trees.length;i++) {
    ctx.beginPath();
    ctx.rect(trees[i].x, trees[i].y, treeWidth, trees[i].typ == 's'?smallTreeHeight:bigTreeHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}

function collisionDetection() {
  for(var i=0;i<trees.length;i++) {
    if(x>trees[i].x-ballRadius && x<trees[i].x+treeWidth+ballRadius && y>canvas.height-(trees[i].typ=='s'?smallTreeHeight:bigTreeHeight)-ballRadius){
      alert("LALKA!");
      document.location.reload();
    }
  }
}


function draw() {
  // if(jumpPressed && !inJump){
  //   inJump = true;
  // }
  if(inJump){
    y += dy;
    if(y <= jumpHeight){
      dy = -dy;
    }
    if(y>=canvas.height-ballRadius) {
      y = canvas.height-ballRadius;
      dy = -dy;
      inJump = false;
    }
    if(y<jumpHeight) {
      y = jumpHeight;
    }
  }

  for(var i=trees.length-1;i>=0;--i) {
    trees[i].x +=dx;
    if(trees[i].x<0){
      trees.splice(i,1);
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(time%40 == 0){
    if(getRandomInt(100)>=40){
      if(getRandomInt(100)>=30) {
        trees.push({ x: canvas.width - treeWidth, y: canvas.height-smallTreeHeight, typ:"s"});
      }
      else {
        trees.push({ x: canvas.width - treeWidth, y: canvas.height-bigTreeHeight, typ:"b"});
      }
    }
  }
  drawBall();
  drawTrees();
  drawScore();
  collisionDetection();
  score++;
  time++;
  requestAnimationFrame(draw);
}

draw();
