const drawStreamGraph = (data) => {
  // Generate the streamgraph here
  

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3.select("#streamgraph")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  /*********************************/ 
  /* Stack/steam Layout Generator */
  /*********************************/   

  const stackGenerator = d3.stack()
    .keys(formatsInfo.map(f => f.id));
  const annotatedData = stackGenerator(data);

  /***************************/
  /* Declare vertical scale */
  /**************************/

  //As we're going to use .order() and .offset() this block of code will 
  //set the domain and range for each series, in the context of the .order and .offset
  //meaning we don't need to change it every time. Basically domain will become dynamic

  //Declare two empty arrays to store min and max value of each series
  const minLowerBoundaries = [];
  const maxUpperBoundaries = [];

  //Loop through annotated dataset stack Generator creates, finding min and max value in each series, and push into arrays
  annotatedData.forEach(series => {
    minLowerBoundaries.push(d3.min(series, d => d[0]));
    maxUpperBoundaries.push(d3.max(series, d => d[1]));
  })

  //Extract min and max values from each aray
  const minDomain = d3.min(minLowerBoundaries);
  const maxDomain = d3.max(maxUpperBoundaries);

  //Use the min and max values to set the domain in the scale
  const yScale = d3.scaleLinear()
    .domain([minDomain, maxDomain])
    .range([innerHeight, 0])
    .nice();


/***********************************/
/* Append Area Chart / Steamagraph */
/***********************************/

//Area layout generator
//Final State for transition purposes
const areaGenerator = d3.area()                                     
  .x(d => xScale(d.data.year) + xScale.bandwidth()/2)               //Centres data points to middle of the "bars"
  .y0(d => yScale(d[0]))
  .y1(d => yScale(d[1]))
  .curve(d3.curveCatmullRom);                                       //Makes a curve instead of lines

//Append x-axis grid                                                //Appeneded before steamchart so its behind data
const bottomAxis = d3.axisBottom(xScale)
  .tickValues(d3.range(1975, 2020, 5))
  .tickSizeOuter(0)
  .tickSize(innerHeight * -1);                                      //Make tick size size of chart so they become a grid

innerChart
  .append("g")
  .attr("class", "x-axis-streamgraph")
  .attr("transform", `translate(0, ${innerHeight})`)
  .call(bottomAxis);

//Append chart 
innerChart 
  .append("g")                                                      //Create SVG container so its easier to debug and inspect
    .attr("class", "areas-container")                             
  .selectAll("path")                                                
  .data(annotatedData)
  .join("path")
    .attr("class", d => `area area-${d.key}`)
    .attr("d", areaGenerator)                                
    .attr("fill", d => colorScale(d.key));



/********************/
/* Append left axis */
/********************/

const leftAxis = d3.axisLeft(yScale);
innerChart
  .append("g")
  .call(leftAxis);


/**************************/
/* Add label to left axis */
/**************************/

const leftAxisLabel = svg
  .append("text")
    .attr("dominant-baseline", "hanging");

leftAxisLabel
  .append("tspan")
    .text("Total revenue");

leftAxisLabel
  .append("tspan")
    .text("(million USD)")
    .attr("dx", 5)
    .attr("fill-opacity", 0.7);
  
leftAxisLabel
  .append("tspan")
    .text("Adjusted for inflation")
    .attr("x", 0)
    .attr("dy", 20)
    .attr("fill-opacity", 0.7)
    .attr("font-size", "14px");

};

