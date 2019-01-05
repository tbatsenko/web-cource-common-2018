import React, {component} from 'react';
import {withParentSize} from '@vx/vx';

class  Chart extends Component{

  constructor(props){
    super(props);

    fetch(input:'/population_by_age.csv')
    .then(onfulfilled: response => response.text())
    .then(onfulfilled: data =>
  )
  }

  render(){
    const {parentheight, parentwidth} = this.props;
    return(
      <svg height= {parentheight} className={b()}>
      Chart
    </svg>)
  }
}