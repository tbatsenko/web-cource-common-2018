class Cell{
    constructor(discovered, flagged, mined, surroundingMines){
        this.discovered = discovered
        this.flagged = flagged
        this.mined = mined
        this.surroundingMines = surroundingMines
    }

    toHTML(){
        const res = {element: "cell"}
        res.opened = this.discovered
        res.closed = !this.discovered
        res.flagged = this.flagged
        res.bombed = this.discovered && this.mined
        if(this.discovered && !this.mined && this.surroundingMines > 0)
            res.number = this.surroundingMines
        const txt = this.surroundingMines > 0 && this.discovered && !this.mined? String(this.surroundingMines): ""
        return `<div class='${b(res)}'>${txt}</div>`
    }
}
