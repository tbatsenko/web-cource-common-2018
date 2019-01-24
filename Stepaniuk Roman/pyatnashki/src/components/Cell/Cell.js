import React from 'react';
import './Cell.css';


const Cell = ({number, inPosition, difficulty}) => (
    <div className={"Cell " + inPosition + ' ' + difficulty}>
        {number}
    </div>
);

export default Cell;