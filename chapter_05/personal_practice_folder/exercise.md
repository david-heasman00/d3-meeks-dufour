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

// HINT: Use the `filter()` function to iterate through each product and check if the sales are greater than zero.

console.log("Filtered products with sales:", soldProducts);
```

**HOW TO VIEW RESULTS**:
Open the `index.html` file in your browser (e.g., Chrome). Then right-click on the page and select "Inspect". Go to the "Console" tab to view the output from `console.log()`.

#### EXERCISE 2: Mapping and Formatting Data

Now that you've filtered the products, let's extract just the product names from the filtered array.

```javascript
// TASK:
// Use the `map()` function to create an array of product names from `soldProducts`.
// Use `console.log()` to output this array.
// HINT: Use the `map()` function to extract the `name` property from each product in the `soldProducts` array.


console.log("Product Names:", productNames);
```
### Exercise 3: Formatting Sales Data Using Loops

This exercise will help you practice extracting values from an object and transforming them into a new structured format. The goal is to make the data more suitable for visualizations like those you see in D3.js. This exercise is similar to Listing 5.3 in *D3.js in Action*, focusing on **looping** through data and **reformatting** it.

##### Step-by-Step Instructions

You have an object representing sales figures for different products for a particular year. Your task is to **format** this data into an array of objects where each object contains the product type and its corresponding sales value.

##### Step 1: Initial Object
Define the initial object called `yearData` that contains different products and their sales for a specific year.

```javascript
const yearData = {
  year: 2023,
  vinyl: 8061.8,
  eight_track: 2770.4,
  cassette: 1256.3
};
```

##### Step 2: Extract the Product Types
- Extract all keys from the `yearData` object **except** the key called `"year"`.
- Use the `Object.keys()` method to get the keys of the object.
- Use `.filter()` to remove the `"year"` key.

```javascript
const formats = Object.keys(yearData).filter(key => key !== "year");
```

##### Step 3: Create `formattedData` Array
- Create an empty array called `formattedData`.
- Use `.forEach()` to loop through the list of product types (`formats`).
- For each product type, create an object that contains `product` and `sales` values.
- Push each newly created object into `formattedData`.

##### Skeleton Code (Without Full Solution)

```javascript
// Step 1: Define yearData
const yearData = {
  year: 2023,
  vinyl: 8061.8,
  eight_track: 2770.4,
  cassette: 1256.3
};

// Step 2: Get keys and filter out "year"
const formats = Object.keys(yearData).filter(key => key !== "year");

// Step 3: Create formattedData array
const formattedData = [];

formats.forEach(format => {
  // Your task: push an object { product: format, sales: yearData[format] } to formattedData
});

console.log(formattedData);
```

### Task Overview
- Extract the **product types** using `Object.keys()` and filter out `"year"`.
- Use `.forEach()` to **loop** through the `formats` array.
- **Push** the `product` and `sales` data into `formattedData`.

### Expected Output
After completing the exercise, the `formattedData` array should look like this:

```javascript
[
  { product: "vinyl", sales: 8061.8 },
  { product: "eight_track", sales: 2770.4 },
  { product: "cassette", sales: 1256.3 }
]
```

### Reflection
This exercise helps you understand how to:
- Extract keys from an object and filter them based on a condition.
- Use `.forEach()` to **loop** through an array and perform actions.
- Build a new **formatted array** to prepare data for further use, similar to what’s done in D3.js.

Once you're done, try comparing this to Listing 5.3 in *D3.js in Action* to see if you better understand the data transformation happening there.

Good luck, and have fun transforming the data! 😊

**HOW TO VIEW RESULTS**:
For each of the exercises above, simply open the HTML file in your browser and open the Developer Tools (Inspect). Go to the Console tab to see the printed results of each exercise.

When you're comfortable with these exercises, try experimenting with different arrays and conditions to challenge yourself further!
