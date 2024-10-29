// Load the data here
d3.csv("data/daily_precipitations.csv", d3.autoType).then(data => {
    console.log("precipitation data", data);
    drawArc(data);
});

// Draw the arc here
const drawArc = (data) => {
  /*******************************/
  /*   Height & Width            */
  /*******************************/
  const pieChartWidth = 300;
  const pieChartHeight = 300;
  
  /*******************************/
  /*    Create container         */
  /*******************************/
  //Append responsive SVG container
  const svg = d3.select("#arc")
    .append("svg")
    .attr("viewBox", [0, 0, pieChartWidth, pieChartHeight]);

  //Create Arc Container Group in SVG container
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${pieChartWidth/2}, ${pieChartHeight/2})`);  //translate arc chart to centre of svg container

  /*******************************/
  /* Calculate variables for arcs*/
  /*******************************/
  const numberOfDays = data.length;
  const numberOfDaysWithPrecipitation = data.filter(d => d.total_precip_in >0).length;
  const percentageDaysWithPrecipitation = Math.round(numberOfDaysWithPrecipitation / numberOfDays * 100);
  const angleDaysWithPrecipitation_deg = percentageDaysWithPrecipitation * 360 / 100;
  const angleDaysWithPrecipitation_rad = angleDaysWithPrecipitation_deg * Math.PI / 180;

  /*******************************/
  /*        Arc Generator        */
  /*******************************/
  const arcGenerator = d3.arc()
    .innerRadius(80)
    .outerRadius(120)
    .padAngle(0.02)
    .cornerRadius(6);

  //Arc days with precipitation  
  innerChart
    .append("path")
      .attr("d", () => {
        return arcGenerator({
          startAngle: 0,
          endAngle: angleDaysWithPrecipitation_rad
        });
      })
      .attr("fill", "#84c8d8");
  
  //Arc days with no precipitation
  innerChart
  .append("path")
    .attr("d", () => {
      return arcGenerator({
        startAngle: angleDaysWithPrecipitation_rad,
        endAngle: 2* Math.PI
      });
    })
    .attr("fill", "#D6CED2");

  /*******************************/
  /*        Arc Labels           */
  /*******************************/
  
  //Get centroid position for label position
  const centroid = arcGenerator
    .startAngle(0)
    .endAngle(angleDaysWithPrecipitation_rad)
    .centroid();

  //Append label
  innerChart
    .append("text")
      .text(d => d3.format(".0%")(percentageDaysWithPrecipitation/100))
      .attr("x", centroid[0])
      .attr("y", centroid[1])
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .style("font-weight", 500);
};