// Task 4 - Asynchronous File Operations
const fs = require('fs');
const path = require('path');

console.log('=== Task 4: Asynchronous File Operations ===\n');

// Define file path
const filePath = path.join(__dirname, 'output-async.txt');

console.log('Step 1: Starting asynchronous write...');

// Write to file asynchronously
fs.writeFile(filePath, 'Hello from asynchronous file operation!\nThis is written using fs.writeFile().', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    
    console.log('Step 3: File written successfully!');
    console.log('Step 4: Starting asynchronous read...');
    
    // Read from file asynchronously (inside the write callback to ensure write completes first)
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        
        console.log('Step 5: File content:');
        console.log('-----------------------------------');
        console.log(content);
        console.log('-----------------------------------');
        console.log('Step 6: Asynchronous operations completed!\n');
    });
});

console.log('Step 2: This executes BEFORE file operations complete (non-blocking)!');

/*
 * OBSERVATION:
 * In asynchronous operations, the code doesn't wait for file operations to complete.
 * Notice the order: 1 -> 2 -> 3 -> 4 -> 5 -> 6
 * Step 2 prints before Step 3 because writeFile is non-blocking.
 * 
 * DISCUSSION - When to avoid synchronous operations:
 * 1. Web Servers: Never use sync operations in servers - they block the entire event loop
 * 2. High-traffic apps: Sync operations prevent handling concurrent requests
 * 3. Real-time apps: Users experience freezing/lag during sync operations
 * 4. Large files: Sync operations can freeze the application for seconds
 * 
 * Use sync operations ONLY for:
 * - Startup configuration loading
 * - Command-line tools
 * - Build scripts
 */
