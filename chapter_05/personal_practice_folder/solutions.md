// Exercise Solutions

// These solutions provide the full implementation for each of the exercises presented
// in the 'D3 Data Formatting Practice' exercises.

// EXERCISE 1: Filtering an Array

const products = [
    { name: 'laptop', sales: 300 },
    { name: 'phone', sales: 0 },
    { name: 'tablet', sales: 120 },
    { name: 'headphones', sales: 45 },
    { name: 'desktop', sales: 0 }
];

// Solution:
// The `filter()` function is used to create a new array with only products that have more than zero sales.
const soldProducts = products.filter(product => product.sales > 0);

console.log("Products with sales:", soldProducts);

// EXERCISE 2: Mapping and Formatting Data

// Solution:
// The `map()` function is used to create an array of product names from the `soldProducts` array.
const productNames = soldProducts.map(product => product.name);

console.log("Product Names:", productNames);

// EXERCISE 3: Looping Through Data

// Solution:
// A `for` loop is used to iterate over the `products` array. Each product with sales greater than zero is added to the `formattedProducts` array.
const formattedProducts = [];

for (let i = 0; i < products.length; i++) {
    if (products[i].sales > 0) {
        formattedProducts.push(products[i].name);
    }
}

console.log("Formatted Product Names (using loop):", formattedProducts);

// EXERCISE 4: Combining Operations

// Solution:
// First, use the `filter()` function to remove products with zero sales.
// Then, use `map()` to create an array of product names.
// Finally, use `forEach()` to log each product name to the console.
const filteredAndMappedProducts = products.filter(product => product.sales > 0).map(product => product.name);

filteredAndMappedProducts.forEach(productName => {
    console.log("Product (from forEach):", productName);
});

// HOW TO VIEW RESULTS:
// For each of the exercises above, simply open the HTML file in your browser and open the Developer Tools (Inspect).
// Go to the Console tab to see the printed results of each exercise.
