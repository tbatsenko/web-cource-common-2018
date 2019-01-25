import React, { Component } from 'react';
import './App.scss';
import '../Chart';
import { csvParse } from 'd3';
import Chart from '../Chart';

import BEM from '../../helpers/BEM';

const b = BEM('App');

class App extends Component {
  state = {
    ecgData: null,
    sampleRate: null,
    filtered: null,
    rpeaks: null,
    start: 0,
    zoomValue: 500,
  };

  constructor(props) {
    super(props);
    const id = 1;
    this.state.sampleRate = 200;
    this.getRawECG(id);
    this.getFilteredECG(id);
    this.getRpeaks(id);
  }

  getRawECG = async id => {
    const response = await fetch('data/ecg' + id.toString() + '.csv');
    const rawData = await response.text();

    const parseData = csvParse(rawData);
    let data = parseData.columns.map(parseFloat).filter(value => !isNaN(value));
    this.setState({ ecgData: data });
  };

  getFilteredECG = async id => {
    const response = await fetch('data/filtered' + id.toString() + '.csv');
    const rawData = await response.text();

    const parseData = csvParse(rawData);
    let data = parseData.columns
      .map(value => Number(value).toFixed(2))
      .map(parseFloat)
      .filter(value => !isNaN(value));
    this.setState({ filtered: data });
  };

  getRpeaks = async id => {
    const response = await fetch('data/rpeaks' + id.toString() + '.csv');
    const rawData = await response.text();

    const parseData = csvParse(rawData);
    let data = parseData.columns.map(parseFloat).filter(value => !isNaN(value));
    this.setState({ rpeaks: data });
  };

  render() {
    if (!this.state.ecgData)
      return <div className="App"> Loading raw ECG data...</div>;
    if (!this.state.filtered)
      return <div className="App"> Loading filtered ECG data...</div>;
    if (!this.state.rpeaks)
      return <div className="App"> Loading rpeaks indices...</div>;
    if (!this.state.sampleRate)
      return <div className="App"> Loading sample rate value...</div>;
    if (!this.state.zoomValue)
      return <div className="App"> Loading zoomValue...</div>;

    const {
      ecgData,
      filtered,
      rpeaks,
      sampleRate,
      zoomValue,
      start,
    } = this.state;

    const rawECGYRange = [Math.min(...ecgData), Math.max(...ecgData)];
    const filteredECGYRange = [Math.min(...filtered), Math.max(...filtered)];

    return (
      <main className={b()}>
        <Chart
          ecgData={ecgData.slice(start, start + zoomValue)}
          sampleRate={sampleRate}
          startValue={start}
          endValue={start + zoomValue}
          yRange={rawECGYRange}
          title={'Raw ECG data'}
        />
        <Chart
          ecgData={filtered.slice(start, start + zoomValue)}
          rpeaks={rpeaks.filter(
            value => value >= start && value <= start + zoomValue
          )}
          sampleRate={sampleRate}
          startValue={start}
          endValue={start + zoomValue}
          yRange={filteredECGYRange}
          title={'Filtered ECG data with R-peaks'}
        />
        <form className={b('form')}>
          <input
            type="range"
            min={0}
            max={ecgData.length - zoomValue}
            step={1}
            value={start}
            onChange={({ target }) =>
              this.setState({ start: Number(target.value) })
            }
          />
          <input
            type="button"
            value={'Zoom In'}
            onClick={() => {
              if (zoomValue - 100 > 0)
                this.setState({ zoomValue: zoomValue - 100 });
            }}
          />
          <input
            type="button"
            value={'Zoom Out'}
            onClick={() => {
              if (zoomValue + start + 100 <= ecgData.length)
                this.setState({ zoomValue: zoomValue + 100 });
              else if (start > 0) {
                this.setState({
                  zoomValue: zoomValue + 100,
                  start: start - 100,
                });
              }
            }}
          />
        </form>
      </main>
    );
  }
}

export default App;
