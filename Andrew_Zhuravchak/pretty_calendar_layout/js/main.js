import Calendar from './Calendar.js'

const render = async (templateSrc, dataSrc, conteiner) => {
  const templateStr = await (await fetch(templateSrc)).text()
  const data = await (await fetch(dataSrc)).json()
  const compiled = Handlebars.compile(templateStr)
  conteiner.innerHTML = compiled(data)
}

const renderPage = async () => {
  await render('templates/layout.hbs', 'data/calendar.json', document.getElementById('content'))
  await render('templates/sidebar.hbs', 'data/calendar.json', document.getElementById('sidebar'))
  await render('templates/main-section.hbs', 'data/calendar.json', document.getElementById('main-section'))
  // await render('templates/calendar.hbs', 'data/calendar.json', document.getElementById('calendar'))
}

renderPage().then(() => {
  let calendar = new Calendar('calendar')
})