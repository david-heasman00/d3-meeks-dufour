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

        //Define transition constant
        const transitionConstant = d3.transition()
          .duration(800)
          .ease(d3.easeExpOut);
        
        //Data binding pattern to update no of circles on screen, set position, radius and color
        innerChart
          .selectAll("circle")
          .data(updatedData, d => d.uid)                //Add key reference for enter, exit selection
          .join(
            //Enter selection
            enter => enter
              .append("circle")
                .attr("class", "cetacean")
                .attr("cx", d => xScale(d.global_population_estimate))
                .attr("cy", d => -50)                                       //Set circles to start off screen
                .attr("r", 0)                                               //Set circles to be 0 size
                .attr("fill", d => colorScale(d.status))
                .attr("fill-opacity", 0.6)
                .attr("stroke", d => colorScale(d.status))
                .attr("stroke-width", 2)
                .attr("opacity", 0)                                         //Set circles to be invisible
              //Call method, transitioning enter selection to where we want them to go
              .call(enter => enter.transition(transitionConstant)                             
                .attr("cy", d => yScale(d.max_size_m))
                .attr("r", d => rScale(d.max_weight_t))
                .style("opacity", 1)
              ),
            //Update selection. Still chained even though we don't want anything to happen
            update => update,
            
            //Exit selection
            exit => exit
              .call(exit => exit.transition(transitionConstant)
                .attr("cy", d => innerHeight)                                 //Set circles to exit off screen
                .attr("r", 0)                                                 //And to have zero size
                .style("opacity", 0)                                          //And to be invisible
                .remove()                                                     //And to be removed from the DOM
            )
          )
      }
    });

};