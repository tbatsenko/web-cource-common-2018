import React from 'react';
import './Cell.css';


const Cell = ({number, inPosition}) => (
    <div className={"Cell " + inPosition}>
        {number}
    </div>
);

export default Cell;