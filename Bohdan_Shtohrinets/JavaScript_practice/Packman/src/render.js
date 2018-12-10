import {pacmanRotation} from './check'

let visitedFrames = {}

const renderCell = (cellNumber, pacmanDirection) => {
    if (cellNumber === 0)
        return `<div class="game__cell game__cell_wall"></div>`

    else if (cellNumber === 1)
        return pacmanRotation(pacmanDirection)

    else if (cellNumber === 2)
        return `<div class="game__cell ghost">
                <div class="ghost__eyes"></div>
            </div>`

    else if (cellNumber === 3)
        return `<div class="game__cell game__cell_with-coin"></div>`

    return `<div class="game__cell"></div>`
}

const renderField = (field, container, direction = []) => {
    let counter = 0
    container.innerHTML = `
        <div class="game">
        <div class="game__field">
        ${field
        .map(
            (row) => {
                let result = []
                for (let i = 0; i < row.length; i++) {
                    if (visitedFrames.hasOwnProperty([counter, i].join("")) && row[i] > 2)
                        result.push(renderCell(4, direction))
                    else
                        result.push(renderCell(row[i], direction))
                }

                counter++
                return `<div class="game__row">${result.join('')}</div>`
            }
        )
        .join('')}
        </div>
         <h1 class="game__score">Score: ${Object.keys(visitedFrames).length}</h1>
        </div>
    `
}

export default renderField
export {visitedFrames}