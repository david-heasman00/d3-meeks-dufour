const createTooltip = (data) => {

  const tooltipWidth = 100;
  const tooltipHeight = 190;
  const textColor = "#494e4f";
  const textLineHeight = 22;

  //Append tooltip svg group
  const tooltip = innerChart
    .append("g")
      .attr("class", "tooltip");

  //Append dashed vertical line
  tooltip
    .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", -30)
      .attr("y2", innerHeight)
      .attr("stroke", textColor)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6 4");

  //Get first year as tooltip will start there    
  const firstYear = d3.min(data, d => d.year);

  //Append the year where tooltip is
  const tooltipYear = tooltip
    .append("text")
      .attr("class", "tooltip-year")
      .attr("x", 0)
      .attr("y", innerHeight + 25)
      .style("font-size", "16px")
      .style("font-weight", 700)
      .style("fill", textColor)
      .attr("text-anchor", "middle")
      .text(firstYear);

  //Append SVG group to tooltip to contain both text and circles of sales breakdown    
  const tooltipContent = tooltip
    .append("g")
      .attr("transform", `translate(${-1 * tooltipWidth/2}, 
        ${-1 * margin.top + 30})`);
      
  //Append text element to group      
  const tooltipText = tooltipContent
    .append("text")
      .attr("class", "tooltip-content")
      .style("font-size", "14px")
      .style("font-weight", 500)
      .style("fill", textColor);

  //Get items for first data year    
  const dataFirstYear = data.find(item => item.year === firstYear);

  //Loop through music formats
  formatsInfo.forEach((format, i) => {

    //Append tspan element with text set to label of format for each format, followed by sales
    tooltipText
      .append("tspan")
        .attr("class", `sales-${format.id}`)
        .attr("x", 0)
        .attr("y", i * textLineHeight)
        .text(`${format.label}:
          ${d3.format(",.1r")(dataFirstYear[format.id])}M$`);

    //Append circle with color of format      
    tooltipContent
      .append("circle")
        .attr("cx", -10)
        .attr("cy", i * textLineHeight - 5)
        .attr("r", 6)
        .attr("fill", format.color);
  });

};

const handleMouseEvents = (data) => {

  // Handle the mouse events here

};