const drawDonutCharts = (data) => {
  // Create and set SVG containers
  const svg = d3.select("#donut")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
  const donutContainers = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Create SVG group for 3 donut charts with years in question
  //Extract formats from column attribute of data and filter out "year" item
  const years = [1975, 1995, 2013];
  const formats = data.columns.filter(format => format !== "year");
  years.forEach(year => {
    // Append a group for each year and translate it to the proper position
    const donutContainer = donutContainers
      .append("g")
        .attr("transform", `translate(${xScale(year)}, ${innerHeight/2})`);
    
    // Prep data for pie generator
    //console.log("original data", data)      //See original data in log before its formatted
    const yearData = data.find(d => d.year === year);   // Find data for the year of interest
    const formattedData = [];     //Create empty array to hold formatted data
    //For each format, create object containing format ID & sales for year of interest. Push object to formatted data array.
    formats.forEach(format => {
      formattedData.push({ format: format,
        sales: yearData[format] });
    });
    //console.log("formattedData", formattedData);  //log formatted Data to see how it changes
    
    //***************/
    //Draw Pie Charts
    //**************/
    //Initialize Pie Generator
    const pieGenerator = d3.pie()
      .value(d => d.sales);       //Tell d3.pie which 'value' will determine the size of the arc slice

    //Call pie generator to obtain annotated data (and log it)
    const annotatedData = pieGenerator(formattedData);
    //console.log("annotatedData", annotatedData)

    //Create arc generator function
    const arcGenerator = d3.arc()
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle)
      .innerRadius(60)
      .outerRadius(100)
      .padAngle(0.02)
      .cornerRadius(3);

    //Data binding pattern - generate one path element for each object in annotatated dataset
    const arcs = donutContainer
      .selectAll(`.arc-${year}`)        //Select by arc class year (declared couple lines below)
      .data(annotatedData)
      //.join("path")
        //.attr("class", `arc-${year}`)   //Give each arc a class year corresponding to its name
        //.attr("d", arcGenerator)
        //.attr("fill", d => colorScale(d.data.format));
        //Append svg groups
        .join("g")
          .attr("class", `arc-${year}`);
    //Draw arcs
    arcs
      .append("path")
        .attr("d", arcGenerator)
        .attr("fill", d => colorScale(d.data.format));
    //Text labels
    arcs
      .append("text")
        .text(d => {                                                        //Set arc text by calculating % occupied by each arc
          d["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI);    //then store value in bound data d["percentage"]
          return d3.format(".0%")(d.percentage);
        })
        .attr("x", d => {                                                   //Get position of arc centroid, and store in bound 
          d["centroid"] = arcGenerator                                      //data (d["centroid"]) then use to set x and y attr of labels
            .startAngle(d.startAngle)
            .endAngle(d.endAngle)
            .centroid();
          return d.centroid[0];
        })
        .attr("y", d => d.centroid[1])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#f6fafc")
        .attr("fill-opacity", d => d.percentage < 0.05 ? 0 : 1 )            //short hand case when syntax for if percentage < 0.05, then set fill opacity to 0, else 1
        .style("font-size", "16px")
        .style("font-weight", 500);

    //Year labels
    donutContainer
      .append("text")
        .text(year)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "24px")
        .style("font-weight", 500);
  });
};