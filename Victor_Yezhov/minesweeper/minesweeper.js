var cell={
    width:0,
    height:0
};

var gameState = {
    MaxMinesOnField: 0,
    remainingFlags:0,
    minesCorrectlyMarked: 0,
    totalMarkedMines:0,
    dimension:0,
    game: true
};

class CellInfo {
    constructor(elem, x, y) {
        this.elem = elem;
        this.x = x;
        this.y = y;
        this.hasMine = false;
        this.hasFlag = false;
        this.isRevealed = false;
        this.elem.mousedown(function(event) {
            switch (event.which) {
                case 1:
                    dealWithLeftClick(x, y);
                    break;
                case 3:
                    dealWithRightClick(x ,y);
                    break;
                default:
            }
            checkWin();
        });
    }
    isMine(){
        return this.hasMine;
    }
}

function checkWin(){
    if(gameState.minesCorrectlyMarked === gameState.MaxMinesOnField){
        gameState.game = false;
        alert("YOU WIN!!!!!")
    }
}


var fieldData = [];

$(document).ready(function(){
    startGame();
});

var difficulties = {
    "easy": 10,
    "beginner":15,
    "intermediate":20,
    "advanced":25
};


function startGame() {
    gameState.game = true;
    var selector = $('.level');
    var selectedDifficulty = selector.val();
    gameState.MaxMinesOnField = difficulties[selectedDifficulty];
    gameState.remainingFlags = gameState.MaxMinesOnField;
    gameState.dimension = gameState.MaxMinesOnField;
    gameState.minesCorrectlyMarked=0;
    gameState.totalMarkedMines = 0;
    cell.width = 50;
    cell.height = 50;
    drawField(selectedDifficulty);
    changeFace();


}


function drawField(difficulty){
    var dimension  = difficulties[difficulty];
    resizeHeader(dimension);
    clearField();
    var  field = $("#board__field");
    for(var i = 0; i<dimension; i++){
        var row = $('<div class="field__row"/>');
        fieldData[i] = [];
        for( var j = 0; j< dimension; j++){
            var cell = $('<div class="field__cell" />')
                .appendTo(row);
            fieldData[i][j] = new CellInfo(cell, i, j);
        }
        row.appendTo(field);
    }

    plantMines();
}

function resizeHeader(dim) {
    var totalWidth = dim * cell.width;
    var header = $('.board__header');
    header.outerWidth(totalWidth);
    console.log("Field resized !!");
    console.log("DIM:"+ dim+" cell width: "+ cell.width+" total :"+ totalWidth);
    clearTimeout(timerState.timerId)
}

function clearField() {
    fieldData.length  = 0;

    $("#board__field").empty();
}

function getRandomNumber()
{
    return Math.floor((Math.random() * 1000) + 1) % gameState.MaxMinesOnField;
}

function plantMines() {
    var  minesPlanted = 0;
    while (minesPlanted < gameState.MaxMinesOnField)
    {
        let x = getRandomNumber(gameState.MaxMinesOnField);
        let y = getRandomNumber(gameState.MaxMinesOnField);
        if (!fieldData[x][y].hasMine) {
            fieldData[x][y].hasMine = true;
            minesPlanted++;
        }
    }
    displayMinesCounter();
    initTimer();
}


function displayMinesCounter() {
    let counter = $(".mines-counter");
    let counterValue = gameState.remainingFlags;
    changeFace();
    if(counterValue.toString().length < 3){
        var stringValue = '0'+ counterValue.toString();
        counter.empty();
        counter.html(stringValue);
    }else {
        counter.empty();
        counter.html(counterValue.toString());
    }
}


var timerState={
    min:0,
    sec:0,
    timerId:null
};
function initTimer() {
    timerState.min=0;
    timerState.sec = 0;
    timerState.timerId = setInterval(function() {

        if(timerState.sec === 59){
            timerState.min++;
            timerState.sec=0;
        }else {
            timerState.sec++;
        }
        let timer = $(".timer");
        timer.empty();
        timer.html( timerState.min + ":" + timerState.sec);
    }, 1000);
}


function  dealWithLeftClick(x ,y) {
    if(!gameState.game){
        return;
    }
    let cell = fieldData[x][y];

    reveal(cell);

}

function  dealWithRightClick(x, y) {
    if(!gameState.game){
        return;
    }
    cell = fieldData[x][y];
    if(!cell.hasFlag) {
        cell.elem.css({
            'background-image': 'url(' + 'http://home.avvanta.com/~sydde/flagIcon.png' + ')',
            'background-size': 'cover'
        });
        cell.hasFlag = true;
        if(cell.hasMine){
            gameState.minesCorrectlyMarked++;
            gameState.totalMarkedMines++;
        }else {
            gameState.totalMarkedMines++;
        }
        gameState.remainingFlags--;
    }
    else {
        cell.elem.css('background-image', 'none');
        cell.hasFlag = false;
        if(cell.hasMine){
            gameState.minesCorrectlyMarked--;
            gameState.totalMarkedMines--;
        }else {
            gameState.totalMarkedMines--;
        }
        gameState.remainingFlags++;
    }
    displayMinesCounter();
}

function revealBombInCell(x, y){
    cell = fieldData[x][y];
    cell.elem.css({
        'background-image': 'url(' + 'https://vignette.wikia.nocookie.net/windows/images/5/5c/Minesweeper_Icon.png/revision/latest?cb=20170708011355' + ')',
        'background-size': 'cover',
        'background-color':"#FF0000"
    });
}


function changeFace(){
    if(gameState.remainingFlags < 0){
        $(".health-indicator").attr("src","https://jimbaker.files.wordpress.com/2012/05/disappoint.png?w=788");
    }else if(!gameState.game)
        $(".health-indicator").attr("src","http://www.emofaces.com/png/200/smilies/dead.png");
    else if(gameState.game){
        $(".health-indicator").attr("src","https://vignette.wikia.nocookie.net/39cluesidea/images/2/26/Smile.png/revision/latest?cb=20110217131619");
    }
}


function reveal(cell, auto) {
    if(cell.hasFlag || cell.isRevealed){
        return;
    }
    if(cell.hasMine){
        gameState.game = false;
        revealBombInCell(cell.x, cell.y);
        changeFace();
        revealAllField();
    }
    let aroundCells = getAroundCurrentCells(cell.x, cell.y);
    let count = exstractBombs(aroundCells);
    drawMinesCountOnCell(cell.x, cell.y, count);
    if(count === 0){
        for (var i = 0; i < aroundCells.length; i++)
        {
            if (!aroundCells[i].isRevealed || !aroundCells[i].hasMine)
            {
                reveal(aroundCells[i], true);
            }
        }
    }
}


function getAroundCurrentCells(x, y) {
    var mines = [];
    // traverse up
    if (x > 0) {mines.push(fieldData[x-1][y])}
    // traverse down
    if (x < gameState.dimension - 1 ) {mines.push(fieldData[x + 1][y]);}
    // traverse left
    if (y > 0 ) {mines.push(fieldData[x][y-1]);}
    // traverse right
    if (y < gameState.dimension - 1  ) {mines.push(fieldData[x][y+1]);}
    // traverse upper left
    if (x > 0 && y > 0) {mines.push(fieldData[x-1][y-1]);}
    // traverse lower left
    if (x < gameState.dimension - 1 && y > 0 ) {mines.push(fieldData[x+1][y-1]);}
    // traverse upper right
    if (x > 0 && y < gameState.dimension - 1  ) {mines.push(fieldData[x-1][y+1]);}
    // traverse lower right
    if (x < gameState.dimension - 1 && y < gameState.dimension - 1) {mines.push(fieldData[x+1][y+1]);}
    return mines;
}

var digits_colors ={
    1:"#0000ff",
    2:"#007e00",
    3:"#ff0000",
    4:"#000080",
    5:"#5d1519"
};


function drawMinesCountOnCell(x, y, count) {
    cell = fieldData[x][y];
    if(cell.hasMine){
        return;
    }
    cell.isRevealed = true;
    if(count === 0){
        cell.elem.css('background-color',"#FFFFFF")
    }else {
        var c = $("<div class='amount_of_mines_in_cell'>" + count + "</div>");
        c.css('color', digits_colors[count]);
        c.appendTo(cell.elem);
    }
}


function revealAllField(){
    for(let i =0 ; i< gameState.dimension; i++){
        for(let j = 0; j<gameState.dimension; j++){
            if(fieldData[i][j].hasMine){
                fieldData[i][j].elem.css({
                    'background-image': 'url(' + 'https://vignette.wikia.nocookie.net/windows/images/5/5c/Minesweeper_Icon.png/revision/latest?cb=20170708011355' + ')',
                    'background-size': 'cover'
                });
                if(fieldData[i][j].hasFlag){
                    fieldData[i][j].elem.css({
                        'background-color': '#007e00'
                    });
                }
            }else {
                let current_cell_counter = exstractBombs(getAroundCurrentCells(i, j));
                drawMinesCountOnCell(i, j, current_cell_counter);
            }
        }
    }
}

function exstractBombs(cells) {
    let count = 0;

    for(let i=0; i< cells.length; i++){
        if(cells[i].hasMine)
            count++;
    }
    return(count);
}
