import React, { Component } from 'react'
import {
  withParentSize,
  AxisBottom,
  AxisLeft,
  Group,
  AreaClosed,
  Grid,
  LinePath,
} from '@vx/vx'

import './Chart.scss'
import BEM from '../../helpers/BEM'
import { curveMonotoneX, extent, scaleLinear } from 'd3'

const b = BEM('Chart')

class Chart extends Component {
  static defaultProps = {
    margins: {
      top: 40,
      left: 80,
      right: 40,
      bottom: 60,
    },
  }
  constructor(props) {
    super(props)
    const { data, parentHeight, parentWidth, margins, countDomain } = props

    const width = parentWidth - margins.left - margins.right
    const height = parentHeight - margins.top - margins.bottom

    const yScale = scaleLinear()
      .range([height, 0])
      .domain(countDomain)

    const xScale = scaleLinear()
      .range([0, width])
      .domain([0, 79])

    this.state = {
      yScale,
      xScale,
      width,
      height,
    }
  }

  render() {
    const { parentHeight, parentWidth, margins, data, staticData } = this.props
    const { yScale, xScale, width, height } = this.state

    return (
      <svg height={parentHeight} width={parentWidth} className={b()}>
        <Group left={margins.left} top={margins.top}>
          <AxisBottom top={height} scale={xScale} />
          <AxisLeft scale={yScale} />

          <Grid
            className={b('grid')}
            yScale={yScale}
            xScale={xScale}
            width={width}
            height={height}
          />

          <Group className={b('dynamic')}>
            <AreaClosed
              className={b('chart-area', ['men'])}
              data={data}
              x={({ age }) => xScale(age)}
              y0={({ men }) => yScale(men)}
              y1={({ men, women }) =>
                men > women ? yScale(men) : yScale(women)
              }
              yScale={yScale}
              curve={curveMonotoneX}
            />
            <LinePath
              className={b('chart-line', ['men'])}
              data={data}
              x={({ age }) => xScale(age)}
              y={({ men, women }) =>
                men > women ? yScale(men) : yScale(women)
              }
              curve={curveMonotoneX}
            />

            <AreaClosed
              className={b('chart-area', ['women'])}
              data={data}
              x={({ age }) => xScale(age)}
              y0={({ women }) => yScale(women)}
              y1={({ men, women }) =>
                women > men ? yScale(women) : yScale(men)
              }
              yScale={yScale}
              curve={curveMonotoneX}
            />
            <LinePath
              className={b('chart-line', ['women'])}
              data={data}
              x={({ age }) => xScale(age)}
              y={({ men, women }) => yScale(women)}
              curve={curveMonotoneX}
            />
          </Group>

          <Group className={b('static')}>
            <AreaClosed
              className={b('chart-area', ['men'])}
              data={staticData}
              x={({ age }) => xScale(age)}
              y0={({ men, women }) => yScale(women)}
              y1={({ men, women }) =>
                men > women ? yScale(men) : yScale(women)
              }
              yScale={yScale}
              curve={curveMonotoneX}
            />
            <LinePath
              className={b('chart-line', ['men'])}
              data={staticData}
              x={({ age }) => xScale(age)}
              y={({ men, women }) =>
                men > women ? yScale(men) : yScale(women)
              }
              curve={curveMonotoneX}
            />

            <AreaClosed
              className={b('chart-area', ['women'])}
              data={staticData}
              x={({ age }) => xScale(age)}
              y0={({ men }) => yScale(men)}
              y1={({ men, women }) =>
                women > men ? yScale(women) : yScale(men)
              }
              yScale={yScale}
              curve={curveMonotoneX}
            />
            <LinePath
              className={b('chart-line', ['women'])}
              data={staticData}
              x={({ age }) => xScale(age)}
              y={({ men, women }) =>
                women > men ? yScale(women) : yScale(men)
              }
              curve={curveMonotoneX}
            />
          </Group>
        </Group>
      </svg>
    )
  }
}

export default withParentSize(Chart)
