export class SpaceShip {
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
    }

    decelerate() {
        let friction = .5;
        this.thrustPower.x -= friction * this.thrustPower.x * this.dt;
        this.thrustPower.y -= friction * this.thrustPower.y * this.dt;
        this.x += this.thrustPower.x;
        this.y += this.thrustPower.y;
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
            this.x = + this.radius;
        }

        if (this.y < 0 - this.radius) {
            this.y = canvas.height - this.radius;
        } else if (this.y > canvas.height - this.radius) {
            this.y = this.radius;
        }



        this.lastFrame = time;
    }

}