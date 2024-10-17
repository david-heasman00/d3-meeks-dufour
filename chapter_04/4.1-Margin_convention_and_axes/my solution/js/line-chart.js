// Load the data here
d3.csv("data/weekly_temperature.csv", d3.autoType).then(data => {
    console.log("temperature data", data)
    drawLineChart(data);
});

// Create the line chart here
const drawLineChart = (data) => {
  
  //Create margins
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

  //Define scales
  const firstDate = new Date(2021, 00, 01, 0, 0, 0);  //Hard code the first date to be the 1st January 2021 midnight
  const lastDate = d3.max(data, d => d.date);
  const xScale = d3.scaleTime()
    .domain([firstDate, lastDate])
    .range([0, innerWidth]);

  const maxTemp = d3.max(data, d => d.max_temp_F);
  const yScale = d3.scaleLinear()
    .domain([0, maxTemp])
    .range([innerHeight, 0]);

  //Draw x axis
  const bottomAxis = d3.axisBottom(xScale) //Create variable with axis method
    .tickFormat(d3.timeFormat('%b'));       //Chain tick format to read the month
  
  //X axis with class axis-x
  innerChart
    .append("g")
      .attr("class", "axis-x") //Give class axis-x
      .attr("transform", `translate(0, ${innerHeight})`) //move x axis to bottom of chart area
      .call(bottomAxis); //call axis

  //Style x axis labels
  d3.selectAll(".axis-x text")                                              //select text on x-axis
    .attr("x", d => {                                                       //Move text to be in the middle of the two months
      const currentMonth = d;                                               //Set current month
      const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);     //Find next month
      return (xScale(nextMonth) - xScale(currentMonth)) / 2                 //Return the median between the 1st of the two months
    })
    .attr("y", "10px")                                                      //move text down 10px

  //Draw y axis
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .attr("class", "axis-y")
      .call(leftAxis);

  //Style y axis labels
  d3.selectAll(".axis-y text")
    .attr("y", "-5px")

  //Add y-axis label
  svg
    .append("text")
    .text("Temperature (°F)")
    .attr("y", 20);

  //Style text labels
  //Can also be handled with a CSS file (but doing it here for illustration/learning purposes)
  d3.selectAll(".axis-x text, .axis-y text")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", "14px");
};