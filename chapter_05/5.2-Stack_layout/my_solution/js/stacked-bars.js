const drawStackedBars = (data) => {
  // Generate the stacked bar chart here
  

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3.select("#bars")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  /*********************************/
  /*    Stack Layout Generator     */
  /***  ******************************/

  const stackGenerator = d3.stack()                         //Initialize stack layout generator
    .keys(formatsInfo.map(f => f.id));                      //Tell layout function which keys from dataset to create series

  const annotatedData = stackGenerator(data);               //Call layout generator and pass data as argument and store as a constant
  console.log("annotatedData", annotatedData);
  
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

  /**************************/
  /* Appending stacked bars */
  /**************************/

  annotatedData.forEach(series => {                                     //loop through each series in annotatedData

    innerChart
      .selectAll(`.bar-${series.key}`)                                  //data binding pattern to append a rectangle for each year.
      .data(series)                                                     //Apply a different class name based on each series,
      .join("rect")                                                     //and use that as a selector to avoid removing
          .attr("class", d => `bar-${series.key}`)                      //previous rectacngles during the loop process
          .attr("x", d => xScale(d.data.year))                          //Scales to position rectangles and set fill attributes
          .attr("y", d => yScale(d[1]))
          .attr("width", xScale.bandwidth())
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("fill", colorScale(series.key));
  });
  
  /******************/
  /* Appending axes */
  /******************/

  const bottomAxis = d3.axisBottom(xScale)                              //Declare bottom axis generator.
    .tickValues(d3.range(1975, 2020, 5))                                //Set ticks and labels that we want
    .tickSizeOuter(0);                                                  //Hide outer ticks

  innerChart                                                            //Append bottom axis inside svg group and translate to bottom of chart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScale);                                 //Declare and append left axis
  innerChart
    .append("g")
      .call(leftAxis);
};