// Load the data here
d3.csv("data/daily_precipitations.csv", d3.autoType).then(data => {
    console.log("precipitation data", data);
    drawArc(data);
});

// Draw the arc here
const drawArc = (data) => {
  //Set height and width constants of the arc
  const pieChartWidth = 300;
  const pieChartHeight = 300;
  
  //Append responsive SVG container
  const svg = d3.select("#arc")
    .append("svg")
    .attr("viewBox", [0, 0, pieChartWidth, pieChartHeight]);

  //Create Arc Container Group in SVG container
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${pieChartWidth/2}, ${pieChartHeight/2})`);  //translate arc chart to centre of svg container

  //Calculate variables for pie chart (can use Arc Generator, but doing it here quickly)
  const numberOfDays = data.length;
  const numberOfDaysWithPrecipitation = data.filter(d => d.total_precip_in >0).length;
  const percentageDaysWithPrecipitation = Math.round(numberOfDaysWithPrecipitation / numberOfDays * 100);
  const angleDaysWithPrecipitation_deg = percentageDaysWithPrecipitation * 360 / 100;
  const angleDaysWithPrecipitation_rad = angleDaysWithPrecipitation_deg * Math.PI / 180;
};