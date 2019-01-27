var canvas = document.getElementById ('tetriscanvas');
var ctx = canvas.getContext ('2d');
var width = canvas.width, height = canvas.height;
var blockWidth = width / columns, blockHeight = height / rows;
var canvas2 = document.getElementById ('tetriscanvas2');
var ctx2 = canvas2.getContext ('2d');


function drawBlock (x,y) {
  ctx.fillRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
  ctx.strokeRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
}

function drawBlock2(x,y) {
  ctx2.fillRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
  ctx2.strokeRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
}

function render() {
  ctx.clearRect( 0, 0, width, height );
  ctx.strokeStyle = 'black';
  for (var x=0; x<columns; x++) {
    for (var y = 0; y < rows; y++ ) {
      if (board[y][x]) {
        ctx.fillStyle = colors[board[y][x]-1];
        drawBlock (x,y);
      }
    }
  }
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';
  for (var y=0; y<4; y++) {
    for (var x=0; x<4; x++) {
      if (current[y][x]) {
        ctx.fillStyle = colors[current[y][x]-1];
        drawBlock (currentX+x,currentY+y);
      }
    }
  }
  ctx2.clearRect( 0, 0, width, height );
  ctx2.strokeStyle = 'black';
  for (var x=0; x<columns; x++) {
    for (var y = 0; y < rows; y++ ) {
      if (board2[y][x]) {
        ctx2.fillStyle = colors[board2[y][x]-1];
        drawBlock2 (x,y);
      }
    }
  }
  ctx2.fillStyle = 'red';
  ctx2.strokeStyle = 'black';
  for (var y=0; y<4; y++) {
    for (var x=0; x<4; x++) {
      if (current2[y][x]) {
        ctx2.fillStyle = colors[current2[y][x]-1];
        drawBlock2 (currentX2+x,currentY2+y);
      }
    }
  }
}

setInterval (render,50);