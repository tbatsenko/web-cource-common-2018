import MineSweeper, { Controller } from './MineSweeper'

const g = new MineSweeper(10)

for (let i = 0; i < g.field.size(); ++i)
  for (let j = 0; j < g.field.size(); ++j) {
    const el = Controller.getCellView(i, j, g.field.size())
    el.addEventListener('contextmenu', function(ev) {
      ev.preventDefault()
      if (g.ended) return
      let [i, j] = Controller.getCellIndex(el, g.field.size())
      g.flag(i, j)
    })
    el.addEventListener('click', function(ev) {
      ev.preventDefault()
      if (g.ended) return
      let [i, j] = Controller.getCellIndex(el, g.field.size())
      g.discover(i, j)
    })
  }
