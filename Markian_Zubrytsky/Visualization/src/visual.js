let svgWidth = 900
let svgHeight = 900

let graphWidth = svgWidth - 30
let graphHeight = svgHeight - 30
let barWidth = (graphHeight / 80)

let datan = []

let y_data = [0, 20, 40, 60, 80]
let x_data = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000]

let currentYear = 1991
let sex = 'men'

function updateYear(val) {
  currentYear = val
  document.getElementById('year').innerHTML = 'Population increase from 1990 to ' + currentYear
  redrawGraph(graph, datan, currentYear - 1989, sex)
}

function toggleState(item) {
  if (item.className === 'sex-selector__male') {
    item.className = 'sex-selector__female'
    item.value = 'Female'
    sex = 'women'
  } else {
    item.className = 'sex-selector__male'
    item.value = 'Male'
    sex = 'men'
  }
  redrawGraph(graph, datan, currentYear - 1989, sex)
}

function setup() {
  let svg = d3.select('svg').attr('width', svgWidth).attr('height', svgHeight)

  xScale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([0, svgWidth])
  yScale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([svgHeight, 0])

  let x_axis = d3.axisBottom().scale(xScale)
  let y_axis = d3.axisLeft().scale(yScale)
  let xAxisTranslate = svgHeight - 20

  svg.append('g').attr('transform', 'translate(50, 10)').call(y_axis).select('.domain').remove()
  svg.append('g').attr('transform', 'translate(50,' + xAxisTranslate + ')').call(x_axis).select('.domain').remove()

  createMarkers(svg)

  return setupGraph(svg)

}

function createMarkers(svg) {
  let defs = svg.append('defs')

  let arrow = defs.append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', '5')
    .attr('refY', '5')
    .attr('markerWidth', '6')
    .attr('markerHeight', '6')
    .attr('orient', 'auto-start-reverse')

  let circle = defs.append('marker')
    .attr('id', 'dot')
    .attr('viewBox', '0 0 12 12')
    .attr('refX', '5')
    .attr('refY', '5')
    .attr('markerWidth', '10')
    .attr('markerHeight', '10')


  arrow.append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z')

  circle.append('circle')
    .attr('class', 'marker__arrow-ending')
    .attr('cx', '5')
    .attr('cy', '5')
    .attr('r', '3')
}

function setupGraph(svg) {
  return svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', 'translate(30, 0)')
}

function drawGraph(graph, arr, year, sex) {
  let data1 = arr[1]
  let data2 = arr[year]

  let barChar = graph.selectAll('polyline')
    .data(data1)
    .enter()
    .append('polyline')
    .attr('class', 'graph-bar')
    .attr('points', function(d1, d2) {
      let x1 = xScale(d1[sex])
      let x2 = x1 + xScale(data2[d2][sex] - d1[sex])
      let y = (graphHeight - barWidth * d2)
      return '' + x1 + ',' + y + ' ' + x2 + ',' + y
    })
}

function redrawGraph(graph, arr, year, sex) {
  let data2 = arr[year]
  let barChar = graph.selectAll('polyline')
    .attr('points', function(d1, d2) {
      let x1 = xScale(d1[sex])
      let x2 = x1 + xScale(data2[d2][sex] - d1[sex])
      let y = (graphHeight - barWidth * d2)
      return '' + x1 + ',' + y + ' ' + x2 + ',' + y
    })
}

let csvdata = d3.csv('data.csv')
let graph
let xScale, yScale
csvdata = csvdata.then(function(data) {
  let temp = []
  let yr = data[0].year
  data.forEach(function(d) {
    if (d.year === yr) {
      temp.push(d)
    } else {
      datan.push(temp)
      yr = d.year
      temp = []
      temp.push(d)
    }
  })
  graph = setup()
  drawGraph(graph, datan, currentYear - 1989, sex)
})