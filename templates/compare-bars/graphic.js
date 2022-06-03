const chartWidth = $("#graphic").width()
const margin = {
    top: 20,
    right: 10,
    bottom: 20,
    left: 10
}
const width = chartWidth - margin.left - margin.right
const height = 100 - margin.top - margin.bottom;

let y = d3.scaleBand()
    .range([height, 0])
    .padding(0.4);

let x = d3.scaleLinear()
    .range([0, width])
    .domain([0, width]);


let svg = d3.select("#graphic").append("svg")
    .attr("width", chartWidth)
    .attr("height", 120)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

const datapoints = [2, 50]
const datalabels = ["in", "out"]

let backgroundLines = svg.selectAll(null)
    // svg.selectAll("line")
    .data(datapoints)
    .enter().append("line")
    .attr("class", "line")
    .attr("stroke", "lightgray")
    .attr("stroke-width", 5)
    .attr("stroke-linecap", "round")
    .attr("x1", function (d) {
        return 0;
    })
    .attr("y1", function (d, i) {
        return i * 50
    })
    .attr("x2", function (d) {
        // console.log(width)
        return (width)
    })
    .attr("y2", function (d, i) {
        return i * 50
    })

let tooltip = d3.select("body")
    .append("div")
    .append("p")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#262B28")
    .style("padding-top", "5px")
    .style("padding-bottom", "5px")
    .style("padding-right", "5px")
    .style("padding-left", "5px")
    .style("border-radius", "5px")
    .style("color", "#F3F4F2")

let lines = svg.selectAll(null)
    .data(datapoints)
    .enter().append("line")
    .attr("class", "line")
    .attr("stroke", "#990000")
    .attr("stroke-width", 5)
    .attr("stroke-linecap", "round")
    .attr("x1", function (d) {
        return 0;
    })
    .attr("y1", function (d, i) {
        return i * 50
    })
    .attr("x2", function (d) {
        // console.log(width * (d / 100))
        return (width * (d / 100))
    })
    .attr("y2", function (d, i) {
        return i * 50
    })

let dot = svg.selectAll(null)
    .data(datapoints)
    .enter().append('circle')
    .attr("class", "circle")
    .attr("cx", function (d) {
        return (width * (d / 100))
    })
    .attr("cy", function (d, i) {
        return i * 50;
    })
    .attr("r", "5")
    .attr("stroke-width", "3")
    .attr("fill", "#990000")

let labels = svg.selectAll(null)
    .data(datalabels)
    .enter()
    .append("text")
    .attr("y", function (d, i) {
        return (i * 60) + 20;
    })
    .attr("x", 0)
    .attr("text-anchor", "start")
    .text(function (d) {
        return d
    });


let value = svg.selectAll(null)
    .data(datapoints).enter()
    .append("text")
    .text(function (d) {
        //console.log(d)
        let num = (Math.round(d * 10) / 10).toLocaleString("en-US")
        return `${num}%`
    })
    .attr("y", function (d, i) {
        // console.log(y)
        return (i * 60) + 20;
    })
    .attr("x", function (d) {
        return width
    })
    .attr("text-anchor", "end")

// Remove legend
d3.select("#legend")
    .style("display", "none")

