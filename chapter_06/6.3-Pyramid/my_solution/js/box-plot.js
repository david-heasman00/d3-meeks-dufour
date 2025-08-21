const drawBoxplot = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 30, bottom: 25, left: 60};
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#boxplot")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

  /*******************************/
  /*    Calculate the quartiles  */
  /*******************************/
  //Filter male and female salaries
  const femaleSalaries = data.filter(d => d.gender === "Female").map(d => d.salary);
  const maleSalaries = data.filter(d => d.gender === "Male").map(d => d.salary);

  //Scales
  const femaleQuartilesScale = d3.scaleQuantile()
    .domain(femaleSalaries)
    .range([0, 1, 2, 3]);  

  const maleQuartilesScale = d3.scaleQuantile()
    .domain(maleSalaries)
    .range([0, 1, 2, 3]);

  //Compute Quartiles and min and max
  const femaleQuartiles = femaleQuartilesScale.quantiles();
  const femaleExtent = d3.extent(femaleSalaries);

  const maleQuartiles = maleQuartilesScale.quantiles();
  const maleExtent = d3.extent(maleSalaries);

  /*******************************/
  /*    Draw Axes                */
  /*******************************/
  //point scale for x axis
  const genders = ["Female", "Male"];
  const xScale = d3.scalePoint()
    .domain(genders)
    .range([0, innerWidth])
    .padding(0.5);

  //y axis scale
  const maxSalary = d3.max(data, d => d.salary);
  const yScale = d3.scaleLinear()
    .domain([0, maxSalary])
    .range([innerHeight, 0])
    .nice();

  //Draw x Axis
  const bottomAxis = d3.axisBottom(xScale)
    .tickSizeOuter(0);
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  //Draw y axis
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .call(leftAxis);

  //Labels
  svg
    .append("text")
      .text("Yearly salary (USD)")
      .attr("x", 0)
      .attr("y", 20);

  /*******************************/
  /*    Draw Box Plots           */
  /*******************************/
  //Constant for Box Plot Size
  const boxplotWidth = 60;
  const boxplotStrokeWidth = 3;

  //Now we will draw the box plot, looping through the gender array we declared earlier (y'know....genders = Female, Male)

  genders.forEach(gender => {

    const boxplotContainer = innerChart                                       //Create SVG container for each gender
      .append("g")
        .attr("stroke", slateGray)
        .attr("stroke-width", boxplotStrokeWidth);
    
    //Append the boxes
    boxplotContainer                                                          //Append rectangle element to group. X and Y attributes set using scales earlier and common sense
      .append("rect")
        .attr("x", xScale(gender) - boxplotWidth/2)                           //Set top left x of rectangle to the scale of the gender, minus half of the boxplotwidth
        .attr("y", gender === "Female"                                        //If gender = female
          ? yScale(femaleQuartiles[2])                                       //Set y attrbiute to upper quartile of females
          : yScale(maleQuartiles[2])                                         //Else set to uper quartile of males
        )
        .attr("width", boxplotWidth)
        .attr("height", gender === "Female"                                   //If gender = female
          ? yScale(femaleQuartiles[0]) - yScale(femaleQuartiles[2])           //height of box is female lower quartile - female upper quartile - scaled (remember svg draws top to bottom)
          : yScale(maleQuartiles[0]) - yScale(maleQuartiles[2])               //Else use male values
        )
        .attr("fill", "transparent");

    //Append the median line
    boxplotContainer
      .append("line")
        .attr("x1", xScale(gender) - boxplotWidth/2)
        .attr("x2", xScale(gender) + boxplotWidth/2)
        .attr("y1", gender === "Female"
          ? yScale(femaleQuartiles[1])
          : yScale(maleQuartiles[1])
        )
        .attr("y2", gender === "Female"
          ? yScale(femaleQuartiles[1])
          : yScale(maleQuartiles[1])
        )
        .attr("stroke", gender === "Female"
          ? womenColor
          :menColor
        )
        .attr("stroke-width", 10);
    
    //Append the whiskers
    //Bottom vertical line
    boxplotContainer
      .append("line")
        .attr("x1", xScale(gender))
        .attr("x2", xScale(gender))
        .attr("y1", gender === "Female"                                       //Set y1 to be min values of each gender
          ? yScale(femaleExtent[0])
          : yScale(maleExtent[0])
        )
        .attr("y2", gender === "Female"                                       //Set y2 to be lower quartile of each gender
          ? yScale(femaleQuartiles[0])
          : yScale(maleQuartiles[0])
        );    

    //Bottom horizontal line
    boxplotContainer
      .append("line")
        .attr("x1", xScale(gender) - boxplotWidth/2)                          //Set x1 and x2 to be width of boxPlot, located around the gender
        .attr("x2", xScale(gender) + boxplotWidth/2)
        .attr("y1", gender === "Female"                                       //Set y1 and y2 to be the min value of each gender
          ? yScale(femaleExtent[0])
          : yScale(maleExtent[0])
        )
        .attr("y2", gender === "Female"
          ? yScale(femaleExtent[0])
          : yScale(maleExtent[0])
        );

    //Top vertical line
    boxplotContainer
      .append("line")
        .attr("x1", xScale(gender))
        .attr("x2", xScale(gender))
        .attr("y1", gender === "Female"                                       //Set y1 to be max values of each gender                                   
          ? yScale(femaleExtent[1])
          : yScale(maleExtent[1])
        )
        .attr("y2", gender === "Female"                                       //Set y2 to be upper quartile of each gender
          ? yScale(femaleQuartiles[2])
          : yScale(maleQuartiles[2])
        );   


    //Top horizontal line
    boxplotContainer
      .append("line")
        .attr("x1", xScale(gender) - boxplotWidth/2)
        .attr("x2", xScale(gender) + boxplotWidth/2)
        .attr("y1", gender === "Female"                                       //Set y1 and y2 to be the max value of each gender
          ? yScale(femaleExtent[1])
          : yScale(maleExtent[1])
        )
        .attr("y2", gender === "Female"
          ? yScale(femaleExtent[1])
          : yScale(maleExtent[1])
        );
  });
};