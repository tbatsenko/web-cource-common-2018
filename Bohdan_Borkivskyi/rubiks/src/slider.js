document.getElementById("slider").oninput = function() {
  document.getElementById("slider_value").innerText = "Number of moves in scramble: " + this.value;
}