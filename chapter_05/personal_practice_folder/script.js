const products = [
    { name: 'laptop', sales: 300 },
    { name: 'phone', sales: 0 },
    { name: 'tablet', sales: 120 },
    { name: 'headphones', sales: 45 },
    { name: 'desktop', sales: 0 }
];

//Exercise 1

const soldProducts = products.filter(d => d.sales > 0);

console.log("Filtered products with sales:", soldProducts);

//Exercise 2

const productNames = products.map(d => d.name);

console.log("Product Names:", productNames);

//Exercise 3

//*Define initial object */
const yearData = {
    year: 2023,
    vinyl: 8061.8,
    eight_track: 2770.4,
    cassette: 1256.3
  };

//* Extract product types */

const formats = Object.keys(yearData).filter(key => key !== "year");
console.log(formats);

//* Step 3 create formatted Data array and push objects */

const formattedData = [];

formats.forEach(format => {
    formattedData.push({ format: format, sales: yearData[format]})
});

console.log(formattedData);