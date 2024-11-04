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