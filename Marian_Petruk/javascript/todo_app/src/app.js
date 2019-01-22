import "normalize.css";
import "./styles/common.scss";

import "./todo";
import VanillaCalendar from "./calendar";

// console.log('Hello, world!')

window.addEventListener("load", function() {
  const vanillaCalendar = new VanillaCalendar("#calendar");
  vanillaCalendar.init({ disablePastDays: false });
});
