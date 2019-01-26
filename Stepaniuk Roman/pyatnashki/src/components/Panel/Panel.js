import React from 'react';
import './Panel.css';

var Panel = ({buttons}) => (
    <div className="Panel">
        <i className="Panel__caption">Choose difficulty</i>
        {buttons}
    </div>
);

export default Panel;
