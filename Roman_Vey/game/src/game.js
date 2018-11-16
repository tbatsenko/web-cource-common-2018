const FIELD_SIZE = 4
let field = Array(FIELD_SIZE)
    .fill()
    .map(() => Array(FIELD_SIZE).fill(0))



const generateNumber = (field) => {
    let free = [];
    for(let i = 0; i < FIELD_SIZE; i++){
        for(let j = 0; j < FIELD_SIZE; j++){
            if (field[i][j] == 0){
                free.push(i * FIELD_SIZE + j);
            }
        }
    }
    if (free.length < 1){
        console.log("No free place");
        return field;
    }
    let pos = Math.floor(Math.random() * free.length);
    i = Math.floor(free[pos] / FIELD_SIZE);
    j = free[pos] % FIELD_SIZE;

    field[i][j] = Math.floor(Math.random() * 10) >= 8 ? 4 : 2;
    return field;
}

const moveField = (field, e) => {
    console.log(e);
    if (e.key == "ArrowUp"){
        let nextSkip = false;
        for(let j = 0; j < FIELD_SIZE; j++){
            for(let i = FIELD_SIZE - 1; i >= 1; i--){
                if (nextSkip){
                    nextSkip = false;
                    continue;
                }
                if(field[i][j] == field[i - 1][j]){
                    field[i - 1][j] *= 2;
                    field[i][j] = 0;
                    nextSkip = true;
                }
            }
        }
    }

    if (e.key == "ArrowDown"){
        let nextSkip = false;
        for(let j = 0; j < FIELD_SIZE; j++){
            for(let i = 0; i < FIELD_SIZE - 1; i--){
                if (nextSkip){
                    nextSkip = false;
                    continue;
                }
                if(field[i][j] == field[i + 1][j]){
                    field[i + 1][j] *= 2;
                    field[i][j] = 0;
                    nextSkip = true;
                }
            }
        }
    }

    if (e.key == "ArrowLeft"){
        let nextSkip = false;
        for(let j = 0; j < FIELD_SIZE; j++){
            for(let i = FIELD_SIZE - 1; i >= 1; i--){
                if (nextSkip){
                    nextSkip = false;
                    continue;
                }
                if(field[j][i] == field[j][i - 1]){
                    field[j][i - 1] *= 2;
                    field[j][i] = 0;
                    nextSkip = true;
                }
            }
        }
    }

    if (e.key == "ArrowRight"){
        let nextSkip = false;
        for(let j = 0; j < FIELD_SIZE; j++){
            for(let i = 0; i < FIELD_SIZE - 1; i--){
                if (nextSkip){
                    nextSkip = false;
                    continue;
                }
                if(field[j][i] == field[j][i + 1]){
                    field[j][i + 1] *= 2;
                    field[j][i] = 0;
                    nextSkip = true;
                }
            }
        }
    }
    return field;
}


const renderCell = cellNumber => {
    if(cellNumber > 0) {
        return `<div class="game__cell">${cellNumber}</div>`;
    }else {
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

field = generateNumber(field);

document.addEventListener("keyup", (e)=>{
    // handle moving
    field = moveField(field, e);
    field = generateNumber(field);
});

setInterval(() => {
    renderField(field, document.querySelector(".layout__game-placeholder"));
}, 100);