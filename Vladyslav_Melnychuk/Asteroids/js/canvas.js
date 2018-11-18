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

class Asteroid {
    constructor(x, y, dx, dy, radius, color) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.rotation = 0;
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

class SpaceShip {

    constructor(a) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = 15;
        this.a = 90 / 180 * Math.PI;
        this.r = this.size / 2;
        this.lastFrame = 0;
        this.dt = 0;
        this.turnSpeed = 360 / 180 * Math.PI;
        this.rotCoef = 0;
    }

    rotate() {
        this.a += this.rotCoef * this.turnSpeed * this.dt;
    }

    draw() {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = this.size / 20;
        ctx.beginPath();
        ctx.moveTo(
            this.x + 4 / 3 * this.r * Math.cos(this.a),
            this.y - 4 / 3 * this.r * Math.sin(this.a)
        );
        ctx.lineTo(
            this.x - this.r * (2 / 3 * Math.cos(this.a) + Math.sin(this.a)),
            this.y + this.r * (2 / 3 * Math.sin(this.a) - Math.cos(this.a))
        );
        // ctx.lineTo(
        //     this.x + 4 / 3 * this.r * Math.cos(this.a),
        //     this.y
        // );
        ctx.lineTo(
            this.x - this.r * (2 / 3 * Math.cos(this.a) - Math.sin(this.a)),
            this.y + this.r * (2 / 3 * Math.sin(this.a) + Math.cos(this.a))
        );

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    };

    update(time) {
        this.dt = time - this.lastFrame;
        this.draw();
        this.lastFrame = time;
        this.rotate();
    }

}

function keyDown(ev) {
    if (ev.key === "ArrowUp") {
        // move
    } else if (ev.key === "ArrowLeft") {
        spaceShip.rotCoef = -1;
        // spaceShip.rotate();
    } else if (ev.key === "ArrowRight") {
        spaceShip.rotCoef = 1;
        // spaceShip.rotate();
    }
}

function keyUp(ev) {
    if (ev.key === "ArrowUp") {
        // stop moving
    } else if (ev.key === "ArrowLeft") {
        spaceShip.rotCoef = 0;
    } else if (ev.key === "ArrowRight") {
        spaceShip.rotCoef = 0;
    }
}

let asteroids = [];
let asteroidCount = 50;
let spaceShip = new SpaceShip(1);

for (let i = 0; i < asteroidCount; i++) {
    let radius = Math.round(Math.random() * 30) + .1;
    let x = clamp(radius, innerWidth - radius * 2, Math.random() * innerWidth);
    let y = clamp(radius, innerHeight - radius * 2, Math.random() * innerHeight);
    let dx = (Math.random() - .5) * 5;
    let dy = (Math.random() - .5) * 5;
    let currentAsteroid = new Asteroid(x, y, dx, dy, radius, getRandomColor());
    asteroids.push(currentAsteroid);
}

function main(time = 0) {
    requestAnimationFrame(main);
    document.addEventListener('keydown', keyDown);
    document.addEventListener("keyup", keyUp);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
    }
    spaceShip.update(time);
}


main();


