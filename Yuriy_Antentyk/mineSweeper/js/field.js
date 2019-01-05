import utilities from "./utilities"
import bem from "./bem"
import cell_module from "./cell"

class Field{
    constructor(size, minesCnt){
        this.__size = size
        minesCnt = Math.min(minesCnt, size * size)

        this.__cells = utilities.get2dArray(size, size, undefined)
        for(let i = 0; i < size; ++i)
            for(let j = 0; j < size; ++j)
                this.__cells[i][j] = new cell_module.Cell(false, false, false, 0)
        
        while(minesCnt > 0){
            let i = utilities.getRandomInt(0, size - 1), j = utilities.getRandomInt(0, size - 1)
            if(this.getCell(i, j).mined)
                continue
            this.getCell(i, j).mined = true
            --minesCnt
        }

        for(const {i, j, cell} of this)
            cell.surroundingMines = this.getNeighbors(i, j).map(entry => (entry.cell.mined? 1: 0)).reduce((a, b) => a + b, 0)
    }

    get size(){return this.__size}

    getCell(i, j){return this.__cells[i][j]}

    getNeighbors(i, j){
        const valid = (i, j) => {return i >= 0 && i < this.size && j >= 0 && j < this.size}

        const di = [-1, -1, -1, 0, 1, 1, 1, 0]
        const dj = [-1, 0, 1, 1, 1, 0, -1, -1]

        const res = []
        for(let d = 0; d < di.length; ++d){
            let ni = i + di[d], nj = j + dj[d]
            if(!valid(ni, nj))
                continue
            res.push({i: ni, j: nj, cell: this.getCell(ni, nj)})
        }

        return res
    }

    *[Symbol.iterator]() {
        for(let i = 0; i < this.size; ++i)
            for(let j = 0; j < this.size; ++j)
                yield {i: i, j: j, cell: this.getCell(i, j)}
    }

    toHTML(){
        const inner = Array.from(this).map(obj => obj.cell).map(cell => cell.toHTML()).join("")
        return `<div class='${bem.b({})}'>` + inner + `</div>`
    }
}

export default {Field}
