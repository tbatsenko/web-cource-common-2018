import React, { Component } from 'react';

import './Chart.scss';

import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinePath, Bar } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { PatternLines } from '@vx/pattern';

import BEM from '../../helpers/BEM';

const b = BEM('Chart');

// accessors
const x = d => d.index;
const y = d => d.value;

// responsive utils for axis ticks
function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

class Chart extends Component {
  constructor(props) {
    super(props);

    const { ecgData, sampleRate } = props;

    const axeSize = 50;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 },
      width = 1000,
      height = 150;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleLinear({
      range: [0, xMax],
      domain: [0, ecgData.length - 1],
    });
    const xScaleBottomAxes = scaleLinear({
      range: [0, xMax],
      domain: [0, (ecgData.length - 1) / sampleRate],
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [Math.min(...ecgData), Math.max(...ecgData)],
      nice: true,
    });

    this.state = {
      yScale,
      xScale,
      xScaleBottomAxes,
      width,
      height,
      axeSize,
      margin,
      yMax,
      xMax,
    };
  }
  reformatData(rawData) {
    let data = [];

    for (let i = 0; i < rawData.length; ++i) {
      data.push({ index: i, value: rawData[i] });
    }
    return data;
  }

  render() {
    const {
      yScale,
      xScale,
      xScaleBottomAxes,
      width,
      height,
      axeSize,
      margin,
      yMax,
      xMax,
    } = this.state;
    const { ecgData, title } = this.props;

    const data = this.reformatData(ecgData);

    const sectionStyle = {
      width: width + axeSize,
      height: height + axeSize + 32 + 20 * 2,
    };
    return (
      <section className={b()} style={sectionStyle}>
        <h1 className={b('title')}>{title}</h1>
        <svg
          width={width + axeSize}
          height={height + axeSize}
          className={b('svg')}
        >
          <PatternLines
            id="dhLines"
            height={6}
            width={6}
            stroke="rgba(231, 76, 60, 0.5)"
            strokeWidth={1}
            orientation={['vertical', 'horizontal']}
          />
          <Bar
            fill={`url(#dhLines)`}
            height={height}
            width={width}
            x={axeSize}
            y={0}
            rx={0}
          />
          <Grid
            top={margin.top}
            left={axeSize}
            xScale={xScale}
            yScale={yScale}
            stroke="rgba(142, 32, 95, 0.9)"
            width={xMax}
            height={yMax}
            numTicksRows={numTicksForHeight(height)}
            numTicksColumns={numTicksForWidth(width)}
          />
          <Group top={margin.top} left={axeSize}>
            <LinePath
              data={data}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              stroke={'black'}
              strokeWidth={2}
              curve={curveBasis}
            />
          </Group>
          <Group left={margin.left}>
            <AxisLeft
              top={margin.top}
              left={axeSize}
              scale={yScale}
              hideZero
              numTicks={numTicksForHeight(height)}
              label="Amplitude (dB)"
              stroke="#1b1a1e"
              tickStroke="#8e205f"
              labelProps={{
                textAnchor: 'middle',
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 'black',
              }}
            />

            <AxisBottom
              top={height}
              left={axeSize}
              scale={xScaleBottomAxes}
              numTicks={numTicksForWidth(width)}
              label="Time (s)"
              labelProps={{
                textAnchor: 'middle',
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 'black',
              }}
            />
          </Group>
        </svg>
      </section>
    );
  }
}

export default Chart;
