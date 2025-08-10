/*********************/
/* Create the Legend */
/*********************/
const addLegend = () => {

  //Create list of legend items
  const legendItems = d3.select(".legend-container")
    .append("ul")
      .attr("class", "color-legend")
    .selectAll(".color-legend-item")
    .data(formatsInfo)
    .join("li")
      .attr("class", "color-legend-item");

  //Span each list item and set background colour
  legendItems
    .append("span")
      .attr("class", "color-legend-item-color")
      .style("background-color", d => d.color);

  //Set text to correspond to label of music format
  legendItems
    .append("span")
      .attr("class", "color-legend-item-label")
      .text(d => d.label);
  
};