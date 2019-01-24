import React, { Component } from 'react';

import { Group } from '@vx/group';
import { ViolinPlot, BoxPlot } from '@vx/stats';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { genStats } from '@vx/mock-data';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { PatternLines } from '@vx/pattern';

import './BoxPlot.scss';

import BEM from '../../helpers/BEM';

const b = BEM('BoxPlot');

class BoxPlot extends Component {
  constructor(props) {
    super(props);
    const { rpeaks, title } = props;
  }

  render() {
    const { title } = this.props;

    return (
      <section className={b()}>
        <h3 className={b('title')}>{title}</h3>
      </section>
    );
  }
}

export default BoxPlot;
