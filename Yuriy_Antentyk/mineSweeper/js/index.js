import game from "./game"
import utilities from "./utilities"

const fieldSize = 10
const minesCnt = 10

document.documentElement.style.setProperty('--field-size', fieldSize)
const fieldView = document.getElementById("field")

const g = new game.Game(fieldSize, minesCnt)

const render = () => {fieldView.innerHTML = g.field.toHTML()}
render()

const bindDiscover = (i, j) => {g.discover(i, j)}
const bindFlag = (i, j) => {g.flag(i, j)}

const handleMove = (ev, action) => {
    ev.preventDefault()

    if(g.checkLose() || g.checkWin())
        return

    const index = utilities.getIndexOfDOMNode(ev.target)
    const i = Math.floor(index / fieldSize), j = index % fieldSize

    action(i, j)

    render()

    if(!(g.checkLose() || g.checkWin()))
        return

    if(g.checkLose()){
        g.discoverAllMines()
        render()
    }

    alert(g.checkWin()? "You won!" : "You lost!")
}

const click = fieldView.addEventListener("click", (ev) => handleMove(ev, bindDiscover))
const contextmenu = fieldView.addEventListener("contextmenu", (ev) => handleMove(ev, bindFlag))
const restart = document.getElementById("restart").addEventListener("click", (ev) => {
    g.restart(fieldSize, minesCnt)
    render()
})
