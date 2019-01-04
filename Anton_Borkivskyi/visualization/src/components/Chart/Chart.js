import { Component } from 'react'
import React from 'react'
import { scaleLinear } from '@vx/vx'
import { extent, max, curveMonotoneX } from 'd3'
import { AreaClosed, Group, LinePath } from '@vx/vx'
import { csvParse } from 'd3'

import { AxisLeft, AxisBottom } from '@vx/vx'

import './Chart.css'

class Chart extends Component {

  render() {
    const { data, activeYear } = this.props.state

    const width = 800
    const height = 400

    const dataMale = []
    const dataFemale = []
    const staticDataMale = []
    const staticDataFemale = []

    const dynamic_data = data.filter((row) => row['year'] === activeYear)
    const static_data = data.filter((row) => row['year'] === 1989)

    for (let i = 0; i < 80; i++) {
      dataMale.push({ age: i, population: dynamic_data[i]['men'] })
      dataFemale.push({ age: i, population: dynamic_data[i]['women'] })
      staticDataMale.push({ age: i, population: static_data[i]['men'] })
      staticDataFemale.push({ age: i, population: static_data[i]['women'] })
    }


    const x = d => d.age
    const y = d => d.population


    const margin = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }

    const xMax = width / 2 // - margin.left - margin.right
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
      domain: [0, max(staticDataFemale, y)],
    })

    const yScaleMale = scaleLinear({
      range: [yMax, yMin],
      domain: [0, max(staticDataMale, y)],
    })

    return (
      <div className={'chart'}>
        <svg width={width / 2} height={height} className="svg male">

          <AreaClosed
            data={dataMale}

            x={(d) => xScaleMale(d.age)}
            y0={yScaleMale(0)}
            y={(d) => yScaleMale(d.population)}

            fill={'#e45f4d'}
            stroke={'#e45f4d'}
            curve={curveMonotoneX}
            opacity={0.8}
          />

          <AreaClosed
            data={staticDataMale}

            x={(d) => xScaleMale(d.age)}
            y0={yScaleMale(0)}
            y={(d) => yScaleMale(d.population)}

            fill={'#e45f4d'}
            stroke={'#e45f4d'}
            curve={curveMonotoneX}

            opacity={0.4}
          />

        </svg>
        <svg width={width / 2} height={height} className="svg female">

          <AreaClosed
            data={dataFemale}

            x={(d) => xScaleFemale(d.age)}
            y0={yScaleFemale(0)}
            y={(d) => yScaleFemale(d.population)}

            fill={'#489ea3'}
            stroke={'#489ea3'}
            curve={curveMonotoneX}
            opacity={0.8}
          />
          <AreaClosed
            data={staticDataFemale}

            x={(d) => xScaleFemale(d.age)}
            y0={yScaleFemale(0)}
            y={(d) => yScaleFemale(d.population)}

            fill={'#489ea3'}
            stroke={'#489ea3'}
            curve={curveMonotoneX}
            opacity={0.4}
          />

        </svg>
      </div>
    )
  }
}

export default Chart


