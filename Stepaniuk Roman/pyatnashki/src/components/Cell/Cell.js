import React from 'react';
import './Cell.css';


const Cell = ({number}) => (
    <div className="Cell active">
        {number}
    </div>
);

export default Cell;