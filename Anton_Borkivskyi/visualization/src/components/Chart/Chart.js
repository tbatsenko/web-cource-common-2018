import { Component } from 'react'
import React from 'react'

import { extent, curveMonotoneX, min, max } from 'd3'
import {
  scaleLinear,
  AreaClosed,
  AxisLeft,
  AxisBottom,
  AxisRight,
  GridRows,
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

  makeScales() {
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
      range: [this.height - 3, 5],
      domain: [
        min(this.staticDataMale, this.x),
        max(this.staticDataMale, this.x) + 1,
      ],
    })

    this.xScaleMaleAxis = scaleLinear({
      range: [0, this.width],
      domain: [this.maxMen * 1.33, 0],
    })
    this.xScaleFemaleAxis = scaleLinear({
      range: [0, this.width],
      domain: [0, this.maxWomen * 1.33],
    })
    this.xScaleFemaleAxisInv = scaleLinear({
      range: [0, this.width],
      domain: [this.maxWomen * 1.33, 0],
    })
  }

  render() {
    const { data, activeYear, chart_width } = this.props.state
    this.data = data
    this.activeYear = activeYear

    this.width = chart_width / 2
    this.height = chart_width / 2
    const axis_size = 50

    const maxValues = this.findMaxValues()
    this.maxMen = maxValues[0]
    this.maxWomen = maxValues[1]

    this.dataPreparation()

    this.x = d => d.age
    this.y = d => d.population

    this.xMax = this.width // - margin.left - margin.right
    this.yMax = this.height // - margin.top - margin.bottom
    this.yMin = this.height / 4
    this.makeScales()

    return (
      <div className={'chart'}>
        <svg height={this.height} width={axis_size}>
          <AxisLeft
            scale={this.yScaleAxis}
            top={0}
            left={axis_size}
            stroke={'white'}
          />
        </svg>

        <svg width={this.width} height={this.height}>
          {/*<g style={{ transform: 'rotate(45deg)' }}>*/}
          <g transform="rotate(-90 200 200)">
            <GridRows
              lineStyle={{ pointerEvents: 'none' }}
              scale={this.xScaleMaleAxis}
              width={this.xMax}
              stroke="grey"
              numTicks={5}
            />

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
          </g>
        </svg>
        <svg width={this.width} height={this.height}>
          <g transform="rotate(90 200 200)">
            <GridRows
              lineStyle={{ pointerEvents: 'none' }}
              scale={this.xScaleFemaleAxisInv}
              width={this.xMax}
              stroke="grey"
              numTicks={5}
              // top={-0.57 * axis_size}
              top={0}
            />

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
          </g>
        </svg>

        <svg height={this.height} width={axis_size}>
          <AxisRight
            scale={this.yScaleAxis}
            top={0}
            left={0}
            stroke={'white'}
          />
        </svg>
        <div className={'chart__bottom-axis'}>
          <svg height={axis_size} width={this.width * 2 + axis_size}>
            <AxisBottom
              left={axis_size}
              scale={this.xScaleMaleAxis}
              numTicks={5}
              tickFormat={this.xScaleMaleAxis.tickFormat(5, 's')}
            />
            <AxisBottom
              left={axis_size + this.width}
              scale={this.xScaleFemaleAxis}
              numTicks={5}
              tickFormat={this.xScaleFemaleAxis.tickFormat(5, 's')}
            />
          </svg>
        </div>
      </div>
    )
  }
}

export default Chart
