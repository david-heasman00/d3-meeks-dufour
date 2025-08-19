const drawHistogram = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 30, bottom: 50, left: 40};
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#histogram")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  /********************************/
  /*    Create Bins               */
  /********************************/

  //Turn data into bins
  const binGenerator = d3.bin()
    .value(d => d.salary);
  const bins = binGenerator(data);

  /********************************/
  /*     Draw the Histogram       */
  /********************************/

  //Declare scales
  const minSalary = bins[0].x0;                     //min salary in bin will be bins lower limit
  const maxSalary = bins[bins.length -1].x1;        //and vice versa for max salary

  const xScale = d3.scaleLinear()                   //xScale domain will be minSalary to maxSalary from 0 to innerWidth
    .domain([minSalary, maxSalary])
    .range([0, innerWidth]);

  const binMaxLength = d3.max(bins, d => d.length); //find max value for yScale

  const yScale = d3.scaleLinear()                   //Declare yScale and set to maxBin and to innerHeight
    .domain([0, binMaxLength])
    .range([innerHeight, 0])
    .nice();

  //Append rectangles for histogram
  innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0))  //Set size of bandwitdth
      .attr("height", d => innerHeight - yScale(d.length)) //Set height
      .attr("fill", slateGray)
      .attr("stroke", white)                          //Use white to make rectangles appear like they have gaps
      .attr("stroke-width", 2);

  //Add axes and labels
  const bottomAxis = d3.axisBottom(xScale);
  innerChart                                          //Create x axis 
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  svg                                                 //label for x axis
    .append("text")
      .text("Yearly salary (USD)")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 5);
  
  const leftAxis = d3.axisLeft(yScale);               //Create y axis
  innerChart
    .append("g")
      .call(leftAxis);
  svg
    .append("text")
      .text("Frequency")
      .attr("x", 5)
      .attr("y", 20);

};

