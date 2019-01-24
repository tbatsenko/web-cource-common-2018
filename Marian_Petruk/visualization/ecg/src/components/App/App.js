import React, { Component } from 'react';
import './App.scss';
import '../Chart';
import { csvParse } from 'd3';
import Chart from '../Chart';

class App extends Component {
  state = {
    ecgData: null,
    rpeaks: null,
  };

  constructor(props) {
    super(props);
    this.getData();
  }

  getData = async () => {
    const response = await fetch('data/ecg1.csv');
    const rawData = await response.text();

    const parseData = csvParse(rawData);

    const ecgData = parseData.columns
      .map(parseFloat)
      .filter(value => !isNaN(value));
    this.setState({ ecgData: ecgData });
  };

  render() {
    if (!this.state.ecgData) return <div className="App"> 'Loading...'</div>;
    const { ecgData, rpeaks } = this.state;
    const sampleRate = 200;
    return (
      <main className="App">
        <Chart
          ecgData={ecgData}
          sampleRate={sampleRate}
          title={'Raw ECG data'}
        />
      </main>
    );
  }
}

export default App;
