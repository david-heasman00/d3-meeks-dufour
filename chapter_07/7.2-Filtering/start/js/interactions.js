/*************************************/
/*  Create and populate the filters  */
/*************************************/
const populateFilters = (data) => {

  d3.select("#filters")                               //Select div #filters
    .selectAll(".filter")                             //Data binding pattern adding
    .data(filters)                                    //button for each obj in filter array
    .join("button")
      .attr("class", d => `filter ${d.isActive        //Set button class to name of 'filter'
        ? "active"                                    //if isActive = true, add class name "active"
        : ""                                          //Else no class
      }`)
      .text(d => d.label)                             //Set button text using filter's label property 
      //Add event lister
      .on("click", (e, d) => {
        console.log("DOM event", e)
        console.log("Attached datum", d);
      });
};


/****************************/
/*   Update the histogram   */
/****************************/
const updateHistogram = (selectedFilter, data) => {
  
  // Update the histogram here

};