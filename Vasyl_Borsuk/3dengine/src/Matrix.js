class Matrix {
    constructor() {
        this.m = [];
    }

    static FromValues(v11, v12, v13, v14, v21, v22, v23, v24, v31, v32, v33, v34, v41, v42, v43, v44) {
        let result = new Matrix();
        result.m[0] = v11;
        result.m[1] = v12;
        result.m[2] = v13;
        result.m[3] = v14;
        result.m[4] = v21;
        result.m[5] = v22;
        result.m[6] = v23;
        result.m[7] = v24;
        result.m[8] = v31;
        result.m[9] = v32;
        result.m[10] = v33;
        result.m[11] = v34;
        result.m[12] = v41;
        result.m[13] = v42;
        result.m[14] = v43;
        result.m[15] = v44;
        return result;
    }

    static Zero() {
        return Matrix.FromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    static Identity() {
        return Matrix.FromValues(1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0);
    }


    multiply(matrix) {
        let result = new Matrix();
        let temp = 0;
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++) {
                temp = 0;
                for (let k = 0; k < 4; k++) {
                    temp += this.m[i * 4 + k] * matrix.m[k * 4 + j];
                }
                result.m[i * 4 + j] = temp;
            }
        }
        return result;
    }


    static RotationX(angle) {
        let result = Matrix.Zero();
        let s = Math.sin(angle);
        let c = Math.cos(angle);
        result.m[0] = 1.0;
        result.m[15] = 1.0;
        result.m[5] = c;
        result.m[10] = c;
        result.m[6] = -s;
        result.m[9] = s;
        return result;
    }
    static RotationY(angle) {
        let result = Matrix.Zero();
        let s = Math.sin(angle);
        let c = Math.cos(angle);
        result.m[5] = 1.0;
        result.m[15] = 1.0;
        result.m[0] = c;
        result.m[8] = -s;
        result.m[2] = s;
        result.m[10] = c;
        return result;
    }
    static RotationZ(angle) {
        let result = Matrix.Zero();
        let s = Math.sin(angle);
        let c = Math.cos(angle);
        result.m[10] = 1.0;
        result.m[15] = 1.0;
        result.m[0] = c;
        result.m[4] = s;
        result.m[1] = -s;
        result.m[5] = c;
        return result;
    }
    static RotationYawPitchRoll(yaw, pitch, roll) {
        return Matrix.RotationZ(roll).multiply(Matrix.RotationX(pitch)).multiply(Matrix.RotationY(yaw));
    }

    static Translation(x, y, z) {
        let result = Matrix.Identity();
        result.m[3] = x;
        result.m[7] = y;
        result.m[11] = z;
        return result;
    }


    static LookAtLH(eye, target, up) {
        let zAxis = target.subtract(eye);
        zAxis.normalize();
        let xAxis = Vector3.Cross(up, zAxis);
        xAxis.normalize();
        let yAxis = Vector3.Cross(zAxis, xAxis);
        yAxis.normalize();
        let ex = -Vector3.Dot(xAxis, eye);
        let ey = -Vector3.Dot(yAxis, eye);
        let ez = -Vector3.Dot(zAxis, eye);
        return Matrix.FromValues(xAxis.x, xAxis.y, xAxis.z, ex,
                                 yAxis.x, yAxis.y, yAxis.z, ey,
                                 zAxis.x, zAxis.y, zAxis.z, ez,
                                 0, 0, 0, 1);
        // return Matrix.FromValues(xAxis.x, yAxis.x, zAxis.x, 0,
        //                          xAxis.y, yAxis.y, zAxis.y, 0,
        //                          xAxis.z, yAxis.z, zAxis.z, 0,
        //                          ex, ey, ez, 1);
    }

    static PerspectiveFovLH(fov, aspect, znear, zfar) {
        var matrix = Matrix.Zero();
        var tan = 1.0 / (Math.tan(fov * 0.5));
        matrix.m[0] = tan / aspect;
        matrix.m[4] = matrix.m[8] = matrix.m[12] = 0.0;
        matrix.m[5] = tan;
        matrix.m[1] = matrix.m[9] = matrix.m[13] = 0.0;
        matrix.m[2] = matrix.m[6] = 0.0;
        matrix.m[10] = -zfar / (znear - zfar);
        matrix.m[14] = 1.0;
        matrix.m[3] = matrix.m[7] = matrix.m[15] = 0.0;
        matrix.m[11] = (znear * zfar) / (znear - zfar);
        return matrix;
    }
}
