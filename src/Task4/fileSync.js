// Task 4 - Synchronous File Operations
const fs = require('fs');
const path = require('path');

console.log('=== Task 4: Synchronous File Operations ===\n');

// Define file path
const filePath = path.join(__dirname, 'output-sync.txt');

console.log('Step 1: Writing to file synchronously...');

try {
    // Write to file synchronously
    fs.writeFileSync(filePath, 'Hello from synchronous file operation!\nThis is written using fs.writeFileSync().');
    console.log('Step 2: File written successfully!');

    // Read from file synchronously
    console.log('Step 3: Reading file synchronously...');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    console.log('Step 4: File content:');
    console.log('-----------------------------------');
    console.log(content);
    console.log('-----------------------------------');
    console.log('Step 5: Synchronous operations completed!\n');
} catch (error) {
    console.error('Error:', error.message);
}

console.log('This line executes AFTER all file operations because they are synchronous.');

/*
 * OBSERVATION:
 * In synchronous operations, each step completes before moving to the next.
 * The execution is blocked until the file operation finishes.
 * Notice the sequential order: 1 -> 2 -> 3 -> 4 -> 5 -> Final line
 */
