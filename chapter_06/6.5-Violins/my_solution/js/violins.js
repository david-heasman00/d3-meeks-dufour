const drawViolinCharts = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 20, bottom: 55, left: 60};
  const width = 1000;
  const height = 400;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#violin")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner charts
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


  /*********************************/
  /*    Calculate the quartiles    */
  /*********************************/
  //Create roles array
  const roles = [
    {id: "Designer" },
    {id: "Scientist" },
    {id: "Developer" },
    {id: "Analyst" },
    {id: "Leadership" },
  ];
  
  //Loop through roles array and perform a bunch of calculations
  roles.forEach(role => {

    //Map salaries for current role into roles array with "salaries" key
    role["salaries"] = data
      .filter(d => d.role === role.id)
      .map(d => d.salary);

    //Calc mean value and store in "means" key in roles array
    role["mean"] = d3.mean(role.salaries);

    //Put salaries into bins under "bins" key in roles array
    role["bins"] = d3.bin()(role.salaries);

    //Calculate quartiles and put into "quartiles" key in roles array
    const quartilesScale = d3.scaleQuantile()
      .domain(role.salaries)
      .range([0, 1, 2, 3]);
    role["quartiles"] = quartilesScale.quantiles();
  });

  //Sort roles array in ascending order of mean value
  roles.sort((a, b) => a.mean - b.mean);

  /*********************************/
  /*    Declare scales             */
  /*********************************/
  //x point Scale to spread roles along x axis
  const xScale = d3.scalePoint()
    .domain(roles.map(d => d.id))
    .range([0, innerWidth])
    .padding(0.7);

  //Linear scale to distribute salaries on y axis  
  const maxSalary = d3.max(data, d => d.salary);
  const yScale = d3.scaleLinear()
    .domain([0, maxSalary])
    .range([innerHeight, 0])
    .nice();

  //Find length of tallest bin for the roles
  let maxBinLength = 0;
  roles.forEach(role => {
    const max = d3.max(role.bins, d => d.length);
    if (max > maxBinLength) {
      maxBinLength = max;
    }
  })

  //Declare linear scale responsible for calculating width of violin plot for each salary bracket
  const violinsScale = d3.scaleLinear()
    .domain([0, maxBinLength])
    .range([0, xScale.step()/2]);

  /*********************************/
  /*    Append Axes                */
  /*********************************/

  //Append x-axis
  const bottomAxis = d3.axisBottom(xScale)
    .tickSizeOuter(0);
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

//Append y-axis
const leftAxis = d3.axisLeft(yScale);
innerChart
  .append("g")
    .call(leftAxis);

//Add y-axis label
svg
  .append("text")
    .text("Yearly salary (USD)")
    .attr("x", 0)
    .attr("y", 20);
};