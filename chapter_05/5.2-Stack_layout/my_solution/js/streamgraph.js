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
  
  const maxUpperBoundary = d3.max(annotatedData[annotatedData.length - 1], d => d[1]);

  const yScale = d3.scaleLinear()
    .domain([0, maxUpperBoundary])
    .range([innerHeight, 0])
    .nice();

/***********************************/
/* Append Area Chart / Steamagraph */
/***********************************/

//Area layout generator
const areaGenerator = d3.area()                                     
  .x(d => xScale(d.data.year) + xScale.bandwidth()/2)               //Centres data points to middle of the "bars"
  .y0(d => yScale(d[0]))
  .y1(d => yScale(d[1]))
  .curve(d3.curveCatmullRom);                                       //Makes a curve instead of lines


//Append chart 
innerChart 
  .append("g")                                                      //Create SVG container so its easier to debug and inspect
    .attr("class", "areas-container")                             
  .selectAll("path")                                                //Data binding pattern begin
  .data(annotatedData)
  .join("path")
    .attr("d", areaGenerator)                                       //Data binding pattern end
    .attr("fill", d => colorScale(d.key));


/******************/
/* Appending axes */
/******************/

const leftAxis = d3.axisLeft(yScale);
innerChart
  .append("g")
  .call(leftAxis);
  
};