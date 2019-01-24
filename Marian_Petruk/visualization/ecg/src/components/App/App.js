import React, { Component } from 'react';
import './App.scss';
import '../Chart';
import { csvParse } from 'd3';
import Chart from '../Chart';

class App extends Component {
  state = {
    ecgData: null,
    filtered: null,
    rpeaks: null,
    start: 0,
  };

  constructor(props) {
    super(props);
    const id = 0;
    this.getRawECG(id);
    this.getFilteredECG(id);
    this.getRpeaks(id);
  }

  getRawECG = async id => {
    const response = await fetch('data/ecg' + id.toString() + '.csv');
    const rawData = await response.text();

    const parseData = csvParse(rawData);
    let data = parseData.columns
      .map(parseFloat)
      .filter(value => !isNaN(value))
      .slice(0, 3000);
    this.setState({ ecgData: data });
  };

  getFilteredECG = async id => {
    const response = await fetch('data/filtered' + id.toString() + '.csv');
    const rawData = await response.text();

    const parseData = csvParse(rawData);
    let data = parseData.columns
      .map(value => Number(value).toFixed(2))
      .map(parseFloat)
      .filter(value => !isNaN(value))
      .slice(0, 3000);
    this.setState({ filtered: data });
  };

  getRpeaks = async id => {
    const response = await fetch('data/rpeaks' + id.toString() + '.csv');
    const rawData = await response.text();

    const parseData = csvParse(rawData);
    let data = parseData.columns
      .map(value => Number(value).toFixed(2))
      .filter(value => !isNaN(value));
    this.setState({ rpeaks: data });
  };

  render() {
    if (!this.state.filtered) return <div className="App"> Loading...</div>;
    console.log('ecgData = ', this.state.ecgData);
    console.log('filtered = ', this.state.filtered);
    console.log('filtered = ', this.state.rpeaks);

    const { ecgData, filtered, rpeaks } = this.state;
    const sampleRate = 200;

    return (
      <main className="App">
        <Chart
          ecgData={ecgData.slice(this.state.start, this.state.start + 500)}
          sampleRate={sampleRate}
          startValue={this.state.start}
          endValue={this.state.start + 500}
          title={'Raw ECG data'}
        />
        <Chart
          ecgData={filtered.slice(this.state.start, this.state.start + 500)}
          sampleRate={sampleRate}
          startValue={this.state.start}
          endValue={this.state.start + 500}
          title={'Filtered ECG data'}
        />
        <input
          type="range"
          min={0}
          max={2500}
          step={1}
          value={this.state.start}
          onChange={({ target }) =>
            this.setState({ start: Number(target.value) })
          }
        />
      </main>
    );
  }
}

export default App;
