import React, { Component } from 'react'
import { csvParse, extent } from 'd3'

import BEM from '../../utils/BEM'
import Chart from '../Chart'
import './App.scss'

const b = BEM('App')

const LINE_COLORS = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f",
    "#e67e22", "#e74c3c", "#95a5a6", "#c0392b", "#16a085"]

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

        const parsedData = csvParse(dataText, (row) => {
            let newRow = Object.assign({}, row)
            Object.keys(newRow).forEach((key) => newRow[key] = Number(newRow[key]))
            return newRow
        })
        const data = parsedData.filter((row) => row["Year"] >= -2000)
        const mainColumn = "Year";
        const columns = Object.keys(data[0]).filter((key) => key !== mainColumn)
        const activeColumns = {}
        columns.forEach((key) => activeColumns[key] = true)

        this.setState({
            data: data,
            mainColumn: mainColumn,
            columns: columns,
            activeColumns: activeColumns,
            xDomain: extent(data.map((row) => row['Year'])),
            yDomain: [0, 6000],
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

        const { data, mainColumn, columns, activeColumns, xDomain, yDomain } = this.state
        const displayColumns = columns.filter((key) => activeColumns[key])
        const colors = LINE_COLORS.filter((color, ind) => activeColumns[columns[ind]])

        return (
            <div className={b()}>
                <div className={b('chart')}>
                    <Chart
                        data={data}
                        xColumn={mainColumn}
                        yColumns={displayColumns}
                        xDomain={xDomain}
                        yDomain={yDomain}
                        colors={colors}
                    />
                </div>
                <ul className={b('lines-list')}>
                    {columns.map((col) =>
                        <button
                            className={b('button', activeColumns[col] ? ['active'] : [])}
                            onClick={() => this.changeKeyState(col)}
                            key={col}>
                            {col}
                        </button>)}
                </ul>
            </div>
        )
    }
}

export default App
