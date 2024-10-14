// Load the data here
d3.csv("data/weekly_temperature.csv", d3.autoType).then(data => {
    console.log("temperature data", data)
    drawLineChart(data);
});

// Create the line chart here
const drawLineChart = (data) => {
  const margin = {top: 40, right: 170, bottom: 25, left: 40};
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight  = height - margin.top - margin.bottom;

  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`)
    .style("border", "1px solid black");

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
};