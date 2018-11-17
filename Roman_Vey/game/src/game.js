const FIELD_SIZE = 4
let field;
let startTime;
let score;
let moves;

const valid = (i, j) => {
    return i >= 0 && i < FIELD_SIZE && j >= 0 && j < FIELD_SIZE;
}

const checkLose = (field) => {
    let di = [1, -1, 0, 0];
    let dj = [0, 0, 1, -1];
    for(let i = 0; i < FIELD_SIZE; i++){
        for(let j = 0; j < FIELD_SIZE; j++){
            let val = field[i][j];
            for(let k = 0; k < 4; k++){
                if(valid(i + di[k], j + dj[k])){
                    if(field[i + di[k]][j + dj[k]] == val){
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

const displayLose = () => {
    document.querySelector(".layout__score-placeholder").style.display = "none";
    document.querySelector(".layout__game-placeholder").style.display = "none";
    document.querySelector(".layout__lose").style.display = "flex";
    updateScore(".layout__lose-score");    
    updateMoves(".layout__lose-moves");
    updateTime(".layout__lose-time");
    clearInterval(intervalId);
}

const generateNumber = (field) => {
    let free = [];
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            if (field[i][j] == 0) {
                free.push(i * FIELD_SIZE + j);
            }
        }
    }
    if (free.length < 1) {
        if (checkLose(field)){
            displayLose();
        }
        return field;
    }
    let pos = Math.floor(Math.random() * free.length);
    i = Math.floor(free[pos] / FIELD_SIZE);
    j = free[pos] % FIELD_SIZE;

    field[i][j] = Math.floor(Math.random() * 10) >= 8 ? 4 : 2;
    return field;
}

const mergeNums = (field, e) => {

    if (e.key == "ArrowUp") {
       
            for (let i = 0; i < FIELD_SIZE; i++) {
                for (let j = 1; j < FIELD_SIZE; j++) {
                    if (field[i][j - 1] == field[i][j]) {
                        score += field[i][j] * 2;
                        field[i][j - 1] *= 2;
                        field[i][j] = 0;
                        j++;
                    }
                }
            }
    
    }
    if (e.key == "ArrowDown") {
     
            for (let i = 0; i < FIELD_SIZE; i++) {
                for (let j = FIELD_SIZE - 2; j>=0; j--) {
                    if (field[i][j + 1] == field[i][j]) {
                        score += field[i][j] * 2;
                        field[i][j + 1] *= 2;
                        field[i][j] = 0;
                        score += field[i][j + 1];
                        j--;
                    }
                }
            }
        
    }
    if (e.key == "ArrowLeft") {
      
            for (let j = 0; j < FIELD_SIZE; j++) {
                for (let i = 1; i < FIELD_SIZE; i++) {
                    if (field[i - 1][j] == field[i][j]) {
                        score += field[i][j] * 2;
                        field[i - 1][j] *= 2;
                        field[i][j] = 0;
                        i++;
                    }
                }
            }
        
    }
    if (e.key == "ArrowRight") {
      
            for (let j = 0; j < FIELD_SIZE; j++) {
                for (let i = FIELD_SIZE - 2; i >= 0; i--) {
                    if (field[i + 1][j] == field[i][j]) {
                        score += field[i][j] * 2;
                        field[i + 1][j] *= 2;
                        field[i][j] = 0;
                        i--;
                    }
                }
            }
        
    }
    updateScore(".score");
}

const moveNums = (field, e) => {
    hasMoves = false;
    if (e.key == "ArrowUp") {
        for (let iteration = 0; iteration < FIELD_SIZE - 1; iteration++) {
            for (let i = 0; i < FIELD_SIZE; i++) {
                for (let j = 1; j < FIELD_SIZE; j++) {
                    if (field[i][j - 1] == 0) {
                        field[i][j - 1] = field[i][j];
                        field[i][j] = 0;
                        hasMoves = true;
                    }
                }
            }
        }
    }
    if (e.key == "ArrowDown") {
        for (let iteration = 0; iteration < FIELD_SIZE - 1; iteration++) {
            for (let i = 0; i < FIELD_SIZE; i++) {
                for (let j = FIELD_SIZE - 2; j>=0; j--) {
                    if (field[i][j + 1] == 0) {
                        field[i][j + 1] = field[i][j];
                        field[i][j] = 0;
                        hasMoves = true;
                    }
                }
            }
        }
    }
    if (e.key == "ArrowLeft") {
        for (let iteration = 0; iteration < FIELD_SIZE - 1; iteration++) {
            for (let j = 0; j < FIELD_SIZE; j++) {
                for (let i = 1; i < FIELD_SIZE; i++) {
                    if (field[i - 1][j] == 0) {
                        field[i - 1][j] = field[i][j];
                        field[i][j] = 0;
                        hasMoves = true;
                    }
                }
            }
        }
    }
    if (e.key == "ArrowRight") {
        for (let iteration = 0; iteration < FIELD_SIZE - 1; iteration++) {
            for (let j = 0; j < FIELD_SIZE; j++) {
                for (let i = FIELD_SIZE - 2; i >= 0; i--) {
                    if (field[i + 1][j] == 0) {
                        field[i + 1][j] = field[i][j];
                        field[i][j] = 0;
                        hasMoves = true;
                    }
                }
            }
        }
    }
    return hasMoves;
}


const updateScore = (query) => {
    document.querySelector(query).innerHTML = `Score: ${score}`
}

const updateMoves = (query) => {
    document.querySelector(query).innerHTML = `Moves: ${moves}`
}

const updateTime = (query) => {
    let diffTime = new Date(new Date() - startTime);
    diffTime.setHours(diffTime.getHours() - 3); // Timezone
    let timeToDisplay = "Time: " + ('0' + diffTime.getHours()).slice(-2) + ':'
                 + ('0' + diffTime.getMinutes()).slice(-2) + ':'
                 + ('0' + diffTime.getSeconds()).slice(-2)
    document.querySelector(query).innerHTML = timeToDisplay;
}


const renderCell = cellNumber => {
    if (cellNumber > 0) {
        return `<div class="game__cell">${cellNumber}</div>`;
    } else {
        return `<div class="game__cell--empty"></div>`;
    }
}


const renderField = (field, container) => {
    container.innerHTML = `
        <div class="game">
        
        ${field
            .map(
                row =>
                    `<div class="game__row">${row.map(renderCell).join('')}</div>`
            )
            .join('')}
        </div>
    `
}

const validKey = (e) => {
    return (e.key == "ArrowUp") || (e.key == "ArrowDown") || (e.key == "ArrowLeft") || (e.key == "ArrowRight");
}


document.addEventListener("keyup", (e) => {
    move1 = moveNums(field, e);
    mergeNums(field, e);
    move2 = moveNums(field, e);
    if (move1 || move2){
        moves++;
    }
    if (validKey(e)){
        field = generateNumber(field);
    }
    updateMoves(".moves");
    renderField(field, document.querySelector(".layout__game-placeholder"));
});

const startGame = () => {
    field = Array(FIELD_SIZE)
    .fill()
    .map(() => Array(FIELD_SIZE).fill(0))
    moves = 0;
    score = 0;
    startTime = new Date;
    field = generateNumber(field);
    const intervalId = setInterval(()=> { updateTime(".time") }, 1000);
    renderField(field, document.querySelector(".layout__game-placeholder"));
}
startGame()

