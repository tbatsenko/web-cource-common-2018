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
      if (data[i]['men'] > maxMen) {
        maxMen = data[i]['men']
      }
      if (data[i]['women'] > maxWomen) {
        maxWomen = data[i]['women']
      }
    }

    return [maxMen, maxWomen]
  }

  dataPreparation() {
    this.dataMale = []
    this.dataFemale = []
    this.staticDataMale = []
    this.staticDataFemale = []

    const dynamic_data = this.data.filter(
      row => row['year'] === this.activeYear
    )
    const static_data = this.data.filter(row => row['year'] === 1989)

    for (let i = 0; i < 80; i++) {
      this.dataMale.push({ age: i, population: dynamic_data[i]['men'] })
      this.dataFemale.push({ age: i, population: dynamic_data[i]['women'] })
      this.staticDataMale.push({ age: i, population: static_data[i]['men'] })
      this.staticDataFemale.push({
        age: i,
        population: static_data[i]['women'],
      })
    }
  }

  makeScales(width, height) {
    this.xScaleFemale = scaleLinear({
      range: [this.xMax, 0],
      domain: extent(this.staticDataFemale, this.x),
    })

    this.xScaleMale = scaleLinear({
      range: [0, this.xMax],
      domain: extent(this.staticDataMale, this.x),
    })

    this.yScaleFemale = scaleLinear({
      range: [this.yMax, this.yMin],
      domain: [0, this.maxWomen],
    })

    this.yScaleMale = scaleLinear({
      range: [this.yMax, this.yMin],
      domain: [0, this.maxMen],
    })

    this.yScaleAxis = scaleLinear({
      range: [height - 3, 5],
      domain: [0, 80],
    })

    this.xScaleMaleAxis = scaleLinear({
      range: [0, width],
      domain: [this.maxMen * 1.33, 0],
    })
    this.xScaleFemaleAxis = scaleLinear({
      range: [0, width],
      domain: [0, this.maxWomen * 1.33],
    })
  }

  render() {
    const { data, activeYear, chart_width } = this.props.state
    this.data = data
    this.activeYear = activeYear

    const width = chart_width / 2
    const height = chart_width / 2
    const axis_size = 50

    const maxValues = this.findMaxValues()
    this.maxMen = maxValues[0]
    this.maxWomen = maxValues[1]

    this.dataPreparation()

    this.x = d => d.age
    this.y = d => d.population

    this.xMax = width // - margin.left - margin.right
    this.yMax = height // - margin.top - margin.bottom
    this.yMin = height / 4

    this.makeScales(width, height)

    return (
      <div className={'chart'}>
        <svg height={height} width={axis_size} className={'svg'}>
          <AxisLeft
            scale={this.yScaleAxis}
            top={0}
            left={axis_size}
            stroke={'white'}
          />
        </svg>

        <svg width={width} height={height} className="svg male">
          <AreaClosed
            data={this.dataMale}
            x={d => this.xScaleMale(d.age)}
            y0={this.yScaleMale(0)}
            y={d => this.yScaleMale(d.population)}
            fill={'#e45f4d'}
            stroke={'#e45f4d'}
            curve={curveMonotoneX}
            opacity={0.8}
          />

          <AreaClosed
            data={this.staticDataMale}
            x={d => this.xScaleMale(d.age)}
            y0={this.yScaleMale(0)}
            y={d => this.yScaleMale(d.population)}
            fill={'#e45f4d'}
            stroke={'#e45f4d'}
            curve={curveMonotoneX}
            opacity={0.5}
          />
        </svg>
        <svg width={width} height={height} className="svg female">
          <AreaClosed
            data={this.dataFemale}
            x={d => this.xScaleFemale(d.age)}
            y0={this.yScaleFemale(0)}
            y={d => this.yScaleFemale(d.population)}
            fill={'#489ea3'}
            stroke={'#489ea3'}
            curve={curveMonotoneX}
            opacity={0.8}
          />
          <AreaClosed
            data={this.staticDataFemale}
            x={d => this.xScaleFemale(d.age)}
            y0={this.yScaleFemale(0)}
            y={d => this.yScaleFemale(d.population)}
            fill={'#489ea3'}
            stroke={'#489ea3'}
            curve={curveMonotoneX}
            opacity={0.5}
          />
        </svg>

        <svg height={height} width={axis_size} className={'svg'}>
          <AxisRight
            scale={this.yScaleAxis}
            top={0}
            left={0}
            stroke={'white'}
          />
        </svg>

        <div className={'chart__bottom-axis'}>
          <svg
            height={axis_size}
            width={width * 2 + axis_size}
            className={'svg'}
          >
            <AxisBottom
              left={axis_size}
              scale={this.xScaleMaleAxis}
              numTicks={5}
            />
            <AxisBottom
              left={axis_size + width}
              scale={this.xScaleFemaleAxis}
              numTicks={5}
            />
          </svg>
        </div>
      </div>
    )
  }
}

export default Chart
