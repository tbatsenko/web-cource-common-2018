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
    field = generateNumber(field);
});

setInterval(() => {
    renderField(field, document.querySelector(".layout__game-placeholder"));
}, 100);