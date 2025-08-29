const populateFilters = () => {

  const filters = d3.select("#filters")
    .selectAll(".filter")
    .data(cetaceanFilters)
    .join("button")
      .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`);

  filters
    .append("span")
      .attr("class", "filter-icon")
      .style("background-image", d => `url(./assets/icon-${d.id}.svg)`);

  filters
    .append("span")
      .attr("class", "filter-text")
      .text(d => d.label);

};

const handleClickOnFilter = (data) => {

  //Select all buttons with class filter
  d3.selectAll(".filter")

    //Attach event listener for "click" event
    .on("click", (e, datum) => {

      //Check clicked button isn't already selected
      if (!datum.isActive) {

        //Update isActive properties for cetaceanFilters array
        cetaceanFilters.forEach(h => h.isActive = h.id === datum.id
          ? true
          : false
        );

        //Update "active" class name appropriately to above
        d3.selectAll(".filter")
          .classed("active", d => d.id === datum.id
            ? true
            : false
          );

        //Filter original dataset to conserve only cetaceans corresponding to selection  
        const updatedData = datum.id === "all"
          ? data
          : data.filter(d => d.hemisphere === datum.id);

        //Data binding pattern to update no of circles on screen, set position, radius and color
        innerChart
          .selectAll("circle")
          .data(updatedData)
          .join("circle")
          .transition()
            .attr("class", "cetacean")
            .attr("cx", d => xScale(d.global_population_estimate))
            .attr("cy", d => yScale(d.max_size_m))
            .attr("r", d => ReadableByteStreamController(d.max_weight_t))
            .attr("fill", d => colorScale(d.status))
            .attr("fill-opacity", 0.6)
            .attr("stroke", d => colorScale(d.status))
            .attr("stroke-width", 2);
      }
    });

};