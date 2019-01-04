export class Asteroid {
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

// draw() {
//     ctx.strokeStyle = "white";
//     ctx.beginPath();
//     ctx.moveTo(
//         this.x + this.radius * Math.cos(this.a) * this.offsets[0],
//         this.y + this.radius * Math.sin(this.a) * this.offsets[0]
//     );
//
//     for (let i = 1; i < this.verticies; i++) {
//         ctx.lineTo(
//             this.x + this.radius * Math.cos(this.a + i * Math.PI * 2 / this.verticies) * this.offsets[i],
//             this.y + this.radius * Math.sin(this.a + i * Math.PI * 2 / this.verticies) * this.offsets[i]
//         );
//     }
//
//     ctx.closePath();
//     ctx.stroke();
//     ctx.fillStyle = this.color;
//     ctx.fill();
// };
