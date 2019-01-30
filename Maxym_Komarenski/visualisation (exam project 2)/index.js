var width = 1000,
    height = 600

var svg = d3.select("svg").attr("width", width).attr("height", height);

var projection = d3.geoAlbersUsa().scale(900).translate([width/2, height/2])

d3.json("./data.json", function(data) {

  var scale  = d3.scaleLinear()
    .domain([1, 10])
    .range([0, 60]);

  var circle = svg.selectAll("circle")
    .data(data)
    .enter().append("circle");

  circle
    .attr("cx", function(d) {
      return projection(d.coordinates)[0];
    })
    .attr("cy", function(d) {
      return projection(d.coordinates)[1];
    })
    .attr("r", function(d) {
      return scale(d.magnitude)
    })
    .attr("stroke-width", 0)
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.5)
    .on("mouseover", function(d) {
      d3.select(this)
        .attr("fill-opacity", 1)
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .attr("fill-opacity", 0.5)
    });

})
