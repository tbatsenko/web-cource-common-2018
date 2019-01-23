import React, { Component } from 'react';

import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { GradientOrangeRed } from '@vx/gradient';
import { genDateValue } from '@vx/mock-data';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Area, LinePath, Line } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent } from 'd3-array';



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
    constructor(props){
        super(props);

        const { ecgData } = props;

        const axeSize = 50;
        const margin={top:0, right:0, bottom:0, left:0}, width = 1000, height=400;

        // bounds
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        // scales
        const xScale = scaleLinear({
            range: [0, xMax],
            domain: [0, ecgData.length-1]
        });
        const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [Math.min(...ecgData), Math.max(...ecgData)],
            nice: true
        });

        this.state = {
            yScale,
            xScale,
            width,
            height,
            axeSize,
            margin,
            yMax,
            xMax
        }
    }

    render() {

        const {yScale, xScale, width, height, axeSize, margin, yMax, xMax} = this.state;
        const {ecgData} = this.props;
        // console.log(ecgData.length);

        let data = [];

        for(let i=0;i<ecgData.length;++i){
            data.push({index:i, value:ecgData[i]});
        }

        return (
            <div className="App">
                <svg width={width+axeSize} height={height+axeSize}>
                    <GradientOrangeRed id="linear" vertical={false} fromOpacity={0.8} toOpacity={0.3} />
                    <rect x={0} y={0} width={width} height={height} fill="#ffffff" rx={14} />
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
                            stroke={"black"}
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
                            label="Axis Left Label"
                            labelProps={{
                                fill: '#8e205f',
                                textAnchor: 'middle',
                                fontSize: 12,
                                fontFamily: 'Arial'
                            }}
                            stroke="#1b1a1e"
                            tickStroke="#8e205f"
                            /*tickLabelProps={(value, index) => ({
                              fill: '#8e205f',
                              textAnchor: 'end',
                              fontSize: 10,
                              fontFamily: 'Arial',
                              dx: '-0.25em',
                              dy: '0.25em'
                            })}
                            tickComponent={({ formattedValue, ...tickProps }) => (
                                <text {...tickProps}>{formattedValue}</text>
                            )}*/
                        />

                        <AxisBottom
                            top={height}
                            left={axeSize}
                            scale={xScale}
                            numTicks={numTicksForWidth(width)}
                            label="Time"
                        />

                    </Group>
                </svg>
            </div>
        );
    }
}

export default Chart;
