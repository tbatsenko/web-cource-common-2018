let gameCanvas = document.getElementsByClassName('game__canvas')[0];
gameCanvas.width = 320;
gameCanvas.height = 521;

let gameContext = gameCanvas.getContext("2d");

//load images
let bird = new Image();
let background = new Image();
let ground = new Image();
let pipeTop = new Image();
let pipeBottom = new Image();

bird.src = "images/bird.png";
background.src = "images/game_background.png";
ground.src = "images/ground.png";
pipeTop.src = "images/pipeTop.png";
pipeBottom.src = "images/pipeBottom.png";

//audio
let flySound = new Audio();
let scoreSound = new Audio();

flySound.src = "sounds/fly.mp3";
scoreSound.src = "sounds/score.mp3";

//game vars
let pipeGap = 85;
console.log("top-pipe height: ", pipeTop.height, "bottom-pipe height: ", pipeBottom.height);

let birdPositionX = 15;
let birdPositionY = 150;

let gravity = 1.8;
let score = 0;

let gameStopped = false;

const moveUp = () => {
    birdPositionY -= 30;
    flySound.play();
};

document.addEventListener("keypress", e => {
    if (e.keyCode === 38 && !gameStopped) moveUp();
});

let pipeCords = [];

pipeCords[0] = {
    x: gameCanvas.width,
    y: 0
};

const draw = () => {
    gameContext.drawImage(background, 0, 0);

    for (let i = 0; i < pipeCords.length; i++) {
        gameContext.drawImage(pipeTop, pipeCords[i].x, pipeCords[i].y);
        gameContext.drawImage(pipeBottom, pipeCords[i].x, pipeCords[i].y + pipeGap + pipeTop.height);

        pipeCords[i].x -= 1.5;

        if (pipeCords[i].x === 125) {
            let min = 0.45;
            let max = 1;
            let random = Math.random() * (+max - +min) + +min;
            pipeCords.push({
                x: gameCanvas.width,
                y: Math.floor(random * pipeBottom.height) - pipeBottom.height
            })
        }

        if (birdPositionX + bird.width >= pipeCords[i].x && birdPositionX <= pipeCords[i].x + pipeTop.width &&
            (birdPositionY <= pipeCords[i].y + pipeTop.height || birdPositionY + bird.height >= pipeCords[i].y + pipeGap + pipeTop.height)
            || birdPositionY + bird.height >= gameCanvas.height - ground.height || birdPositionY + bird.height >= gameCanvas.height) {
            gameStopped = true;
            pipeCords = {};
            break;
        }

        if (pipeCords[i].x === 5) {
            score++;
            scoreSound.play();
        }
    }

    gameContext.drawImage(ground, 0, gameCanvas.height - ground.height);
    gameContext.drawImage(bird, birdPositionX, birdPositionY);

    if (!gameStopped) birdPositionY += gravity;

    if (gameStopped) {
        gameContext.fillStyle = "#000000";
        gameContext.font = "30px Verdana";
        gameContext.fillText("Score : " + score, 100, gameCanvas.height / 3);
        gameContext.fillText("Press F5 to restart", 20, gameCanvas.height / 2.3);
    } else {
        gameContext.fillStyle = "#000000";
        gameContext.font = "20px Verdana";
        gameContext.fillText("Score : " + score, 10, gameCanvas.height - 20);
    }

    requestAnimationFrame(draw);
};

draw();