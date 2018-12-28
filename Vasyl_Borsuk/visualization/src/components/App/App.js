import React, { Component } from 'react'
import { csvParse } from 'd3'

import BEM from '../../utils/BEM'
import Chart from '../Chart'
import './App.scss'

const b = BEM('App')

class App extends Component {
    state = {
        data: null,
        mainColumn: null,
        columns: null,
        activeColumns: null,
        xDomain: null,
        yDomain: null,
    }

    constructor(props) {
        super(props)
        this.getData()
    }

    getData = async () => {
        const response = await fetch('/data.csv')
        const dataText = await response.text()

        const parsedData = csvParse(dataText, row =>
            Object.entries(row).reduce(
                (obj, [key, val]) => {
                    obj[key] = Number(val)
                    return obj
                }, {})
        )
        const mainColumn = "Year";
        const data = parsedData.filter((row) => row["Year"] >= -2000)
        const columns = Object.keys(data[0]).filter((key) => key !== mainColumn)
        const activeColumns = {}
        columns.forEach((key) => activeColumns[key] = true)

        this.setState({
            data: data,
            mainColumn: mainColumn,
            columns: columns,
            activeColumns: activeColumns,
        })
    }

    changeKeyState(key) {
        const { columns, activeColumns } = this.state;
        let newActiveColumns = Object.assign({}, activeColumns)
        newActiveColumns[key] = !activeColumns[key]

        const numActiveColumns = columns.reduce((currVal, key) => newActiveColumns[key] + currVal, 0)
        if (numActiveColumns === 0) alert("You cannot remove all data")
        else this.setState({
                activeColumns: newActiveColumns,
        })
    }

    render() {
        if (!this.state.data) return <div className="App">'Loading...'</div>

        const { data, mainColumn, columns, activeColumns } = this.state

        const displayColumns = columns.filter((key) => activeColumns[key])
        const displayData = displayColumns.map((key) =>
            data.map(row => [row[mainColumn], row[key]])
                .filter(([, val]) => val !== 0))

        return (
            <figure className={b()}>
                <div className={b('chart')}>
                    <Chart
                        data={displayData}
                        xSelector={val => val[0]}
                        ySelector={val => val[1]}
                    />
                </div>
                <figcaption className={b('legend')}>
                    {columns.map((col) =>
                        <label key={col} className={b('legend-item')}>
                            <input
                                checked={activeColumns[col]}
                                type="checkbox"
                                onChange={() => this.changeKeyState(col)}
                            />
                            {col}
                        </label>
                    )}
                </figcaption>
            </figure>
        )
    }
}

export default App
