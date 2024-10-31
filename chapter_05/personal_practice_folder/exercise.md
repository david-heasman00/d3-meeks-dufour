# Exercise Instructions

The following exercises are designed to help you practice array manipulation, filtering data, and looping to format data for use in D3.js visualizations. The goal is to help you strengthen your understanding of how to work with JavaScript arrow functions, `filter()`, `map()`, and loops to prepare data.

## STEP 1: Set Up Your Development Environment

Create a new folder called `d3-practice`. Inside, create two files:
  1. `index.html`
  2. `script.js`

You will be editing these files to complete each exercise.

### index.html (create this file in the same folder)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D3 Data Formatting Practice</title>
</head>
<body>
    <h1>D3 Data Formatting Practice</h1>
    <script src="script.js"></script>
</body>
</html>
```

### script.js (create this file in the same folder)

#### EXERCISE 1: Filtering an Array

Let's work with a simple array of product sales data to practice using the `filter()` method. In this example, we want to filter out products that have zero sales.

```javascript
const products = [
    { name: 'laptop', sales: 300 },
    { name: 'phone', sales: 0 },
    { name: 'tablet', sales: 120 },
    { name: 'headphones', sales: 45 },
    { name: 'desktop', sales: 0 }
];

// TASK:
// Write a filter function to keep only products that have more than zero sales.
// Use `console.log()` to output the filtered array to the browser's console.
const soldProducts = products.filter(product => product.sales > 0);

console.log("Products with sales:", soldProducts);
```

**HOW TO VIEW RESULTS**:
Open the `index.html` file in your browser (e.g., Chrome). Then right-click on the page and select "Inspect". Go to the "Console" tab to view the output from `console.log()`.

#### EXERCISE 2: Mapping and Formatting Data

Now that you've filtered the products, let's extract just the product names from the filtered array.

```javascript
// TASK:
// Use the `map()` function to create an array of product names from `soldProducts`.
// Use `console.log()` to output this array.
const productNames = soldProducts.map(product => product.name);

console.log("Product Names:", productNames);
```

#### EXERCISE 3: Looping Through Data

Let's revisit our `products` array. This time, instead of using `filter()` and `map()`, let's manually loop through the array and format our data.

```javascript
// TASK:
// Write a `for` loop to iterate over the `products` array. For each product, check if the sales are greater than zero.
// If they are, push the product name into a new array called `formattedProducts`. Use `console.log()` to view the final result.
const formattedProducts = [];

for (let i = 0; i < products.length; i++) {
    if (products[i].sales > 0) {
        formattedProducts.push(products[i].name);
    }
}

console.log("Formatted Product Names (using loop):", formattedProducts);
```

#### EXERCISE 4: Combining Operations

Let's take it up a notch and combine `filter()`, `map()`, and `forEach()`.

```javascript
// TASK:
// First, filter out the products that have zero sales.
// Then, map the result to an array of product names.
// Finally, use `forEach()` to log each product name individually to the console.
const filteredAndMappedProducts = products.filter(product => product.sales > 0).map(product => product.name);

filteredAndMappedProducts.forEach(productName => {
    console.log("Product (from forEach):", productName);
});
```

**HOW TO VIEW RESULTS**:
For each of the exercises above, simply open the HTML file in your browser and open the Developer Tools (Inspect). Go to the Console tab to see the printed results of each exercise.

When you're comfortable with these exercises, try experimenting with different arrays and conditions to challenge yourself further!
