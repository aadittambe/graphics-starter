const chartWidth = $("#graphic").width()
console.log(chartWidth)
let margin = { top: 20, right: 20, bottom: 20, left: 50 },
    width = chartWidth - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

if (chartWidth < 600) {
    console.log('hi')
    margin.bottom = 100;
}

const svg = d3.select("#graphic")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("data/data.csv").then(function (data) {

    // X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.country))
        .padding(0.2);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", function () {
            if (chartWidth < 600) {
                // console.log('hiiiii')
                return "translate(-10,10)rotate(-90)"
            }
        })
        .style("text-anchor", function () {
            if (chartWidth < 600) {
                // console.log('hiiiii')
                return "end"
            }
        });

    const y = d3.scaleLinear()
        .domain([0, 13000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    let color = d3.scaleLinear()
        .range(["#fbd603", "#990000"])
        .domain([0, 13000]);
    svg.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.country))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", function (d) { return color(d.value) })

})

// Remove legend
d3.select("#legend")
    .style("display", "none")


