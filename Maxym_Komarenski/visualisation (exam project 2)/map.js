var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
  if (error) throw error;

  svg.append("path")
    .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

  svg.append("path")
    .attr("d", path(topojson.feature(us, us.objects.nation)));
});