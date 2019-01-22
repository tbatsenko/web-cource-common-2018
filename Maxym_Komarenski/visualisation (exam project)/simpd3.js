var pi = Math.PI;

var width = 115*7;
var height = 74*7;
var move_all_by_x = 50;
var color_of_strokes = "#647f7a"


var piter = d3.select('body').append('svg').attr('class', 'pitch').attr('height',height+20)
  .attr('width', width+100)
  .style('background','white');


var corner = d3.svg.arc()
  .innerRadius(7)
  .outerRadius(7)
  .startAngle(0 * (pi/180))
  .endAngle(90* (pi/180))

var field = piter.append('rect')
  .attr('height',height)
  .attr('width', width)
  .attr('fill', 'transparent')
  .attr('stroke', color_of_strokes)
  .attr('x', 10 + move_all_by_x)
  .attr('y',10);

function clearGoalLine() {
  piter.selectAll(".goals").remove();
}

function drawALine(x1, y1, x2, y2){
  piter.append("line")
    .attr("class", "goals")
    .attr("x1",  x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke-width", 1)
    .attr("stroke", "red")
    .attr("markerWidth", 13)
    .attr("marker-end", "url()");
}

piter.append('rect')
  .attr('height',44*7)
  .attr('width', 18*7)
  .attr('y',15*7+10)
  .attr('x',10 + move_all_by_x)
  .attr('fill', 'white')
  .attr('stroke', color_of_strokes);

piter.append('rect')
  .attr('height',44*7)
  .attr('width', 18*7)
  .attr('y',15*7+10)
  .attr('x',700 - 11  + move_all_by_x)
  .attr('fill', 'white')
  .attr('stroke', color_of_strokes);

piter.append('rect')
  .attr('height',20*7)
  .attr('width', 8*7)
  .attr('y',27*7+10)
  .attr('x',10  + move_all_by_x)
  .attr('fill', 'white')
  .attr('stroke', color_of_strokes);

piter.append('rect')
  .attr('height',20*7)
  .attr('width', 8*7)
  .attr('y',27*7+10)
  .attr('x',759  + move_all_by_x)
  .attr('fill', 'white')
  .attr('stroke', color_of_strokes);

//centerline of the pitch
piter.append('line')
  .attr('x1',width/2+10  + move_all_by_x)
  .attr('x2',width/2+10  + move_all_by_x)
  .attr('y1',10)
  .attr('y2',height+10)
  .attr('stroke',color_of_strokes);

function drawColumns(){
  var c = 0
  for (i = 0; i < 5; i++){
    piter.append('line')
      .attr('x1',-10  + move_all_by_x + c)
      .attr('x2',-10 + move_all_by_x + c)
      .attr('y1',220)
      .attr('y2',height - 202)
      .attr('stroke',"#eaebed");

    c = c + 4;
  }
}

function drawRows(){
  var r = 0
  for (i = 0; i < 25; i++){
  piter.append('line')
    .attr('x1',39.5)
    .attr('x2',60)
    .attr('y1',220 + r)
    .attr('y2',220 + r)
    .attr('stroke',"#eaebed");
    r = r + 4;
  }
}

drawColumns()
drawRows()


piter.append('rect')
  .attr('height',96)
  .attr('width', 20)
  .attr('y',220)
  .attr('x',40)
  .attr('fill', 'transparent')
  .attr('stroke', color_of_strokes);

//center circle
piter.append('circle')
  .attr('r', 70)
  .attr('cx',width/2+10  + move_all_by_x)
  .attr('cy',height/2+10)
  .attr('fill','transparent')
  .attr('stroke', color_of_strokes);

// piter.append('circle')
//   .attr('r', 7*22)
//   .attr('cx',10  + move_all_by_x)
//   .attr('cy',height/2+10)
//   .attr('fill','transparent')
//   .attr('stroke', color_of_strokes);
//
//
// piter.append('circle')
//   .attr('r', 70)
//   .attr('cx',12*7+10 + move_all_by_x)
//   .attr('cy',height/2+10)
//   .attr('fill','transparent')
//   .attr('stroke', color_of_strokes);

//------------------



