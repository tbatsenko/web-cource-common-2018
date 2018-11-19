class Device {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = this.canvas.getContext("2d");
        this.depthBuffer = new Array(this.width * this.height);
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.buffer = this.context.getImageData(0, 0, this.width, this.height);
        this.depthBuffer.fill(Number.MAX_SAFE_INTEGER);
    }

    present() {
        this.context.putImageData(this.buffer, 0, 0);
    }

    putPixel(vector, color) {
        this.bufferData = this.buffer.data;
        let ind = (Math.floor(vector.x) + Math.floor(vector.y) * this.width);

        if (this.depthBuffer[ind] < vector.z) {
            return;
        }
        this.depthBuffer[ind] = vector.z;

        for (let i = 0; i < color.val.length; i++) {
            this.bufferData[ind * 4 + i] = color.val[i];
        }
    }

    drawPoint(vector, color) {
        if (vector.x >=0 && vector.y >= 0 && vector.x < this.width && vector.y < this.height) {
            this.putPixel(vector, color);
        }
    }

    static findXFromGrad(min, max, gradient) {
        return min + (max - min) * Math.max(0, Math.min(gradient, 1));
    }

    drawScanLine(y, pa, pb, pc, pd, color) {
        let grad1 = pa.y !== pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
        let grad2 = pc.y !== pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;

        let sx = Math.floor(Device.findXFromGrad(pa.x, pb.x, grad1));
        let ex = Math.floor(Device.findXFromGrad(pc.x, pd.x, grad2));

        let sz = Device.findXFromGrad(pa.z, pb.z, grad1);
        let ez = Device.findXFromGrad(pc.z, pd.z, grad2);

        for (let x = sx; x < ex; x++) {
            let grad = (x - sx) / (ex - sx);
            let z = Device.findXFromGrad(sz, ez, grad);

            if (x === sx || x === ex) {
                this.drawPoint(new Vector3(x, y, z), new Color(0, 0, 0, 255));
            }
            else {
                this.drawPoint(new Vector3(x, y, z), color);
            }
        }
    }

    drawTriangle(vector1, vector2, vector3, color) {
        // sorting vertices
        if (vector1.y > vector2.y) {[vector1, vector2] = [vector2, vector1]}
        if (vector2.y > vector3.y) {[vector2, vector3] = [vector3, vector2]}
        if (vector1.y > vector2.y) {[vector1, vector2] = [vector2, vector1]}

        if (vector1.y === vector2.y) {
            vector2.y += 0.01;
        }

        let d12 = vector1.y !== vector2.y ? (vector2.x - vector1.x) / (vector2.y - vector1.y) : 0;
        let d13 = vector1.y !== vector3.y ? (vector3.x - vector1.x) / (vector3.y - vector1.y) : 0;

        if (d12 > d13) {
            //      1
            //    /   \
            //   /  ___2
            //  3---
            for (let y = Math.floor(vector1.y); y <= vector3.y; y++) {
                if (y < vector2.y) {
                    this.drawScanLine(y, vector1, vector3, vector1, vector2, color);
                }
                else {
                    this.drawScanLine(y, vector1, vector3, vector2, vector3, color);
                }
            }
        }
        else {
            //      1
            //    /   \
            //   2__   \
            //      ---3
            for (let y = Math.floor(vector1.y); y <= vector3.y; y++) {
                if (y < vector2.y) {
                    this.drawScanLine(y, vector1, vector2, vector1, vector3, color);
                }
                else {
                    this.drawScanLine(y, vector2, vector3, vector1, vector3, color);
                }
            }
        }
    }

    project(vector, transformationMatrix) {
        let newVector = vector.transform(transformationMatrix);

        let x = newVector.x * this.width + Math.floor(this.width / 2.0);
        let y = -newVector.y * this.height + Math.floor(this.height / 2.0);
        return new Vector3(x, y, newVector.z);
    }

    render(camera, meshes) {
        let viewMatrix = Matrix.LookAtLH(camera.position, camera.target, Vector3.Up());
        let projectionMatrix = Matrix.PerspectiveFovLH(0.78, this.width / this.height, 0.01, 1.0);

        for (let meshInd = 0; meshInd < meshes.length; meshInd++) {
            let mesh = meshes[meshInd];

            let worldMatrix = Matrix.Translation(mesh.position.x, mesh.position.y, mesh.position.z)
                              .multiply(Matrix.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z));

            let transformationMatrix = projectionMatrix.multiply(viewMatrix).multiply(worldMatrix);

            for (let polygonInd = 0; polygonInd < mesh.polygons.length; polygonInd++) {
                let currentPolygon = mesh.polygons[polygonInd];
                let vecA = mesh.vertices[currentPolygon.A];
                let vecB = mesh.vertices[currentPolygon.B];
                let vecC = mesh.vertices[currentPolygon.C];

                let pixelA = this.project(vecA, transformationMatrix);
                let pixelB = this.project(vecB, transformationMatrix);
                let pixelC = this.project(vecC, transformationMatrix);

                let color = 155;//Math.floor((0.25 + ((polygonInd % mesh.polygons.length) / mesh.polygons.length) * 0.75) * 230);
                this.drawTriangle(pixelA, pixelB, pixelC, new Color(color, color, color, 255));

                // let lineColor = new Color(0, 0, 0, 255);
                // this.drawLine(pixelA, pixelB, lineColor);
                // this.drawLine(pixelB, pixelC, lineColor);
                // this.drawLine(pixelC, pixelA, lineColor);
            }
        }
        console.log("rendered");
    }


    drawLine(vector1, vector2, color) {
        let x1 = Math.floor(vector1.x);
        let y1 = Math.floor(vector1.y);
        let x2 = Math.floor(vector2.x);
        let y2 = Math.floor(vector2.y);

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);

        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;

        let err = dx - dy;
        while (true) {
            this.drawPoint(new Vector2(x1, y1), color);
            if ((x1 === x2) && (y1 === y2)) break;
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }



    // drawBottomFlatTriangle(vector1, vector2, vector3, color) {
    //     let slope1 = (vector2.x - vector1.x) / (vector2.y - vector1.y);
    //     let slope2 = (vector3.x - vector1.x) / (vector3.y - vector1.y);
    //
    //     let currx1 = vector1.x;
    //     let currx2 = vector1.x;
    //
    //     for (let y = vector1.y; y <= vector2.y; y++) {
    //         for (let x = currx1; x < currx2; x++) {
    //             this.drawPoint(new Vector3(x, y, vector1.z), color);
    //         }
    //         currx1 += slope1;
    //         currx2 += slope2;
    //     }
    // }
    //
    // drawTopFlatTriangle(vector1, vector2, vector3, color) {
    //     let slope1 = (vector3.x - vector1.x) / (vector3.y - vector1.y);
    //     let slope2 = (vector3.x - vector2.x) / (vector3.y - vector2.y);
    //
    //     let currx1 = vector3.x;
    //     let currx2 = vector3.x;
    //
    //     for (let y = vector3.y; y >= vector1.y; y--) {
    //         for (let x = currx1; x < currx2; x++) {
    //             this.drawPoint(new Vector3(x, y, vector1.z), color);
    //         }
    //         currx1 -= slope1;
    //         currx2 -= slope2;
    //     }
    // }
    //
    // drawTriangle(vector1, vector2, vector3, color) {
    //     // sorting vertices
    //     if (vector1.y > vector2.y) {[vector1, vector2] = [vector2, vector1]}
    //     if (vector2.y > vector3.y) {[vector2, vector3] = [vector3, vector2]}
    //     if (vector1.y > vector2.y) {[vector1, vector2] = [vector2, vector1]}
    //
    //     if (vector1.y === vector2.y) {
    //         this.drawTopFlatTriangle(vector1, vector2, vector3, color);
    //     }
    //     else if (vector2.y === vector3.y) {
    //         this.drawBottomFlatTriangle(vector1, vector2, vector3, color);
    //     }
    //     else {
    //         let vector4 = new Vector3(
    //             vector1.x + (vector2.y - vector1.y) / (vector3.y - vector1.y) * (vector3.x - vector1.x),
    //             vector2.y,
    //             vector1.z + (vector2.y - vector1.y) / (vector3.y - vector1.y) * (vector3.z - vector1.z)
    //         );
    //         this.drawBottomFlatTriangle(vector1, vector2, vector4, color);
    //         this.drawTopFlatTriangle(vector2, vector4, vector3, color);
    //     }
    // }
}
