// Task 6 - Events & EventEmitter
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

console.log('=== Task 6: Events & EventEmitter ===\n');

// Create a custom event emitter
class UserActivityEmitter extends EventEmitter {}
const activityEmitter = new UserActivityEmitter();

// 1. Register a listener for 'login' event
console.log('Setting up event listeners...\n');

activityEmitter.on('login', (username) => {
    console.log(`[LOGIN EVENT] User "${username}" logged in successfully!`);
    console.log(`[LOGIN EVENT] Welcome back, ${username}!`);
});

// 2. Add a second listener for 'login' that triggers after a delay
activityEmitter.on('login', (username) => {
    setTimeout(() => {
        console.log(`[DELAYED LOGIN EVENT] Session created for ${username} (processed after 1.5s)`);
    }, 1500);
});

// 3. Register a listener for 'notify' event
activityEmitter.on('notify', (message, priority) => {
    console.log(`[NOTIFICATION] Priority: ${priority} | Message: ${message}`);
});

// 4. Emit the events
console.log('--- Emitting Events ---\n');

activityEmitter.emit('login', 'Sohaib');
console.log();

activityEmitter.emit('notify', 'New message received', 'High');
activityEmitter.emit('notify', 'System update available', 'Low');

// 5. OPTIONAL: Emit event after asynchronous file read
console.log('\n--- Optional: Event after File Read ---\n');

const fileReadEmitter = new EventEmitter();

// Register listener for file read completion
fileReadEmitter.on('fileReadComplete', (filename, content) => {
    console.log(`[FILE EVENT] Successfully read file: ${filename}`);
    console.log(`[FILE EVENT] Content length: ${content.length} characters`);
    console.log(`[FILE EVENT] First 50 characters: ${content.substring(0, 50)}...`);
});

// Register error listener
fileReadEmitter.on('fileReadError', (filename, error) => {
    console.log(`[FILE EVENT ERROR] Failed to read ${filename}: ${error.message}`);
});

// Read a file asynchronously and emit event when done
const testFilePath = path.join(__dirname, 'test-file.txt');

// Create test file first
fs.writeFile(testFilePath, 'This is a test file for demonstrating event emission after asynchronous file operations in Node.js!', (err) => {
    if (err) {
        fileReadEmitter.emit('fileReadError', 'test-file.txt', err);
        return;
    }
    
    // Now read the file
    fs.readFile(testFilePath, 'utf-8', (err, data) => {
        if (err) {
            fileReadEmitter.emit('fileReadError', 'test-file.txt', err);
        } else {
            fileReadEmitter.emit('fileReadComplete', 'test-file.txt', data);
        }
    });
});

// 6. Demonstrate once() - listener that fires only once
const oneTimeEmitter = new EventEmitter();

oneTimeEmitter.once('startup', () => {
    console.log('\n[ONCE EVENT] This event fires only once!');
});

// Emit multiple times, but listener only responds once
oneTimeEmitter.emit('startup');
oneTimeEmitter.emit('startup');
oneTimeEmitter.emit('startup');

console.log('\nNote: Watch for delayed events to appear after a short wait...\n');
