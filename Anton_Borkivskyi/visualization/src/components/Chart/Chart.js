import { Component } from 'react'
import React from 'react'

import { extent, curveMonotoneX } from 'd3'
import {
  scaleLinear,
  AreaClosed,
  AxisLeft,
  AxisBottom,
  AxisRight,
} from '@vx/vx'

import './Chart.css'

class Chart extends Component {
  findMaxValues() {
    const { data } = this.props.state

    let maxMen = 0
    let maxWomen = 0
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i])
      if (data[i]['men'] > maxMen) {
        maxMen = data[i]['men']
      }
      if (data[i]['women'] > maxWomen) {
        maxWomen = data[i]['women']
      }
    }

    return [maxMen, maxWomen]
  }

  render() {
    const { data, activeYear, chart_width } = this.props.state

    // const width = 400
    const width = chart_width / 2
    const height = chart_width / 2
    const axis_size = 50
    let maxValues = this.findMaxValues()
    const maxMen = maxValues[0]
    const maxWomen = maxValues[1]
    const dataMale = []
    const dataFemale = []
    const staticDataMale = []
    const staticDataFemale = []

    const dynamic_data = data.filter(row => row['year'] === activeYear)
    const static_data = data.filter(row => row['year'] === 1989)

    for (let i = 0; i < 80; i++) {
      dataMale.push({ age: i, population: dynamic_data[i]['men'] })
      dataFemale.push({ age: i, population: dynamic_data[i]['women'] })
      staticDataMale.push({ age: i, population: static_data[i]['men'] })
      staticDataFemale.push({ age: i, population: static_data[i]['women'] })
    }

    const x = d => d.age
    const y = d => d.population

    const xMax = width // - margin.left - margin.right
    const yMax = height // - margin.top - margin.bottom
    const yMin = height / 4

    const xScaleFemale = scaleLinear({
      range: [xMax, 0],
      domain: extent(staticDataFemale, x),
    })

    const xScaleMale = scaleLinear({
      range: [0, xMax],
      domain: extent(staticDataMale, x),
    })

    const yScaleFemale = scaleLinear({
      range: [yMax, yMin],
      domain: [0, maxWomen],
    })

    const yScaleMale = scaleLinear({
      range: [yMax, yMin],
      domain: [0, maxMen],
    })

    const yScaleAxis = scaleLinear({
      range: [height - 3, 5],
      domain: [0, 80],
    })

    const xScaleMaleAxis = scaleLinear({
      range: [0, width],
      domain: [maxMen * 1.33, 0],
    })
    const xScaleFemaleAxis = scaleLinear({
      range: [0, width],
      domain: [0, maxWomen * 1.33],
    })

    return (
      <div className={'chart'}>
        <svg height={height} width={axis_size} className={'svg'}>
          <AxisLeft
            scale={yScaleAxis}
            top={0}
            left={axis_size}
            stroke={'white'}
          />
        </svg>

        <svg width={width} height={height} className="svg male">
          <AreaClosed
            data={dataMale}
            x={d => xScaleMale(d.age)}
            y0={yScaleMale(0)}
            y={d => yScaleMale(d.population)}
            fill={'#e45f4d'}
            stroke={'#e45f4d'}
            curve={curveMonotoneX}
            opacity={0.8}
          />

          <AreaClosed
            data={staticDataMale}
            x={d => xScaleMale(d.age)}
            y0={yScaleMale(0)}
            y={d => yScaleMale(d.population)}
            fill={'#e45f4d'}
            stroke={'#e45f4d'}
            curve={curveMonotoneX}
            opacity={0.5}
          />
        </svg>
        <svg width={width} height={height} className="svg female">
          <AreaClosed
            data={dataFemale}
            x={d => xScaleFemale(d.age)}
            y0={yScaleFemale(0)}
            y={d => yScaleFemale(d.population)}
            fill={'#489ea3'}
            stroke={'#489ea3'}
            curve={curveMonotoneX}
            opacity={0.8}
          />
          <AreaClosed
            data={staticDataFemale}
            x={d => xScaleFemale(d.age)}
            y0={yScaleFemale(0)}
            y={d => yScaleFemale(d.population)}
            fill={'#489ea3'}
            stroke={'#489ea3'}
            curve={curveMonotoneX}
            opacity={0.5}
          />
        </svg>

        <svg height={height} width={axis_size} className={'svg'}>
          <AxisRight scale={yScaleAxis} top={0} left={0} stroke={'white'} />
        </svg>

        <div className={'chart__bottom-axis'}>
          <svg
            height={axis_size}
            width={width * 2 + axis_size}
            className={'svg'}
          >
            <AxisBottom left={axis_size} scale={xScaleMaleAxis} numTicks={5} />
            <AxisBottom
              left={axis_size + width}
              scale={xScaleFemaleAxis}
              numTicks={5}
            />
          </svg>
        </div>
      </div>
    )
  }
}

export default Chart
