let canvas;
let device;
let mesh;
let meshes = [];
let camera;

document.addEventListener("DOMContentLoaded", init, false);

async function init() {
    canvas = document.getElementById("frontBuffer");
    camera = new Camera();
    device = new Device(canvas);

    meshes = await MeshLoader.loadMeshesFromJson("meshes/lvl1.babylon").valueOf();
    mesh = meshes[0];

    camera.position = new Vector3(0, 0, 10);
    camera.target = new Vector3(0, 0, 0);

    // Calling the HTML5 rendering loop
    // requestAnimationFrame(drawingLoop);
}



setInterval(() => {
    device.clear();

    // rotating slightly the cube during each frame rendered
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;

    // Doing the various matrix operations
    device.render(camera, meshes);
    // Flushing the back buffer into the front buffer
    device.present();
}, 40);

document.addEventListener("keypress", e => {
    console.log(e);
    switch (e.key) {
        case "a" : {
            camera.position.x += 1;
            return;
        }
        case "w" : {
            camera.position.z -= 1;
            return;
        }
        case "d" : {
            camera.position.x -= 1;
            return;
        }
        case "s" : {
            camera.position.z += 1;
            return;
        }
        case "q": {
            camera.position.y += 1;
            return;
        }
        case "e": {
            camera.position.y -= 1;
            return;
        }
    }
});

// // Rendering loop handler
// function drawingLoop() {
//     device.clear();
//
//     // rotating slightly the cube during each frame rendered
//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.01;
//
//     // Doing the various matrix operations
//     device.render(camera, meshes);
//     // Flushing the back buffer into the front buffer
//     device.present();
//
//     // Calling the HTML5 rendering loop recursively
//     requestAnimationFrame(drawingLoop);
// }