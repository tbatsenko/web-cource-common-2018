const ctx = document.getElementById('tetris').getContext('2d');
const blockWidth = 20;
const blockHeight = 20;
const fillColor = '#00b894';
const strokeColor = '#55efc4';

const figureModel_1 = [[66, 99], [20, 0], [40, 0], [60, 0]];
const figureModel_2 = [[0, 0], [20, 0], [40, 0], [20, 20]];
const figureModel_3 = [[0, 0], [20, 0], [40, 0], [40, 20]];
const figureModel_4 = [[0, 0], [20, 0], [40, 0], [0, 20]];
const figureModel_5 = [[0, 0], [20, 0], [0, 20], [20, 20]];
const figureModel_6 = [[0, 20], [20, 0], [40, 0], [20, 20]];

function clearCanvas() {
    ctx.clearRect(0, 0, 360, 360);
}

function drawBlock(originX, originY, width, height) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.fillRect(originX, originY, width, height);
    ctx.strokeRect(originX, originY, width, height);
}

function drawFigure(figure) {
    for (let i = 0; i < figure.length; i++) {
        drawBlock(figure[i][0], figure[i][1], blockWidth, blockHeight, fillColor);
    }
}

function translateFigureDown(initialFigure) {

    let nextMove = Array(5).fill().map(el => Array(2).fill(0));

    nextMove.forEach(function(el, i, initialFigure) {
        console.log(i);
        let [x, y] = initialFigure[i];
        nextMove[i][0] = x;
        nextMove[i][1] = y;
    });



    console.log(nextMove);

}

translateFigureDown(figureModel_1);


// function moveTimelyFigure(figure) {
//     let intervalId = setInterval(translateFigureDown(figure), 1000);
// }






