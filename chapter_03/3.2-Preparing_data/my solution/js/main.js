// Append a SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

//Load data
d3.csv("data/data.csv", d => {
  return {
    technology: d.technology,
    count: +d.count
  };
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count));

  data.sort((a, b ) => b.count - a.count);

  createViz(data);
});

const createViz = (data) => {};

