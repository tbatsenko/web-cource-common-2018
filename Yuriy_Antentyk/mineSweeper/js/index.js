const fieldSize = 10
const minesCnt = 10

document.documentElement.style.setProperty('--field-size', fieldSize)
fieldView = document.getElementById("field")

const game = new Game(fieldSize, minesCnt)

const render = () => {fieldView.innerHTML = game.field.toHTML()}
render()

const bindDiscover = (i, j) => {game.discover(i, j)}
const bindFlag = (i, j) => {game.flag(i, j)}

const handleMove = (ev, action) => {
    ev.preventDefault()

    if(game.checkLose() || game.checkWin())
        return

    const index = getIndexOfDOMNode(ev.target)
    const i = Math.floor(index / fieldSize), j = index % fieldSize

    action(i, j)

    render()

    if(!(game.checkLose() || game.checkWin()))
        return

    if(game.checkLose()){
        game.discoverAllMines()
        render()
    }

    alert(game.checkWin()? "You won!" : "You lost!")
}

const click = fieldView.addEventListener("click", (ev) => handleMove(ev, bindDiscover))
const contextmenu = fieldView.addEventListener("contextmenu", (ev) => handleMove(ev, bindFlag))
const restart = document.getElementById("restart").addEventListener("click", (ev) => {
    game.restart(fieldSize, minesCnt)
    render()
})