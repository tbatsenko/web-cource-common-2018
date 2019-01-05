import ReactDOM from 'react-dom';
import React from "react";
import Field from './components/Field/Field'

ReactDOM.render(
    <Field pictures={["pear.svg", "pear.svg", "apple.svg", "apple.svg", "cherry.svg", "cherry.svg", "blueberries.svg", "blueberries.svg", "talon.svg"]}/>, document.getElementById("root")
);
