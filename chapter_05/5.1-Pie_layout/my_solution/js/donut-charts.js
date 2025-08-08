const drawDonutCharts = (data) => {
  // Create and set SVG containers
  const svg = d3.select("#donut")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
  const donutContainers = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Create SVG group for 3 donut charts with years in question
  const years = [1975, 1995, 2013];

  //Extract formats from column attribute of data and filter out "year" item
  const formats = data.columns.filter(format => format !== "year");

  years.forEach(year => {

    const donutContainer = donutContainers
      .append("g")
        .attr("transform", `translate(${xScale(year)}, ${innerHeight/2})`);
    
    //Retrieve data relayed to year of interest
    const yearData = data.find(d => d.year === year);
    
    //Initialize empty array for formatted data
    const formattedData = [];
   
    //For each format, create object containing format ID & sales for year of interest. Push object to formatted data array.
    formats.forEach(format => {
      formattedData.push({ format: format,
        sales: yearData[format]});
    });
  });

  //Initialize Pie Generator
  const pieGenerator = d3.pie()
    .value(d => d.sales);
  const annotatedData = pieGenerator(formattedData);
};