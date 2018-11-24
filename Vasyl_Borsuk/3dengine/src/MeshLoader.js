class MeshLoader {
    static async loadMeshesFromJson(fileURL) {
        const source = await (await fetch(fileURL)).json();

        let meshes = Array();
        for (let meshInd = 0; meshInd < source.meshes.length; meshInd++) {
            let vertices = source.meshes[meshInd].vertices;
            let polygons = source.meshes[meshInd].indices;

            let uvCount = source.meshes[meshInd].uvCount;  // number of texture coordinates;
            let verticesStep = 1;

            switch (uvCount) {
                case 0: {verticesStep = 6; break;}
                case 1: {verticesStep = 8; break;}
                case 2: {verticesStep = 10; break;}
            }

            let numberOfVertices = vertices.length / verticesStep;
            let numberOfPolygons = polygons.length / 3;

            let mesh = new Mesh(source.meshes[meshInd].name, numberOfVertices, numberOfPolygons);
            for (let vertexInd = 0; vertexInd < numberOfVertices; vertexInd++) {
                mesh.vertices[vertexInd] = new Vector3(
                    vertices[vertexInd * verticesStep],
                    vertices[vertexInd * verticesStep + 1],
                    vertices[vertexInd * verticesStep + 2]
                )
            }
            for (let polygonInd = 0; polygonInd < numberOfPolygons; polygonInd++) {
                mesh.polygons[polygonInd] = new Polygon(
                    polygons[polygonInd * 3],
                    polygons[polygonInd * 3 + 1],
                    polygons[polygonInd * 3 + 2]
                )
            }
            let position = source.meshes[meshInd].position;
            mesh.position = new Vector3(position[0], position[1], position[2]);
            let rotation = source.meshes[meshInd].rotation;
            mesh.rotation = new Vector3(rotation[0], rotation[1], rotation[2]);

            meshes.push(mesh);
        }
        return meshes;
    }
}
