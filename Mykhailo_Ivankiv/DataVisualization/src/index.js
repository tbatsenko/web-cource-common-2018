import {
  select,
  range,
  scaleLinear,
  line,
  curveBasis,
  curveStepBefore,
  axisBottom,
} from 'd3'

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const svg = select('svg')

const data = [
  { color: '#FE4339', weight: 130, height: 130, rating: 50 },
  { color: '#E3F24F', weight: 40, height: 170, rating: 80 },
  { color: '#0018fe', weight: 83, height: 183, rating: 0 },
  { color: '#ABFE29', weight: 50, height: 210, rating: 99 },
]

const weightScale = scaleLinear()
  .domain([30, 140])
  .range([20, 50])

const heightScale = scaleLinear()
  .domain([100, 300])
  .range([0, 500])

const eticRatingScale = scaleLinear()
  .domain([0, 100])
  .range([0, 500])

const ratingAxis = axisBottom(eticRatingScale)

const dataAndElements = svg
  .select('g')

  .selectAll('circle')
  .data(data)

const ratingLine = line()
  .x(({ height }) => heightScale(height))
  .y(({ rating }) => eticRatingScale(rating))
  .curve(curveStepBefore)

const enter = dataAndElements
  .enter()
  .append('g')
  .attr(
    'transform',
    ({ height, rating }) =>
      `translate(${heightScale(height)} , ${eticRatingScale(rating)})`
  )

enter.append('circle')
enter.append('text')

svg
  .select('g')
  .append('path')
  .attr('d', () => ratingLine(data))
  .attr('stroke', 'black')
  .attr('stroke-width', 5)
  .attr('fill', 'none')

svg
  .select('g')
  .selectAll('circle')
  .attr('r', ({ weight }) => weightScale(weight))
  .attr('fill', ({ color }) => color)

svg
  .select('g')
  .selectAll('text')
  .attr('dx', -10)
  .attr('dy', 5)
  .text(({ weight }) => weight)

svg.call(ratingAxis)

dataAndElements.exit().remove()
