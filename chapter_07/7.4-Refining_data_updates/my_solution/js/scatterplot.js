const drawScatterplot = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#scatterplot")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  /*******************************/
  /*    Define the scales        */
  /*******************************/
  //Linear yScale
  const maxSize = d3.max(data, d => d.max_size_m);
  yScale = d3.scaleLinear()
    .domain([0, maxSize])
    .range([innerHeight, 0])
    .nice();

  //Colour Scale based on convervation status
  colorScale = d3.scaleOrdinal()
    .domain(conservationStatuses.map(s => s.id))
    .range(conservationStatuses.map(s => s.color));

  //Logarithmic x scale
  const maxPopulation = d3.max(data, d => d.global_population_estimate);
  xScale = d3.scaleLog()
    .domain([1, maxPopulation])
    .range([0, innerWidth])
    .nice();
    
  //Radial scale for species weight
  const maxWeight = d3.max(data, d => d.max_weight_t);
  rScale = d3.scaleRadial()
    .domain([0, maxWeight])
    .range([0, 45]);

  /*******************************/
  /*    Append Axes              */
  /*******************************/
  //X Axis
  const bottomAxis = d3.axisBottom(xScale);
  innerChart 
    .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);
    
  //Y axis
  const leftAxis = d3.axisLeft(yScale)
  innerChart
    .append("g")
      .attr("class", "y-axis")
      .call(leftAxis);

  //x axis label
  svg
    .append("text")
      .text("Estimated population")
      .attr("text-anchor", "end")
      .attr("x", innerWidth + margin.left)
      .attr("y", height - 5)
      .attr("font-size", "18px");

  //y axis label
  svg
    .append("text")
      .text("Max size (m)")
      .attr("dominant-baseline", "hanging")
      .attr("x", 0)
      .attr("y", 15)
      .attr("font-size", "18px");

  /*******************************/
  /*    Append Circles           */
  /*******************************/
  innerChart
    .selectAll(".cetacean")
    .data(data)
    .join("circle")
      .attr("class", "cetacean")
      .attr("cx", d => xScale(d.global_population_estimate))
      .attr("cy", d => yScale(d.max_size_m))
      .attr("r", d => rScale(d.max_weight_t))
      .attr("fill", d => colorScale(d.status))
      .attr("fill-opacity", 0.6)
      .attr("stroke", d => colorScale(d.status))
      .attr("stroke-width", 2);
};