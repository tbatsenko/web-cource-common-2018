var width = 1000,
    height = 600

var svg = d3.select("svg").attr("width", width).attr("height", height);

var projection = d3.geoAlbersUsa().scale(900).translate([width/2, height/2])

let line = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-01-01&endtime=2017-01-08"

let request = new XMLHttpRequest();

request.open('GET', line, true);
request.onload = function () {
  let testData = JSON.parse(this.response);
  //console.log(testData)

  var data = testData["features"].map(function(d) {
    return {"magnitude": d["properties"]["mag"], "coordinates":[d["geometry"]["coordinates"][0], d["geometry"]["coordinates"][1]]}
  }).filter(function(d) {
    return projection(d.coordinates) !== null
  })

  console.log(data)

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
      if (scale(d.magnitude) > 0){
        return scale(d.magnitude)
      }else {
        return 0
      }

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

}
request.send();





