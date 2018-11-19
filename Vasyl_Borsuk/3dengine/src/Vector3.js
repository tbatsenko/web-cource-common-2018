class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static Zero() {
        return new Vector3(0, 0, 0);
    }

    static Up() {
        return new Vector3(0, 1, 0);
    }

    transform(transformationMatrix) {
        let x = (this.x * transformationMatrix.m[0]) + (this.y * transformationMatrix.m[1]) + (this.z * transformationMatrix.m[2]) + transformationMatrix.m[3];
        let y = (this.x * transformationMatrix.m[4]) + (this.y * transformationMatrix.m[5]) + (this.z * transformationMatrix.m[6]) + transformationMatrix.m[7];
        let z = (this.x * transformationMatrix.m[8]) + (this.y * transformationMatrix.m[9]) + (this.z * transformationMatrix.m[10]) + transformationMatrix.m[11];
        let w = (this.x * transformationMatrix.m[12]) + (this.y * transformationMatrix.m[13]) + (this.z * transformationMatrix.m[14]) + transformationMatrix.m[15];
        return new Vector3(x / w, y / w, z / w);
    }

    subtract(vector) {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    static Cross(vector1, vector2) {
        let x = vector1.y * vector2.z - vector1.z * vector2.y;
        let y = vector1.z * vector2.x - vector1.x * vector2.z;
        let z = vector1.x * vector2.y - vector1.y * vector2.x;
        return new Vector3(x, y, z);
    }

    static Dot(vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    }

    normalize() {
        let temp = 1.0 / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));

        this.x *= temp;
        this.y *= temp;
        this.z *= temp;
    }
}

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static Zero() {
        return Vector2(0, 0);
    }
}

class Color {
    constructor(r, g, b, a) {
        this.val = [r, g, b, a];
    }
}
