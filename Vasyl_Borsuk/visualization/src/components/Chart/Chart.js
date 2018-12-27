import React, {Component} from "react"
import { withParentSize, AxisBottom, AxisLeft, Grid, Group, LinePath, Line, Point } from "@vx/vx"

import BEM from "../../utils/BEM"
import "./Chart.scss"
import { scaleLinear } from 'd3'

const b = BEM("Chart")

class Chart extends Component {
    static defaultProps = {
        margins: {
            top: 40,
            left: 60,
            right: 60,
            bottom: 40,
        },
    }

    constructor(props) {
        super(props)

        const { parentHeight, parentWidth, yDomain, xDomain, margins } = this.props

        const width = parentWidth - margins.left - margins.right
        const height = parentHeight - margins.top - margins.bottom

        const yScale = scaleLinear()
            .range([height, 0])
            .domain(yDomain)

        const xScale = scaleLinear()
            .range([0, width])
            .domain(xDomain)

        this.state = {
            yScale,
            xScale,
            width,
            height
        }
    }

    render() {
        const { data, xColumn, yColumns, colors, parentHeight, parentWidth, margins } = this.props
        const { yScale, xScale, width, height } = this.state


        return (
            <svg height={parentHeight} width={parentWidth} className={b()}>
                <Group left={margins.left} top={margins.top} right={margins.right} bottom={margins.bottom}>
                    <AxisBottom
                        className={b("axis")}
                        top={height}
                        scale={xScale}
                    />
                    <AxisLeft
                        className={b("axis")}
                        scale={yScale}
                    />
                    <Grid
                        className={b("grid")}
                        yScale={yScale}
                        xScale={xScale}
                        width={width}
                        height={height}
                    />

                    <Line
                        className={b("middle-line")}
                        from={new Point({x: xScale(0), y: yScale(0)})}
                        to={new Point({x: xScale(0), y: yScale(6000)})}
                    />

                    {yColumns.map((yColumn, ind) => {
                        const displayData = data.filter((row) => row[yColumn] !== 0)
                        return <LinePath
                            className={b("line")}
                            data={displayData}
                            x={d => xScale(d[xColumn])}
                            y={d => yScale(d[yColumn])}
                            stroke={colors[ind]}
                            key={yColumn}
                        />
                    })}
                </Group>
            </svg>
        )
    }
}

export default withParentSize(Chart);