const chartWidth = $("#graphic").width()

const margin = { top: 10, right: 30, bottom: 20, left: 50 },
    width = chartWidth - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


const svg = d3.select("#graphic")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

let tooltip = d3.select("body")
    .append("div")
    .append("p")
    .style("font-family", "Poppins")
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


d3.csv("data/data.csv").then(function (data) {


    const subgroups = data.columns.slice(1)


    const groups = data.map(d => (d.group))


    const x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    const xTicks = svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    xTicks.selectAll('text')
        .attr("font-size", "1.1em")

    const y = d3.scaleLinear()
        .domain([0, 60])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));


    const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#de5826', '#8fd694', '#1979b9'])

    const stackedData = d3.stack()
        .keys(subgroups)
        (data)

    const mouseover = function (e, d) {
        const subName = d3.select(this.parentNode).datum().key;
        const subValue = d.data[subName];
        // console.log(subgroupName)
        tooltip
            .html("Category: " + subName + "<br>" + "Value: " + subValue)
            .style("visibility", "visible");
    }
    const mousemove = function (e, d) {
        tooltip.style("top", (e.pageY - 10) + "px")
            .style("left", (e.pageX + 10) + "px");
    }
    const mouseleave = function (e, d) {
        tooltip
            .style("visibility", "hidden");
    }
    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", d => x(d.data.group))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth())
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
})

// This chart was created using this D3 template: https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html


