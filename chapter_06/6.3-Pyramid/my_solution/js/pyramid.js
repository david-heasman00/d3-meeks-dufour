const drawPyramid = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 30, bottom: 40, left: 60};
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#pyramid")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  /******************************/
  /*    Generate bins           */
  /******************************/
  const binGenerator = d3.bin()
    .value(d => d.salary);
  
  //Male Bin Generator
  const maleBins = binGenerator(data.filter(d => d.gender === "Male"));

  //Female Bin Generator
  const femaleBins = binGenerator(data.filter(d => d.gender === "Female"));

  /****************************/
  /*    Declare the scales    */
  /****************************/

  //X Male Scale
  const xMaleScale = d3.scaleLinear()
    .domain([0, 15])
    .range([innerWidth/2, innerWidth]);

  //X Female Scale
  const xFemaleScale = d3.scaleLinear()
    .domain([15, 0])
    .range([0, innerWidth/2]);

  //Y Scale
  const minSalary = femaleBins[0].x0;
  const maxSalary = femaleBins[femaleBins.length -1].x1;
  const yScale = d3.scaleLinear()
    .domain([minSalary, maxSalary])
    .range([innerHeight, 0])
    .nice();

  /*******************************/
  /*    Append the pyramids      */
  /*******************************/
  const pyramidContainer = innerChart
    .append("g")
      .attr("stroke", white)
      .attr("stroke-width", 2);
  
  //Female Pyramids
  pyramidContainer
    .selectAll(".bar-women")
    .data(femaleBins)
    .join("rect")
      .attr("class", "bar-women")
      .attr("x", d => xFemaleScale(d.length / data.length * 100))
      .attr("y", d => yScale(d.x1))
      .attr("width", d => innerWidth/2 - xFemaleScale(d.length / data.length * 100))
      .attr("height", d => yScale(d.x0) - yScale(d.x1))
      .attr("fill", womenColor);

  //Male Pyramids
  pyramidContainer
    .selectAll(".bar-men")
    .data(maleBins)
    .join("rect")
      .attr("class", "bar-men")
      .attr("x", innerWidth/2)
      .attr("y", d => yScale(d.x1))
      .attr("width", d => xMaleScale(d.length / data.length * 100) - innerWidth/2)
      .attr("height", d => yScale(d.x0) - yScale(d.x1))
      .attr("fill", menColor)

  /*******************************/
  /*   Add the axes and labels   */
  /*******************************/

  //X Axis
  const bottomFemaleAxis = d3.axisBottom(xFemaleScale)
    .tickValues([15, 10, 5, 0])
    .tickSizeOuter(0);
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomFemaleAxis);

  const bottomMaleAxis = d3.axisBottom(xMaleScale)
    .tickValues([5, 10, 15])
    .tickSizeOuter(0);
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomMaleAxis);

  svg
    .append("text")
      .text("Percent")
      .attr("text-anchor", "middle")
      .attr("x", margin.left + innerWidth/2)
      .attr("y", height - 5);

  //Y Axis
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .call(leftAxis);

svg
  .append("text")
    .text("Yearly salary (USD)")
    .attr("x", 0)
    .attr("y", 20)
  
};