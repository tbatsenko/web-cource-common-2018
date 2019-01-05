import React, {Component} from "react"
import { withParentSize, AxisBottom, AxisLeft, Grid, Group, LinePath, Line, Point } from "@vx/vx"
import { extent } from 'd3'

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
        colors: ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f",
            "#e67e22", "#e74c3c", "#95a5a6", "#c0392b", "#16a085"]

    }

    constructor(props) {
        super(props)

        const { data, parentHeight, parentWidth, xSelector, margins } = this.props

        const width = parentWidth - margins.left - margins.right
        const height = parentHeight - margins.top - margins.bottom

        const xDomain = extent(data[0].map(xSelector))
        const yDomain = [0, 6000]

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
        const { data, xSelector, ySelector, colors, parentHeight, parentWidth, margins } = this.props
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

                    {data.map((oneData, ind) => {
                        return <LinePath
                            className={b("line")}
                            data={oneData}
                            x={d => xScale(xSelector(d))}
                            y={d => yScale(ySelector(d))}
                            stroke={colors[ind]}
                            key={ind}
                        />
                    })}
                </Group>
            </svg>
        )
    }
}

export default withParentSize(Chart);