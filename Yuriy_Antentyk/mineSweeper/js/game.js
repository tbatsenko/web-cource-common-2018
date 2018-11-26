class Game{
    restart(fieldSize, minesCnt){this.field = new Field(fieldSize, minesCnt)}
    constructor(fieldSize, minesCnt){this.restart(fieldSize, minesCnt)}

    checkLose(){return Array.from(this.field).map(obj => obj.cell).filter(cell => (cell.mined && cell.discovered)).length > 0}

    checkWin(){return Array.from(this.field).map(obj => obj.cell).filter(cell => (cell.mined && !cell.flagged)).length === 0}

    flag(i, j){
        const cell = this.field.getCell(i, j)
        cell.flagged = cell.discovered ? false: cell.flagged ? false: true
    }

    discover(i, j){
        const cell = this.field.getCell(i, j)
        if(cell.flagged)
            return
        this.__discover(i, j)
    }

    __discover(ti, tj){
        const cell = this.field.getCell(ti, tj)

        if(cell.discovered)
            return
        cell.discovered = true
        if(cell.mined || cell.surroundingMines > 0)
            return
        
        for(const {i, j, cell} of this.field.getNeighbors(ti, tj))
            this.__discover(i, j)
    }

    discoverAllMines(){
        for(const {i, j, cell} of this.field)
            cell.discovered = (cell.discovered || cell.mined)
    }
}
