var cell={
    width:50,
    height:50
};

var state = {
    MaxMinesOnField: 0,
    minesMarked: 0,
};

class CellInfo {
    constructor(elem, x, y) {
        this.elem = elem;
        this.x = x;
        this.y = y;
        this.hasMine = false;
        this.elem.click(()=>{
            if(this.hasMine){
                elem.css('background-image', 'https://static.greatbigcanvas.com/images/square/stocktrek-images/chicago-disintegrates-as-a-nuclear-explosion-erupts-in-the-middle-of-the-city,strmr100062s.jpg');
            }
            console.log("Clicked: "+ this.x+" "+ this.y+" "+ this.hasMine);
        })
    }
    isMine(){
        return this.hasMine;
    }
}



var fieldData = [];

$(document).ready(function(){
    startGame();
});

var difficulties ={
    "easy": 10,
    "beginner":15,
    "intermediate":20,
    "advanced":25
};


function startGame() {
    var selector = $('.level');
    var selectedDifficulty = selector.val();
    state.MaxMinesOnField = difficulties[selectedDifficulty];
    drawField(selectedDifficulty);
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
    console.log("rows: "+fieldData.length+" columns:"+ fieldData[0].length);
    plantMines();
}

function resizeHeader(dim) {
    var totalWidth = dim * cell.width;
    var header = $('.board__header');
    header.outerWidth(totalWidth);
    console.log("Field resized !!");
    clearTimeout(timerState.timerId)
}

function clearField() {
    fieldData.length  = 0;
    console.log("cleared!");
    $("#board__field").empty();
}

function getRandomNumber()
{
    return Math.floor((Math.random() * 1000) + 1) % state.MaxMinesOnField;
}

function plantMines()
{
    var  minesPlanted = 0;
    console.log("Max:"+state.MaxMinesOnField);
    while (minesPlanted <= state.MaxMinesOnField)
    {
        let x = getRandomNumber(state.MaxMinesOnField);
        let y = getRandomNumber(state.MaxMinesOnField);
        if (!fieldData[x][y].hasMine) {
            fieldData[x][y].hasMine = true;
            minesPlanted++;
            console.log("Mine Planted on "+ x + " " + y);
        }
    }
    displayMines();
    initTimer();
}


function displayMines() {
    let counter = $(".mines-counter");
    let counterValue = state.MaxMinesOnField;
    if(counterValue.toString().length < 3){
        var stringValue = '0'+ counterValue.toString();
    }
    counter.empty();
    counter.html(stringValue);
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


