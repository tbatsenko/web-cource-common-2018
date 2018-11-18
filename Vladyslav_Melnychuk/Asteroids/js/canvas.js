let canvas = document.getElementById("main-canvas");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
let ctx = canvas.getContext("2d");

function getRandomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function clamp(min, max, num) {
    return num <= min ? min : num >= max ? max : num;
}

class SpaceShip {

    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = 20;
        this.a = 90 / 180 * Math.PI;
        this.radius = this.size / 2;
        this.lastFrame = 0;
        this.dt = 0;
        this.turnSpeed = 360 / 180 * Math.PI;
        this.rotCoef = 0;
        this.thrustSpeed = 5;
        this.thrustPower = {x: 0, y: 0};
        this.thrusting = false;

        this.thrustSound = new Audio("audio/thrust.wav");
        this.fireSound = new Audio("audio/fire.wav");
        this.deathSound = new Audio("audio/bang.wav");

        this.bullets = [];
    }

    rotate() {
        this.a += this.rotCoef * this.turnSpeed * this.dt;
        // console.log(this.dt);
    }

    draw() {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = this.size / 20;
        ctx.beginPath();
        ctx.moveTo(
            this.x + 4 / 3 * this.radius * Math.cos(this.a),
            this.y - 4 / 3 * this.radius * Math.sin(this.a)
        );
        ctx.lineTo(
            this.x - this.radius * (2 / 3 * Math.cos(this.a) + Math.sin(this.a)),
            this.y + this.radius * (2 / 3 * Math.sin(this.a) - Math.cos(this.a))
        );
        // ctx.lineTo(
        //     this.x + 4 / 3 * this.radius * Math.cos(this.a),
        //     this.y
        // );
        ctx.lineTo(
            this.x - this.radius * (2 / 3 * Math.cos(this.a) - Math.sin(this.a)),
            this.y + this.radius * (2 / 3 * Math.sin(this.a) + Math.cos(this.a))
        );

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    };

    thrust() {
        this.thrustPower.x += this.thrustSpeed * Math.cos(this.a) * this.dt;
        this.thrustPower.y -= this.thrustSpeed * Math.sin(this.a) * this.dt;
        this.x += this.thrustPower.x;
        this.y += this.thrustPower.y;
        this.thrustSound.play();
    }

    decelerate() {
        let friction = .5;
        this.thrustPower.x -= friction * this.thrustPower.x * this.dt;
        this.thrustPower.y -= friction * this.thrustPower.y * this.dt;
        this.x += this.thrustPower.x;
        this.y += this.thrustPower.y;
    }

    fire() {
        this.bullets.push(new Bullet(this.x, this.y, this.a));
        // let x = Math.cos(this.a);
        // let y = Math.sin(this.a);b
        this.fireSound.play();
    }

    die() {
        this.deathSound.play();
    }

    update(time) {
        this.dt = (time - this.lastFrame) / 1024;
        this.draw();
        if (this.rotCoef !== 0) {
            this.rotate();
        }
        if (this.thrusting) {
            this.thrust();
        } else {
            this.decelerate();
        }

        if (this.x < 0 - this.radius) {
            this.x = canvas.width - this.radius;
        } else if (this.x > canvas.width - this.radius) {
            this.x = +this.radius;
        }

        if (this.y < 0 - this.radius) {
            this.y = canvas.height - this.radius;
        } else if (this.y > canvas.height - this.radius) {
            this.y = this.radius;
        }
        this.lastFrame = time;
    }
}

class Bullet {

    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        // a -= a / Math.PI * 90;
        this.dx = Math.cos(a) * 10;
        this.dy = -Math.sin(a) * 10;

        // this.a = a;
        /*this.lastFrame = 0;
        this.dt = 0;*/
    }

    draw() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.strokeStyle = "red";
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();

        // if ()
    }
}

class Asteroid {
    constructor(x, y, dx, dy, a, radius, color, vertices) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.a = a;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.verticies = vertices;
        this.rotation = 0;

        this.offsets = [];
        this.fillOffsets();
    }

    fillOffsets() {
        let offsetCoef = .5;
        for (let i = 0; i < this.verticies; i++) {
            this.offsets.push((Math.random() * offsetCoef * 2 + 1 - offsetCoef / 2));
        }
        // this.radius *= ;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#fff";
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    };

    update() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
}


// Input handling
function keyDown(ev) {
    if (ev.key === "ArrowUp") {
        spaceShip.thrusting = true;
    } else if (ev.key === "ArrowLeft") {
        spaceShip.rotCoef = 1;
    } else if (ev.key === "ArrowRight") {
        spaceShip.rotCoef = -1;
    } else if (ev.key === " ") {
        spaceShip.fire();
    }
}

function keyUp(ev) {
    if (ev.key === "ArrowUp") {
        spaceShip.thrusting = false;
    } else if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
        spaceShip.rotCoef = 0;
    }
}

function distance(x1, y1, x2, y2) {
    // alert(Math.sqrt(Math.pow(x2 - x1, 2) - Math.pow(y2 - y1, 2)));
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function createAsteroid(shipX, shipY) {
    let radius = Math.round(Math.random() * 30) + 1;
    let x = clamp(radius, innerWidth - radius * 2, Math.random() * innerWidth);
    let y = clamp(radius, innerHeight - radius * 2, Math.random() * innerHeight);
    while (distance(shipX, shipY, x, y) < 200) {
        x = clamp(radius, innerWidth - radius * 2, Math.random() * innerWidth);
        y = clamp(radius, innerHeight - radius * 2, Math.random() * innerHeight);
    }
    let dx = (Math.random() - .5) * 5;
    let dy = (Math.random() - .5) * 5;
    let vertices = Math.floor(Math.random() * 10) + 1;
    return new Asteroid(x, y, dx, dy, 1, radius, getRandomColor(), vertices);
}

// Setup
let asteroids = [];
const asteroidCount = 30;
let lastRound = 0;

let spaceShip = new SpaceShip();

let isGameLost = false;
let gameOverImg = new Image();
gameOverImg.src = 'img/10.jpg';

for (let i = 0; i < asteroidCount; i++) {
    asteroids.push(createAsteroid(spaceShip.x, spaceShip.y));
}
let score = 0;
let scoreX = canvas.width * .05;
let scoreY = canvas.height / 10;

let bulletSize = 5;

// Game Over Screen
function onGameOver() {
    spaceShip.die();
    ctx.drawImage(gameOverImg, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";
    ctx.fillText("Refresh to restart", (canvas.width / 2.55), (canvas.height / 1.2));
}

// Main
function main(time = 0) {
    if (isGameLost) {
        return 0;
    }
    score += time / 131072;
    requestAnimationFrame(main);
    document.addEventListener('keydown', keyDown);
    document.addEventListener("keyup", keyUp);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let j = 0; j < spaceShip.bullets.length; j++) {
        console.log(spaceShip.bullets[j]);
        spaceShip.bullets[j].update();
    }

    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
        if (distance(asteroids[i].x, asteroids[i].y, spaceShip.x, spaceShip.y) <= spaceShip.radius + asteroids[i].radius) {
            isGameLost = true;
        }

        for (let j = 0; j < spaceShip.bullets.length; j++) {
            if (distance(asteroids[i].x, asteroids[i].y, spaceShip.bullets[j].x, spaceShip.bullets[j].y) < asteroids[i].radius + bulletSize) {
                asteroids[i] = createAsteroid(spaceShip.x, spaceShip.y);
            }
        }
    }
    if (!isGameLost) {
        spaceShip.update(time);
        // ctx.fillStyle = "rgba(255, 255, 255, .2)";
        // ctx.rect(scoreX / 2 + 10, scoreY / 2, 60, 60);
        ctx.fill();
        ctx.fillStyle = "red";
        ctx.font = "bold 40px Arial";
        let displayScore = Math.round(score);
        // console.log(displayScore & 10);
        if (displayScore % 10 === 0 && displayScore !== lastRound) {
            lastRound = displayScore;
            asteroids.push(createAsteroid(spaceShip.x, spaceShip.y));
        }
        ctx.fillText(displayScore.toString(), scoreX, scoreY);
    } else {
        onGameOver();
    }
}

main();
