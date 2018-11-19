const birdObject = document.getElementById("bird");
const fieldObject = document.getElementById("field");
const scoreObject = document.getElementById("score");

const momentumFactor = 10;
const rotationFactor = 50;
const initialHeight = 600;
const g = 9.8;
const birdSize = 40;
const fieldSize = 1000;
const wallWidth = 100;

let momentum = momentumFactor;
let gapSize = 500;
let currentHeight = 0;
let delta = 0;
let rotateTransform = 0;
let score = 0;

let updateBirdInterval;
let updateWallsInterval;
let updateGravityInterval;
let spawnWallsInterval;



function updateBird() {
    birdObject.style.bottom = initialHeight + "px";
    document.addEventListener('keypress', () => {
        momentum = momentumFactor;
    });
    updateBirdInterval = setInterval(() => {
        currentHeight = +birdObject.style.bottom.replace("px", '');
        delta = currentHeight + momentum * g / momentumFactor;
        if (delta > fieldSize - birdSize / 2) {
            delta = fieldSize - birdSize / 2;
            momentum = -2;
        }
        birdObject.style.bottom = delta + 'px';
        rotateTransform = momentum > -momentumFactor ? momentum * 6 : -rotationFactor;
        birdObject.style.transform = "rotate($deg)".replace('$', -rotateTransform);
            // transform: rotate(-90deg);

        if (currentHeight <= birdSize) {
            birdObject.style.bottom = birdSize + 'px';
            momentum = 0;
            endGame();
        }
    }, 10);

    updateGravityInterval = setInterval(() => {
        momentum -= 1;
    }, 50);
}

function updateWalls(){
    updateWallsInterval = setInterval(() => {
        let wallContainers = Array.prototype.filter.call(document.getElementsByClassName("field--wall-container"), wall=>wall);
        wallContainers.forEach(wallContainer => {
            wallContainer.style.left = wallContainer.offsetLeft - 5 + 'px';
            if (checkCollision(birdObject, wallContainer)){
                endGame();
            };
            if (wallContainer.offsetLeft < -wallWidth){
                wallContainer.remove();
                score++;
                scoreObject.innerText = score;
                if (gapSize > 250 && score % 2 === 0){
                    gapSize -= 100;
                }
            }
        });
    }, 10)
}

function getWalls(topWallHeight) {
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="field--wall-container">
            <div style="height: {0}" class="field--wall field--wall-top" id="wall-top"></div>
            <div style="height: {1}"  class="field--wall field--wall-bot" id="wall-bot"></div>
        </div>
    `.replace('{0}', topWallHeight + 'px').replace('{1}', fieldSize - topWallHeight - gapSize + 'px').trim();
    return div.firstChild;

}

function spawnWalls(){
    spawnWallsInterval = setInterval(() => {
        fieldObject.appendChild(getWalls(Math.random() * 400 + 100));
    }, 1200)

}

function clearWalls() {
    let wallContainers = Array.prototype.filter.call(document.getElementsByClassName("field--wall-container"), wall=>wall);
    wallContainers.forEach(wallContainer => {
        wallContainer.remove();
    })
}

function reinitializeParams() {
    momentum = momentumFactor;
    gapSize = 500;
    currentHeight = 0;
    delta = 0;
    rotateTransform = 0;
    score = 0;
    scoreObject.innerText = score;
}

function endGame(){
    clearInterval(updateBirdInterval);
    clearInterval(updateGravityInterval);
    clearInterval(spawnWallsInterval);
    clearInterval(updateWallsInterval);
    alert("Game Over");
    reinitializeParams();
    clearWalls();
    restartGame();
}

function startGame(e){
    if (e.code !== "Space") return;
    document.removeEventListener('keypress',startGame);
    updateBird();
    updateWalls();
    spawnWalls();
}

function restartGame(){
    updateBird();
    updateWalls();
    spawnWalls();
}

function checkCollision(bird, wallContainer){
    if (wallContainer.offsetLeft > 250 || wallContainer.offsetLeft < -110 + 200){
        return false;
    }

    let topWall = wallContainer.children[0];
    let botWall = wallContainer.children[1];
    let gapTopBoundary = fieldSize - topWall.offsetHeight;
    let gapBotBoundary = botWall.offsetHeight;

    let birdTopBoundary = fieldSize - bird.offsetTop - 15;
    let birdBotBoundary = fieldSize - bird.offsetTop - bird.offsetHeight + 15;

    return !(birdTopBoundary < gapTopBoundary && birdBotBoundary > gapBotBoundary);

}

document.addEventListener('keypress',startGame);
