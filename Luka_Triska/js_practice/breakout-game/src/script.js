let canvas = document.getElementsByClassName("container__canvas")[0];
canvas.width = 810;
canvas.height = 540;

let ballRadius = 18;

let ctx = canvas.getContext("2d");

// let myGif = GIF();
// myGif.load("GIFurl.gif");
//
// ctx.drawImage(myGif.image,0,0); // will draw the playing gif image

let x = Math.floor(Math.random() * (canvas.width - 10));
let y = canvas.height - 2 * ballRadius - 10;
let dx = 1.2;
let dy = -1.2;

// booleans for checking whether a left or a right arrow button has been pressed
let rightPressed = false;
let leftPressed = false;
let score = 0;

// board variables
let boardHeight = 10;
let boardWidth = canvas.width / 10;
let boardX = (canvas.width - boardWidth) / 2;

// bricks variables
let brickWidth = 75;
let brickHeight = 20;
let brickColumnCount = Math.floor(canvas.width / brickWidth) * 0.75;
let brickRowCount = 2;
// let brickRowCount = Math.floor(canvas.height / brickHeight) * 0.2;
// let brickColumnCount = 5;
let brickPadding = 20;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// sound variables
let gameSound = new Audio();
let hitSound = new Audio();


gameSound.src = "sounds/gameSound.wav";
hitSound.src = "sounds/hitSound.wav";

// initialising bricks
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

const drawBricks = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                if (c % 2 === 1) {
                    if (r % 2 === 1) ctx.fillStyle = "green";
                    else ctx.fillStyle = "gold";
                } else {
                    if (r % 2 === 1) ctx.fillStyle = "purple";
                    else ctx.fillStyle = "orange";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
};

const collisionDetection = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x + ballRadius / 2 > b.x
                    && x - ballRadius / 2 < b.x + brickWidth
                    && y + ballRadius > b.y
                    && y - ballRadius < b.y + brickHeight) {
                    hitSound.play();
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("You won!");
                        document.location.reload();
                    }
                }
            }
        }
    }
};

const drawScore = () => {
    ctx.font = "20px Agency FB";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, canvas.width / 2 - 29, 23);
};

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#d35400";
    ctx.fill();
    ctx.closePath();
};

const drawBoard = () => {
    ctx.beginPath();
    ctx.rect(boardX, canvas.height - boardHeight, boardWidth, boardHeight);
    ctx.fillStyle = "#2c3e50";
    ctx.fill();
    ctx.closePath();
};

const draw = () => {
    gameSound.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawBoard();
    drawScore();
    collisionDetection();

    // makes sure the ball bounces off the top and the board of canvas
    if (y + dy < ballRadius) {
        hitSound.play();
        dy = -dy;
    } else if (y + ballRadius + boardHeight > canvas.height) {
        hitSound.play();
        if (x + ballRadius > boardX && x - ballRadius < boardX + boardWidth) {
            if (Math.abs(dy < 6)) dy = -dy * 1.2;
            else dy = -dy;

        } else {
            alert("Game Over\n" + "Score: " + score);
            document.location.reload();
        }
    }

    // makes sure the ball bounces off the left and right side of canvas
    if (x < ballRadius || x + ballRadius > canvas.width) {
        hitSound.play();
        dx = -dx;
    }

    // move board to the right
    if (rightPressed && boardX < canvas.width - boardWidth) boardX += boardWidth / 11;

    // move board to the left
    if (leftPressed && boardX > 0) boardX -= boardWidth / 11;


    x += dx * 2;
    y += dy * 2;
};

// listening for right / left arrow button presses
document.addEventListener("keydown", e => {
    if (e.keyCode === 39) rightPressed = true;
    else if (e.keyCode === 37) leftPressed = true;
});

document.addEventListener("keyup", e => {
    if (e.keyCode === 39) rightPressed = false;
    else if (e.keyCode === 37) leftPressed = false;
});

document.addEventListener("mousemove", e => {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) boardX = relativeX - boardWidth / 2;
});

setInterval(draw, 10);