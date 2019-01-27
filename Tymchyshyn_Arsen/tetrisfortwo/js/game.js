let columns = 10, rows = 20; //board size
let board = []; //game board
let board2 = [];
var lose; //end statement of the game
var lines = 0; //lines cleared
var count = 0; //current score
var maxCount = 0; //record score
var interval; //Скорость игры в мс
var current; //first figure
var currentX, currentY; //position of first figure
var current2; // second figure
var currentX2, currentY2; // position of second figure
var shapes = [ //figures
  [1,1,1,1], //I
  [1,1,1,0, //L
    1],
  [1,1,1,0, //J
    0,0,1],
  [1,1,0,0, //O
    1,1],
  [1,1,0,0, //Z
    0,1,1],
  [0,1,1,0, //S
    1,1],
  [0,1,0,0, //T
    1,1,1 ]
];
var colors = [
  'cyan', 'orange', 'blue', 'yellow', 'red', 'lime', 'purple'
];
var shaped = 0;
var shaped2 = 0;
var savedShape; //next figure 1
var savedShape2; //next figure 2

function drawNewShape (current) {
  var canvas = document.getElementById ('figurecanvas');
  var ctx = canvas.getContext ('2d');
  var width = canvas.width, height = canvas.height;
  var blockWidth = width / 4, blockHeight = height / 4;
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';
  ctx.clearRect (0,0,width,height);
  for (var y=0; y<4; y++) {
    for (var x=0; x<4; x++) {
      if (current[y][x]) {
        ctx.fillStyle = colors[current[y][x]-1];
        ctx.fillRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
        ctx.strokeRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
      }
    }
  }
}

function drawNewShape2(current2) {
  var canvas2 = document.getElementById('figurecanvas2');
  var ctx2 = canvas2.getContext('2d');
  var width2 = canvas2.width, height2 = canvas2.height;
  var blockWidth2 = width2 / 4, blockHeight2 = height2 / 4;
  ctx2.fillStyle = 'red';
  ctx2.strokeStyle = 'black';
  ctx2.clearRect (0,0,width2,height2);
  for (var y=0; y<4; y++) {
    for (var x=0; x<4; x++) {
      if (current2[y][x]) {
        ctx2.fillStyle = colors[current2[y][x]-1];
        ctx2.fillRect (blockWidth2*x, blockHeight2*y, blockWidth2-1, blockHeight2-1);
        ctx2.strokeRect (blockWidth2*x, blockHeight2*y, blockWidth2-1, blockHeight2-1);
      }
    }
  }
}

function generateShape () {
  var id = Math.floor (Math.random()*shapes.length);
  var shape = shapes[id];
  var current = [];
  for (var y=0; y<4; y++) {
    current[y] = [];
    for (var x=0; x<4; x++) {
      var i = 4*y+x;
      if (typeof(shape[i])!='undefined' && shape[i]) current[y][x] = id+1;
      else current[y][x]=0;
    }
  }
  if (shaped) drawNewShape(current);
  return current;
}

function generateShape2(){
  var id2 = Math.floor (Math.random()*shapes.length);
  var shape2 = shapes[id2];
  var current2 = [];
  for (var y=0; y<4; y++) {
    current2[y] = [];
    for (var x=0; x<4; x++) {
      var i = 4*y+x;
      if (typeof(shape2[i])!='undefined' && shape2[i]) current2[y][x] = id2+1;
      else current2[y][x]=0;
    }
  }
  if(shaped2) drawNewShape2(current2);
  return current2;
}

function newShape() {
  if (shaped) {
    for (var i=0; i<savedShape.length; i++) current[i] = savedShape[i];
  }
  else {
    current = generateShape();
    shaped = 1;
  }
  savedShape = generateShape();
  currentX = Math.floor((columns-4)/2)-1; currentY = 0;
}

function newShape2(){
  if(shaped2){
    for (var i=0; i<savedShape2.length; i++) current2[i] = savedShape2[i];
  }
  else{
    current2 = generateShape2();
    shaped2 = 1;
  }
  savedShape2 = generateShape2();
  currentX2 = Math.floor((columns-4)/2)-1; currentY2 = 0;
}

function init() { //Clear all game field
  for (var y=0; y<rows; ++y) {
    board[y] = [];
    board2[y] = [];
    for (var x=0; x<columns; x++) {
      board[y][x] = 0;
      board2[y][x] = 0;
    }
  }
}

function countPlus (lines0) { //point counter
  lines += lines0;
  var bonus = [0, 100, 300, 700, 1500];
  count += bonus[lines0];
  if (count > maxCount) maxCount = count;
  document.getElementById('tetriscount').innerHTML =
    "Lines: "+lines+"<br>Count: "+count+"<br>Record: "+maxCount;
}

function countPlus2 (lines0) { //point counter
  lines += lines0;
  var bonus = [0, 100, 300, 700, 1500];
  count += bonus[lines0];
  if (count > maxCount) maxCount = count;
  document.getElementById('tetriscount2').innerHTML =
    "Lines: "+lines+"<br>Count: "+count+"<br>Record: "+maxCount;
}

function freeze() { //stop figure2 and write in position into board
  for (var y=0; y<4; y++) {
    for (var x=0; x<4; x++) {
      if (current[y][x]) board[y+currentY][x+currentX] = current[y][x];
    }
  }
}

function freeze2() { //stop figure2 and write in position into board
  for (var y=0; y<4; y++) {
    for (var x=0; x<4; x++) {
      if (current2[y][x]) board2[y+currentY2][x+currentX2] = current2[y][x];
    }
  }
}

function rotate( current ) {
  var newCurrent = [];
  for (var y=0; y<4; y++) {
    newCurrent[y] = [];
    for (var x=0; x<4; x++) newCurrent[y][x]=current[3-x][y];
  }
  return newCurrent;
}

function clearLines() {
  var cleared = 0;
  for (var y=rows-1; y>-1; y--) {
    var rowFilled = true;
    for (var x=0; x<columns; x++) {
      if (board[y][x]===0) {
        rowFilled = false;
        break;
      }
    }
    if (rowFilled) { //clear line
      cleared++;
      document.getElementById ('clearsound').play();
      for (var yy=y; yy>0; yy--) {
        for (var xx=0; xx<columns; xx++) {
          board[yy][xx]=board[yy-1][xx];
        }
      }
      y++;
    }
  }
  return cleared;
}

function clearLines2() {
  var cleared2 = 0;
  for (var y=rows-1; y>-1; y--) {
    var rowFilled = true;
    for (var x=0; x<columns; x++) {
      if (board2[y][x]===0) {
        rowFilled = false;
        break;
      }
    }
    if (rowFilled) { //clear line
      cleared2++;
      document.getElementById ('clearsound2').play();
      for (var yy=y; yy>0; yy--) {
        for (var xx=0; xx<columns; xx++) {
          board2[yy][xx]=board2[yy-1][xx];
        }
      }
      y++;
    }
  }
  return cleared2;
}

function keyPress( key ) { //key listener
  switch ( key ) {
    case 'escape':
      window.alert ('paused');
      break;
    case 'left1':
      if (valid(-1)) currentX--;
      break;
    case 'left2':
      if (valid2(-1)) currentX2--;
      break;
    case 'right1':
      if (valid(1)) currentX++;
      break;
    case 'right2':
      if (valid2(1)) currentX2++;
      break;
    case 'down1':
      if (valid(0,1)) currentY++;
      break;
    case 'down2':
      if (valid2(0,1)) currentY2++;
      break;
    case 'rotate1':
      var rotated = rotate(current);
      if (valid(0,0,rotated)) current = rotated;
      break;
    case 'rotate2':
      var rotated2 = rotate(current2);
      if (valid2(0,0,rotated2)) current2 = rotated2;
      break;
  }
}

function valid (offsetX,offsetY,newCurrent) { //checking if position is valid
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;
  for (var y=0; y<4; y++) {
    for (var x=0; x<4; x++) {
      if (newCurrent[y][x]) {
        if (typeof(board[y+offsetY])=='undefined' || typeof(board[y+offsetY][x+offsetX])=='undefined' || board[y+offsetY][x+offsetX] || x+offsetX<0 || y+offsetY>=rows || x+offsetX>=columns
        ) {
          if (offsetY===1) lose=true; //end of game if figure is on top of the board
          return false;
        }
      }
    }
  }
  return true;
}

function valid2 (offsetX,offsetY,newCurrent) { //checking if position is valid
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX2 + offsetX;
  offsetY = currentY2 + offsetY;
  newCurrent = newCurrent || current2;
  for (var y=0; y<4; y++) {
    for (var x=0; x<4; x++) {
      if (newCurrent[y][x]) {
        if (typeof(board2[y+offsetY])=='undefined' || typeof(board2[y+offsetY][x+offsetX])=='undefined' || board2[y+offsetY][x+offsetX] || x+offsetX<0 || y+offsetY>=rows || x+offsetX>=columns
        ) {
          if (offsetY===1) lose=true; //end of game if figure is on top of the board
          return false;
        }
      }
    }
  }
  return true;
}

function playGame() {
  if (valid(0,1)) currentY++; // Control of 1 figure droping
  else {
    freeze();
    var cleared = clearLines(); // clearing lines
    if (cleared) countPlus(cleared);
    if (lose) {
      window.alert('Player 2 win');
      newGame(); //starting new game
      return false;
    }
    newShape(); // generating new figure
  }
  if(valid2(0,1)) currentY2++;
  else{
    freeze2();
    var cleared2 = clearLines2(); // clearing lines
    if (cleared2) countPlus2(cleared2);
    if (lose) {
      window.alert('Player 1 win');
      newGame(); //starting new game
      return false;
    }
    newShape2(); // generating new figure
  }
}

function newGame() { //new game starting
  clearInterval (interval);
  init ();
  shaped = 0; shaped2 = 0; newShape (); newShape2();
  lose = false; lines = 0; count = 0; countPlus (0); countPlus2(0);
  interval = setInterval (playGame,300); //speed of game in ms
}

newGame();