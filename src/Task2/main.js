// Task 2 - Importing and using custom modules
// Import the functions from mathOperations module

const { add, multiply } = require('./mathOperations');

console.log('=== Task 2: Modules & Importing ===\n');

// Test the imported functions
const num1 = 10;
const num2 = 5;

console.log(`Adding ${num1} + ${num2} = ${add(num1, num2)}`);
console.log(`Multiplying ${num1} × ${num2} = ${multiply(num1, num2)}`);

// Test with different values
const a = 25;
const b = 4;

console.log(`\nAdding ${a} + ${b} = ${add(a, b)}`);
console.log(`Multiplying ${a} × ${b} = ${multiply(a, b)}`);
