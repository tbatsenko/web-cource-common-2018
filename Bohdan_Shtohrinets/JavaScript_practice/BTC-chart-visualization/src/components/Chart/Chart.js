import React, { Component } from 'react'

import { scaleLinear, scaleTime } from '@vx/scale'
import { LinePath, Bar, Line } from '@vx/shape'
import { withScreenSize } from '@vx/responsive'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { curveNatural } from '@vx/curve'

import { extent, max, min, bisector } from 'd3-array'
import { timeFormat } from 'd3-time-format'

import './Chart.css'

import { localPoint } from '@vx/event'


class Chart extends Component {
  static defaultProps = {
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  }

  constructor(props) {
    super(props)
    const { data, width, height, margin } = props

    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    const xSelector = d => new Date(d.time)
    const ySelector = d => d.price

    const xScale = scaleTime({
      range: [margin.left + margin.right, xMax],
      domain: extent(data, xSelector),
    })

    const maxDataValue = max(data, ySelector)
    const minDataValue = min(data, ySelector)

    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [minDataValue - 1000, maxDataValue + 1000],
    })

    this.state = {
      xScale,
      yScale,
      xSelector,
      ySelector,
      yMax,
    }
  }

  handleToolTip = ({ event, data, xSelector, ySelector, xScale, yScale }) => {
    const { showTooltip } = this.props
    const { x } = localPoint(event)

    const bisectDate = bisector(xSelector).left

    const x0 = xScale.invert(x)
    const index = bisectDate(data, x0, 1)

    const d0 = data[index - 1]
    const d1 = data[index]

    let d = d0
    if (d1 && d1.date) {
      d = x0 - xSelector(d0) > xSelector(d1) - x0 ? d1 : d0
    }

    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(xSelector(d)),
      tooltipTop: yScale(ySelector(d)),
    })
  }


  render() {
    const {
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      data,
      width,
      height,
    } = this.props
    const { xScale, yScale, xSelector, ySelector, yMax } = this.state

    const formatDate = timeFormat('%b %d, \'%y')

    return (
      <div className='Chart'>
        <svg width={width} height={height - 85}>
          <AxisLeft
            scale={yScale}
            top={0}
            left={100}
            numTicks={4}
            stroke='#2c3e50'
            strokeWidth={2}
            tickLabelProps={(value, index) => ({
              fontSize: 11,
              fill: '#2c3e50',
              textAnchor: 'end',
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>Price ($){formattedValue}</text>
            )}
          />
          <AxisLeft
            scale={yScale}
            top={0}
            left={width - 100}
            numTicks={4}
            stroke='#2c3e50'
            strokeWidth={2}
            tickLabelProps={(value, index) => ({
              dx: '10px',
              fontSize: 11,
              fill: '#2c3e50',
              textAnchor: 'start',
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>   {formattedValue}</text>
            )}
          />
          <AxisBottom
            top={654}
            data={data}
            scale={xScale}
            x={xSelector}
            numTicks={5}
            stroke='#2c3e50'
            strokeWidth={2}
            tickLabelProps={(value, index) => ({
              fontSize: 11,
              fill: '#2c3e50',
              textAnchor: 'end',
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>{formattedValue}</text>
            )}
          />
          <AxisBottom
            top={0}
            data={data}
            scale={xScale}
            x={xSelector}
            numTicks={5}
            stroke='#2c3e50'
            strokeWidth={3}
            tickLabelProps={(value, index) => ({
              fontSize: 11,
              fill: '#2c3e50',
              textAnchor: 'start',
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>{formattedValue}</text>
            )}
          />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={xSelector}
            y={ySelector}
            strokeWidth={5}
            stroke="#2980b9"
            strokeOpacity="0.8"
            strokeLinecap="round"
            fill="transparent"
            curve={curveNatural}
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height - 85}
            fill='transparent'
            data={data}
            onMouseMove={data => event =>
              this.handleToolTip({
                event,
                data,
                xSelector,
                ySelector,
                xScale,
                yScale,
              })}
            onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke="#2ecc71"
                strokeWidth={5}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="4,6"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={5}
                fill="#5C77EB"
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft - 105}
              style={{
                backgroundColor: '#5C77EB',
                color: '#FFF',
              }}
            >
              {`$${ySelector(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={yMax - 50}
              left={tooltipLeft + 50}
              style={{
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                color: '#000',
              }}
            >
              {formatDate(xSelector(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    )
  }
}


export default withScreenSize(withTooltip(Chart))