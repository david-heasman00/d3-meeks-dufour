const createTooltip = () => {

  //Append SVG group and give class name of "tooltip". 
  const tooltip = innerChart
    .append("g")
      .attr("class", "tooltip")
      .attr("opacity", 0);                                                                //Set initial opacity to 0 to hide it

  //Append rounded rectangle to tooltip selection with transparent aubergine fill-opacity    
  tooltip
    .append("rect")
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("fill", aubergine)
      .attr("fill-opacity", 0.75);

  //Append text element to tooltip selection    
  tooltip
    .append("text")
      .text("00.0°F")
      .attr("x", tooltipWidth/2)
      .attr("y", tooltipHeight/2 + 1)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "white")
      .style("font-weight", 900);

}

const handleMouseEvents = () => {
  
  //Select all circles contained in inner Chart
  innerChart.selectAll("circle")
    
    //Attach event listener to circles to detect when mouse goes over them
    .on("mouseenter", (e, d) => {
      
      //Select tooltip text element and change text to avg temp found in datum attached to circle
      d3.select(".tooltip text")
        .text(`${d3.format(".3")(d.avg_temp_F)}°F`);                                              //Use d3.format to limit number to 3 digits
      
      //Find position of pointed circle from cx and cy attributes and save to consts  
      const cx = e.target.getAttribute("cx"); 
      const cy = e.target.getAttribute("cy");

      //Translate tooltip using saved attributes
      d3.select(".tooltip")
        .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
        .transition()                                                                           //Add transition
          .duration(200)
          .style("opacity", 1);
    })
    
    //Attach event listener to circles for mouse leaving
    .on("mouseleave", (e, d) => {
      
      //Move tooltip away and set opacity to 0
      d3.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", `translate(0, 500)`);
    });
}