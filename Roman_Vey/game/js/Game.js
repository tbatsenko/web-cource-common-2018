class Game {
    backgroundColors = ['#EEE4DA', '#EDE0C8', '#F2B179', '#F59563', '#F67C5F', '#F67C5F', '#F67C5F', '#F67C5F', '#F67C5F', '#F67C5F', '#F67C5F'];
    foregroundColors = ['#776E65', '#776E65', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2'];

    constructor(container) {
        this.container = container;
        this.startGame();
    }

    startGame = () => {
        this.generateElems()
        this.FIELD_SIZE = 4
        this.field = Array(this.FIELD_SIZE).fill().map(() => Array(this.FIELD_SIZE).fill(0))
        this.moves = 0;
        this.score = 0;
        this.startTime = new Date;
        this.updateMoves(".moves");
        this.updateScore(".score");
        this.updateTime(".time");
        this.field = this.generateNumber(this.field);
        this.intervalId = setInterval(() => { this.updateTime(".time") }, 1000);
        this.renderField(this.field, this.container.querySelector(".layout__game-placeholder"));
        this.addEventListeners()
    }

    generateElems = () => {
        console.log(this.container)
        this.container.innerHTML = `
        <div class="layout__score-placeholder">
                    <div class="score">Score: 0</div>
                    <div class="moves">Move: 0</div>
                    <div class="time">Time: 00:00:00</div>
                </div>
            
                <div class="layout__game-placeholder"></div>            
            
                <div class="layout__lose-placeholder">
                    <div class="layout__lose">
                            <div class="layout__lose-score"></div>
                            <div class="layout__lose-moves"></div>
                            <div class="layout__lose-time"></div>
                        </div>
        </div>`
    }

    valid = (i, j) => {
        return i >= 0 && i < this.FIELD_SIZE && j >= 0 && j < this.FIELD_SIZE;
    }

    checkLose = (field) => {
        let di = [1, -1, 0, 0];
        let dj = [0, 0, 1, -1];
        for (let i = 0; i < this.FIELD_SIZE; i++) {
            for (let j = 0; j < this.FIELD_SIZE; j++) {
                let val = field[i][j];
                for (let k = 0; k < 4; k++) {
                    if (this.valid(i + di[k], j + dj[k])) {
                        if (field[i + di[k]][j + dj[k]] == val) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    displayLose = () => {
        this.container.querySelector(".layout__score-placeholder").style.display = "none";
        this.container.querySelector(".layout__game-placeholder").style.display = "none";
        this.container.querySelector(".layout__lose").style.display = "flex";
        this.updateScore(".layout__lose-score");
        this.updateMoves(".layout__lose-moves");
        this.updateTime(".layout__lose-time");
        clearInterval(this.intervalId);
        document.removeEventListener("keyup", this.keyHandler);
    }

    generateNumber = (field) => {
        let free = [];
        for (let i = 0; i < this.FIELD_SIZE; i++) {
            for (let j = 0; j < this.FIELD_SIZE; j++) {
                if (field[i][j] == 0) {
                    free.push(i * this.FIELD_SIZE + j);
                }
            }
        }
        if (free.length < 1) {
            if (this.checkLose(field)) {
                this.displayLose();
            }
            return field;
        }
        let pos = Math.floor(Math.random() * free.length);
        let i = Math.floor(free[pos] / this.FIELD_SIZE);
        let j = free[pos] % this.FIELD_SIZE;

        field[i][j] = Math.floor(Math.random() * 10) >= 8 ? 4 : 2;
        return field;
    }
    mergeNums = (field, e) => {

        if (e.key == "ArrowUp") {

            for (let i = 0; i < this.FIELD_SIZE; i++) {
                for (let j = 1; j < this.FIELD_SIZE; j++) {
                    if (field[i][j - 1] == field[i][j]) {
                        this.score += field[i][j] * 2;
                        field[i][j - 1] *= 2;
                        field[i][j] = 0;
                        j++;
                    }
                }
            }

        }
        if (e.key == "ArrowDown") {

            for (let i = 0; i < this.FIELD_SIZE; i++) {
                for (let j = this.FIELD_SIZE - 2; j >= 0; j--) {
                    if (field[i][j + 1] == field[i][j]) {
                        this.score += field[i][j] * 2;
                        field[i][j + 1] *= 2;
                        field[i][j] = 0;
                        this.score += field[i][j + 1];
                        j--;
                    }
                }
            }

        }
        if (e.key == "ArrowLeft") {

            for (let j = 0; j < this.FIELD_SIZE; j++) {
                for (let i = 1; i < this.FIELD_SIZE; i++) {
                    if (field[i - 1][j] == field[i][j]) {
                        this.score += field[i][j] * 2;
                        field[i - 1][j] *= 2;
                        field[i][j] = 0;
                        i++;
                    }
                }
            }

        }
        if (e.key == "ArrowRight") {

            for (let j = 0; j < this.FIELD_SIZE; j++) {
                for (let i = this.FIELD_SIZE - 2; i >= 0; i--) {
                    if (field[i + 1][j] == field[i][j]) {
                        this.score += field[i][j] * 2;
                        field[i + 1][j] *= 2;
                        field[i][j] = 0;
                        i--;
                    }
                }
            }

        }
        this.updateScore(".score");
    }

    moveNums = (field, e) => {
        let hasMoves = false;
        if (e.key == "ArrowUp") {
            for (let iteration = 0; iteration < this.FIELD_SIZE - 1; iteration++) {
                for (let i = 0; i < this.FIELD_SIZE; i++) {
                    for (let j = 1; j < this.FIELD_SIZE; j++) {
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
            for (let iteration = 0; iteration < this.FIELD_SIZE - 1; iteration++) {
                for (let i = 0; i < this.FIELD_SIZE; i++) {
                    for (let j = this.FIELD_SIZE - 2; j >= 0; j--) {
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
            for (let iteration = 0; iteration < this.FIELD_SIZE - 1; iteration++) {
                for (let j = 0; j < this.FIELD_SIZE; j++) {
                    for (let i = 1; i < this.FIELD_SIZE; i++) {
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
            for (let iteration = 0; iteration < this.FIELD_SIZE - 1; iteration++) {
                for (let j = 0; j < this.FIELD_SIZE; j++) {
                    for (let i = this.FIELD_SIZE - 2; i >= 0; i--) {
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

    updateScore = (query) => {
        this.container.querySelector(query).innerHTML = `Score: ${this.score}`
    }

    updateMoves = (query) => {
        this.container.querySelector(query).innerHTML = `Moves: ${this.moves}`
    }

    updateTime = (query) => {
        let diffTime = new Date(new Date() - this.startTime);
        diffTime.setHours(diffTime.getHours() - 3);
        let timeToDisplay = "Time: " + ('0' + diffTime.getHours()).slice(-2) + ':'
            + ('0' + diffTime.getMinutes()).slice(-2) + ':'
            + ('0' + diffTime.getSeconds()).slice(-2)
        this.container.querySelector(query).innerHTML = timeToDisplay;
    }

    colorizeBackground = number => (this.backgroundColors[Math.log2(number) - 1])
    colorizeForeground = number => (this.foregroundColors[Math.log2(number) - 1])


    renderCell = cellNumber => {
        if (cellNumber > 0) {
            return `<div class="game__cell"
            style="
            background-color:${this.colorizeBackground(cellNumber)};
            color:${this.colorizeForeground(cellNumber)};">
            ${cellNumber}</div>`;
        } else {
            return `<div class="game__cell--empty"></div>`;
        }
    }


    renderField = (field) => {
        let game = this.container.querySelector(".layout__game-placeholder")
        game.innerHTML = `
            <div class="game">
            ${field
                .map(
                    row =>
                        `<div class="game__row">${row.map(this.renderCell).join('')}</div>`
                )
                .join('')}
            </div>
        `
    }

    validKey = (e) => {
        return (e.key == "ArrowUp") || (e.key == "ArrowDown") || (e.key == "ArrowLeft") || (e.key == "ArrowRight");
    }

    keyHandler = (e) => {
        let move1 = this.moveNums(this.field, e);
        this.mergeNums(this.field, e);
        let move2 = this.moveNums(this.field, e);
        if (move1 || move2) {
            this.moves++;
        }
        if (this.validKey(e)) {
            this.field = this.generateNumber(this.field);
        }
        this.updateMoves(".moves");
        this.renderField(this.field);
    }

    addEventListeners = () => {
        document.addEventListener("keyup", this.keyHandler);
    }
}

module.exports = Game;