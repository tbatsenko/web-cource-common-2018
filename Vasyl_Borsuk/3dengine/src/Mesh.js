class Mesh {
    constructor(name, verticesCount, polygonsCount) {
        this.name = name;
        this.vertices = new Array(verticesCount);
        this.polygons = new Array(polygonsCount);
        this.rotation = Vector3.Zero();
        this.position = Vector3.Zero();
    }
}

class Polygon {
    constructor(A, B, C) {
        this.A = A;
        this.B = B;
        this.C = C;
    }
}
