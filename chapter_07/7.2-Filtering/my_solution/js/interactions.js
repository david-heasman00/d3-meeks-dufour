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
        if (!d.isActive) {                                        //Verify clicked button isn't active

          filters.forEach(filter => {                             //Loop through arrays filter, update isActive based on which button
            filter.isActive = d.id === filter.id                  //was clicked
              ? true
              : false;
          });
          
          d3.selectAll(".filter")
            .classed("active", filter => filter.id === d.id
              ? true
              : false
            );
          
          updateHistogram(d.id, data);
        }
      });
};


/****************************/
/*   Update the histogram   */
/****************************/
const updateHistogram = (filterId, data) => {
  
  //Filter original dataset based on which button's been clicked
  const updatedData = filterId === "all"                            //Check if all
    ? data                                                          //Then return all data
    : data.filter(respondent => respondent.gender === filterId);    //Else return where respondent.gender is equal to filterId

  //Recalculate new bins on updated data
  const updatedBins = binGenerator(updatedData);

  //Bind new bins to histogram's rectangle elements, and update y and height
  d3.selectAll("#histogram rect")
    .data(updatedBins)
    .transition()                                                   //Add transition
      .duration(500)                                                //Duration 500ms
      .ease(d3.easeCubicOut)                                        //Transition easing CubicOut
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));
};