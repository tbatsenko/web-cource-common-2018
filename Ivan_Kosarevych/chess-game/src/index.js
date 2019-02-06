import React from "react";
import ReactDOM from "react-dom";
import TwoPlayerGame from "./games/TwoPlayerGame";
import PartyGame from "./games/PartyGame";

import "./styles/index.scss";
import "./styles/board.scss";
import "./styles/game.scss";


ReactDOM.render(<PartyGame/>, document.getElementById("root"));