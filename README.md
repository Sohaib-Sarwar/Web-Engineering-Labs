# Lab 10: Introduction to Node.js

**Course:** CS344 - Web Engineering  
**Semester:** Fall 2025  
**Date:** November 20, 2025  
**Instructor:** Ms. Naema Asif  
**Student:** Sohaib Mughal  
**Registration No.:** 465597  
**Section:** BESE14A

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Project Structure](#project-structure)
4. [Task 1: Hello Node](#task-1-hello-node)
5. [Task 2: Modules & Importing](#task-2-modules--importing)
6. [Task 3: package.json & npm Scripts](#task-3-packagejson--npm-scripts)
7. [Task 4: File System Operations](#task-4-file-system-operations)
8. [Task 5: Path & OS Modules](#task-5-path--os-modules)
9. [Task 6: Events & EventEmitter](#task-6-events--eventemitter)
10. [Task 7: HTTP Server](#task-7-http-server)
11. [Task 8: Third Party Packages](#task-8-third-party-packages)
12. [How to Run](#how-to-run)
13. [Testing](#testing)
14. [Troubleshooting](#troubleshooting)
15. [Submission Guidelines](#submission-guidelines)

---

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Code editor (Visual Studio Code recommended)
- Terminal or Command Prompt access

---

## Setup Instructions

### Verify Installation

First, verify that Node.js and npm are installed:

```bash
node --version
npm --version
```

### Navigate to Project Directory

```bash
cd Web_Sohaib_465597_BESE14A
```

### Install Dependencies

Install all required packages:

```bash
npm install
```

This command will install:
- `chalk` - Terminal string styling with colors
- `express` - Web application framework
- `nodemon` - Development tool for auto-restarting (devDependency)

---

## Project Structure

```
Web_Sohaib_465597_BESE14A/
├── src/
│   ├── Task1/
│   │   └── hello.js
│   ├── Task2/
│   │   ├── mathOperations.js
│   │   └── main.js
│   ├── Task3/
│   │   └── README.md
│   ├── Task4/
│   │   ├── fileSync.js
│   │   └── fileAsync.js
│   ├── Task5/
│   │   └── pathAndOs.js
│   ├── Task6/
│   │   └── events.js
│   ├── Task7/
│   │   └── server.js
│   └── Task8/
│       ├── usePackage.js
│       └── expressServer.js
├── package.json
├── README.md
└── LAB_REPORT.md
```

---

## Task 1: Hello Node

### Objective

Understand how Node.js runs JavaScript and observe asynchronous behaviour.

### Implementation

**File:** `src/Task1/hello.js`

```javascript
console.log('Start - This runs first');

setTimeout(() => {
    console.log('Delayed message - This runs last (after 2 seconds)');
}, 2000);

console.log('End - This runs second');
```

### Execution

```bash
npm run task1
```

### Expected Output

```
Start - This runs first
End - This runs second
Delayed message - This runs last (after 2 seconds)
```

### Questions and Answers

**Q1: Which line prints last? Why?**

**Answer:** The line inside the `setTimeout` callback function prints last because it is asynchronous. The `setTimeout` function schedules the callback to be executed after a specified delay. JavaScript's event loop first executes all synchronous code on the call stack, and then processes asynchronous callbacks from the event queue after the specified delay has elapsed.

**Q2: What does this tell you about Node's event loop?**

**Answer:** This demonstrates that Node.js operates on a non-blocking, event-driven architecture. The event loop allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. When asynchronous operations are initiated (like timers, file I/O, or network requests), they are delegated to the system kernel or thread pool, and callbacks are queued to be executed once the operations complete. This architecture enables Node.js to handle thousands of concurrent connections efficiently.

---

## Task 2: Modules & Importing

### Objective

Learn how to create custom modules and import them using CommonJS syntax.

### Implementation

**File 1:** `src/Task2/mathOperations.js` (Module)

```javascript
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

module.exports = { add, multiply };
```

**File 2:** `src/Task2/main.js` (Consumer)

```javascript
const { add, multiply } = require('./mathOperations');

console.log('=== Task 2: Modules & Importing ===\n');

const num1 = 10;
const num2 = 5;

console.log(`Adding ${num1} + ${num2} = ${add(num1, num2)}`);
console.log(`Multiplying ${num1} × ${num2} = ${multiply(num1, num2)}`);

const a = 25;
const b = 4;

console.log(`\nAdding ${a} + ${b} = ${add(a, b)}`);
console.log(`Multiplying ${a} × ${b} = ${multiply(a, b)}`);
```

### Execution

```bash
npm run task2
```

### Expected Output

```
=== Task 2: Modules & Importing ===

Adding 10 + 5 = 15
Multiplying 10 × 5 = 50

Adding 25 + 4 = 29
Multiplying 25 × 4 = 100
```

---

## Task 3: package.json & npm Scripts

### Objective

Learn how to use npm scripts and understand the difference between dependencies and devDependencies.

### Configuration

The `package.json` file contains the following scripts:

```json
{
  "scripts": {
    "task1": "node src/Task1/hello.js",
    "task2": "node src/Task2/main.js",
    "task4-sync": "node src/Task4/fileSync.js",
    "task4-async": "node src/Task4/fileAsync.js",
    "task5": "node src/Task5/pathAndOs.js",
    "task6": "node src/Task6/events.js",
    "task7": "node src/Task7/server.js",
    "task8": "node src/Task8/usePackage.js",
    "task8-express": "node src/Task8/expressServer.js",
    "dev:task7": "nodemon src/Task7/server.js",
    "dev:task8": "nodemon src/Task8/expressServer.js"
  }
}
```

### Installed Packages

**Production Dependencies:**
- `chalk` - Terminal string styling
- `express` - Web application framework

**Development Dependencies:**
- `nodemon` - Auto-restart tool for development

### Execution

View all available scripts:

```bash
npm run
```

Execute a specific script:

```bash
npm run task1
```

### Question and Answer

**Q: What is the difference between dependencies and devDependencies?**

**Answer:**

**Dependencies** are packages required for the application to run in production. These include libraries and frameworks that the application needs at runtime, such as `express` for web servers or database drivers. They are installed with `npm install <package>` and are included in production deployments.

**DevDependencies** are packages required only during development and testing phases. These include tools like `nodemon` for auto-restarting during development, testing frameworks, linters, and build tools. They are installed with `npm install --save-dev <package>` and are excluded when installing packages in production using `npm install --production`.

This separation provides several benefits:
1. Reduced production bundle size
2. Faster deployment times
3. Improved security by minimizing attack surface
4. Clearer project documentation
5. Cost savings in cloud environments with metered bandwidth

---

## Task 4: File System Operations

### Objective

Demonstrate the difference between synchronous and asynchronous file operations using the `fs` module.

### Implementation Part A: Synchronous Operations

**File:** `src/Task4/fileSync.js`

```javascript
const fs = require('fs');
const path = require('path');

console.log('=== Task 4: Synchronous File Operations ===\n');

const filePath = path.join(__dirname, 'output-sync.txt');

console.log('Step 1: Writing to file synchronously...');

try {
    fs.writeFileSync(filePath, 'Hello from synchronous file operation!\nThis is written using fs.writeFileSync().');
    console.log('Step 2: File written successfully!');

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
```

### Execution

```bash
npm run task4-sync
```

### Implementation Part B: Asynchronous Operations

**File:** `src/Task4/fileAsync.js`

```javascript
const fs = require('fs');
const path = require('path');

console.log('=== Task 4: Asynchronous File Operations ===\n');

const filePath = path.join(__dirname, 'output-async.txt');

console.log('Step 1: Starting asynchronous write...');

fs.writeFile(filePath, 'Hello from asynchronous file operation!\nThis is written using fs.writeFile().', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    
    console.log('Step 3: File written successfully!');
    console.log('Step 4: Starting asynchronous read...');
    
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
```

### Execution

```bash
npm run task4-async
```

### Observations

**Synchronous Execution Order:** 1 → 2 → 3 → 4 → 5 → Final line

**Asynchronous Execution Order:** 1 → 2 → 3 → 4 → 5 → 6

In asynchronous operations, Step 2 executes before Step 3 because the file write operation does not block code execution.

### Discussion Question

**When should you avoid synchronous operations in real applications?**

**Answer:**

Synchronous operations should be avoided in the following scenarios:

**1. Web Servers and HTTP Request Handlers**
- Synchronous operations block the entire event loop
- While one request waits for a file read, all other incoming requests are blocked
- Results in poor performance, timeouts, and inability to handle concurrent requests

**2. High-Traffic Applications**
- Applications with multiple concurrent users experience severe degradation
- Each blocked operation prevents the server from processing other requests
- Can lead to cascading failures and server crashes under load

**3. Real-Time Applications**
- Chat applications, live dashboards, and gaming servers require immediate responsiveness
- Synchronous operations cause freezing and lag
- Violates user expectations for real-time interaction

**4. Large File Processing**
- Reading or writing large files (100+ MB) can freeze the application for several seconds
- All other operations are blocked during this time
- Memory issues can occur with very large files

**Appropriate Use Cases for Synchronous Operations:**

1. Application startup and configuration loading (one-time operations)
2. Command-line tools and build scripts
3. Simple sequential scripts where concurrency is not required
4. Initial setup tasks before the event loop starts accepting connections

**Best Practice:** In production web servers and applications requiring concurrency, always use asynchronous operations for I/O operations (file system, database, network).

---

## Task 5: Path & OS Modules

### Objective

Work with system information using the `path` and `os` modules.

### Implementation

**File:** `src/Task5/pathAndOs.js`

```javascript
const path = require('path');
const os = require('os');
const fs = require('fs');

console.log('=== Task 5: Path & OS Modules ===\n');

// 1. Display current file name
console.log('1. CURRENT FILE INFORMATION:');
console.log('   File name:', path.basename(__filename));
console.log('   Directory name:', path.dirname(__filename));
console.log('   File extension:', path.extname(__filename));

// 2. Create a joined path
console.log('\n2. PATH OPERATIONS:');
const mockResourcePath = path.join(__dirname, 'data', 'users', 'profile.json');
console.log('   Mock resource path:', mockResourcePath);
console.log('   Is absolute path?', path.isAbsolute(mockResourcePath));

// 3. Display platform information
console.log('\n3. OPERATING SYSTEM INFORMATION:');
console.log('   Platform:', os.platform());
console.log('   OS Type:', os.type());
console.log('   OS Release:', os.release());
console.log('   CPU Architecture:', os.arch());

// 4. Display memory details
console.log('\n4. MEMORY INFORMATION:');
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;

console.log('   Total Memory:', (totalMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   Free Memory:', (freeMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   Used Memory:', (usedMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   Memory Usage:', ((usedMemory / totalMemory) * 100).toFixed(2), '%');

// 5. CPU Information
console.log('\n5. CPU INFORMATION:');
const cpus = os.cpus();
console.log('   CPU Cores:', cpus.length);
console.log('   CPU Model:', cpus[0].model);

// 6. User Information
console.log('\n6. USER INFORMATION:');
console.log('   Username:', os.userInfo().username);
console.log('   Home Directory:', os.homedir());

// 7. List files in current directory with extensions
console.log('\n7. FILES IN CURRENT DIRECTORY:');
const currentDir = __dirname;
const files = fs.readdirSync(currentDir);

console.log(`   Directory: ${currentDir}\n`);
files.forEach((file, index) => {
    const fullPath = path.join(currentDir, file);
    const stats = fs.statSync(fullPath);
    const ext = path.extname(file);
    const fileType = stats.isDirectory() ? '[DIR]' : '[FILE]';
    
    console.log(`   ${index + 1}. ${fileType} ${file}`);
    if (!stats.isDirectory() && ext) {
        console.log(`      Extension: ${ext}`);
    }
});
```

### Execution

```bash
npm run task5
```

---

## Task 6: Events & EventEmitter

### Objective

Create and respond to custom events using the EventEmitter class.

### Implementation

**File:** `src/Task6/events.js`

```javascript
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

fileReadEmitter.on('fileReadComplete', (filename, content) => {
    console.log(`[FILE EVENT] Successfully read file: ${filename}`);
    console.log(`[FILE EVENT] Content length: ${content.length} characters`);
    console.log(`[FILE EVENT] First 50 characters: ${content.substring(0, 50)}...`);
});

fileReadEmitter.on('fileReadError', (filename, error) => {
    console.log(`[FILE EVENT ERROR] Failed to read ${filename}: ${error.message}`);
});

const testFilePath = path.join(__dirname, 'test-file.txt');

fs.writeFile(testFilePath, 'This is a test file for demonstrating event emission after asynchronous file operations in Node.js!', (err) => {
    if (err) {
        fileReadEmitter.emit('fileReadError', 'test-file.txt', err);
        return;
    }
    
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

oneTimeEmitter.emit('startup');
oneTimeEmitter.emit('startup');
oneTimeEmitter.emit('startup');

console.log('\nNote: Watch for delayed events to appear after a short wait...\n');
```

### Execution

```bash
npm run task6
```

---

## Task 7: HTTP Server

### Objective

Build a basic HTTP server using the `http` module.

### Implementation

**File:** `src/Task7/server.js`

```javascript
const http = require('http');
const url = require('url');

const PORT = 3000;
const HOSTNAME = 'localhost';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);
    
    if (pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Node.js HTTP Server</title>
            </head>
            <body>
                <h1>Welcome to Node.js HTTP Server!</h1>
                <p><strong>Lab 10:</strong> Introduction to Node.js</p>
                <p><strong>Task 7:</strong> Basic HTTP Server</p>
            </body>
            </html>
        `);
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>404 - Not Found</title>
            </head>
            <body>
                <h1>404 - Page Not Found</h1>
                <p>The page <strong>${pathname}</strong> does not exist.</p>
                <a href="/">Go Back Home</a>
            </body>
            </html>
        `);
    }
});

server.listen(PORT, HOSTNAME, () => {
    console.log('=== Task 7: Basic HTTP Server ===\n');
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
    console.log('--- Request Log ---');
});
```

### Execution

```bash
npm run task7
```

Or with auto-restart during development:

```bash
npm run dev:task7
```

### Testing

Open a web browser and navigate to:
- `http://localhost:3000/` - Returns home page (200 OK)
- `http://localhost:3000/about` - Returns 404 error page

### Questions and Answers

**Q1: How would you return JSON instead of text?**

**Answer:** To return JSON, set the `Content-Type` header to `application/json` and use `JSON.stringify()` to convert the JavaScript object:

```javascript
res.setHeader('Content-Type', 'application/json');
const jsonData = {
    message: 'Hello from Node.js',
    status: 'success',
    timestamp: new Date().toISOString()
};
res.end(JSON.stringify(jsonData));
```

**Q2: How would you extend this to serve actual HTML files?**

**Answer:** Use the `fs` module to read HTML files from the filesystem:

```javascript
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views', 'index.html');
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    }
});
```

---

## Task 8: Third Party Packages

### Objective

Install and use npm packages for enhanced functionality.

### Implementation Part A: Terminal Styling

**File:** `src/Task8/usePackage.js`

```javascript
// Using ANSI color codes for terminal styling

console.log('=== Task 8: Using Third Party Packages ===\n');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    underscore: '\x1b[4m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
};

console.log(colors.blue + 'Basic blue text' + colors.reset);
console.log(colors.green + 'Success: Operation completed!' + colors.reset);
console.log(colors.red + 'Error: Something went wrong!' + colors.reset);
console.log(colors.yellow + 'Warning: Please review this message.' + colors.reset);

const username = 'Sohaib';
const score = 95;

console.log(`Welcome ${colors.blue}${colors.bright}${username}${colors.reset}!`);
console.log(`Your score: ${colors.green}${colors.bright}${score}%${colors.reset}`);
```

### Execution

```bash
npm run task8
```

### Implementation Part B: Express Framework (Optional)

**File:** `src/Task8/expressServer.js`

```javascript
const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Express.js Server</h1><p>A modern Node.js web framework</p>');
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Sohaib', role: 'Student' },
        { id: 2, name: 'Ali', role: 'Student' },
        { id: 3, name: 'Ahmed', role: 'Instructor' }
    ];
    res.json({ success: true, data: users });
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const users = [
        { id: 1, name: 'Sohaib', role: 'Student', email: 'sohaib@example.com' },
        { id: 2, name: 'Ali', role: 'Student', email: 'ali@example.com' }
    ];
    
    const user = users.find(u => u.id === userId);
    
    if (user) {
        res.json({ success: true, data: user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log('Received new user:', newUser);
    res.status(201).json({ 
        success: true, 
        message: 'User created successfully',
        data: { id: 4, ...newUser }
    });
});

app.listen(PORT, () => {
    console.log('\n=== Express Server ===');
    console.log(`Server running at http://localhost:${PORT}/`);
});
```

### Execution

```bash
npm run task8-express
```

Or with auto-restart:

```bash
npm run dev:task8
```

---

## How to Run

### Individual Tasks

```bash
npm run task1           # Hello Node
npm run task2           # Modules & Importing
npm run task4-sync      # File System (Synchronous)
npm run task4-async     # File System (Asynchronous)
npm run task5           # Path & OS Modules
npm run task6           # Events
npm run task7           # HTTP Server
npm run task8           # Terminal Styling
npm run task8-express   # Express Server
```

### Development Mode with Auto-Restart

```bash
npm run dev:task7       # HTTP Server with nodemon
npm run dev:task8       # Express Server with nodemon
```

---

## Testing

### HTTP Server Testing (Task 7)

1. Start the server:
   ```bash
   npm run task7
   ```

2. Test routes in browser:
   - `http://localhost:3000/` - Home page (200 OK)
   - `http://localhost:3000/about` - Not Found (404)

### Express Server Testing (Task 8)

1. Start the server:
   ```bash
   npm run task8-express
   ```

2. Test routes:
   - `http://localhost:3001/` - Home page
   - `http://localhost:3001/api/users` - JSON users list
   - `http://localhost:3001/api/users/1` - Get user by ID

---

## Troubleshooting

### Common Issues

**Issue: "npm: command not found"**
- **Solution:** Install Node.js and npm from nodejs.org

**Issue: Port already in use**
- **Solution:** Stop other servers running on that port or change PORT constant in the code

**Issue: Module not found**
- **Solution:** Run `npm install` to install all dependencies

**Issue: Permission denied (Linux/Mac)**
- **Solution:** Run `sudo npm install` or configure npm to use a different directory

### Generated Files

After running tasks, the following files will be created:

```
src/Task4/
├── output-sync.txt    (Created by fileSync.js)
└── output-async.txt   (Created by fileAsync.js)

src/Task6/
└── test-file.txt      (Created by events.js)
```

---

## Submission Guidelines

1. Ensure all tasks run successfully
2. Review LAB_REPORT.md for completeness
3. Create a zip file named: `Sohaib-465597-BESE14A.zip`
4. Include:
   - All source files in `src/` directory
   - package.json
   - README.md
   - LAB_REPORT.md
5. Exclude: `node_modules/` directory (too large)
6. Upload to LMS before the deadline

---

## Learning Outcomes

By completing this lab, the following skills and concepts were acquired:

1. Executing JavaScript outside the browser using Node.js runtime
2. Understanding the event loop and asynchronous programming patterns
3. Creating and using custom modules with `module.exports` and `require()`
4. Managing projects with `package.json` and npm scripts
5. Working with built-in modules: `fs`, `path`, `os`, `events`, `http`, `url`
6. Differentiating between synchronous and asynchronous operations
7. Creating custom events with EventEmitter
8. Building HTTP servers from scratch
9. Using third-party packages from npm
10. Modern web development with Express.js framework

---

## Dependencies

### Production Dependencies

```json
{
  "chalk": "^5.6.2",
  "express": "^5.1.0"
}
```

### Development Dependencies

```json
{
  "nodemon": "^3.1.11"
}
```

---

## Author

**Name:** Sohaib Mughal  
**Registration No.:** 465597  
**Section:** BESE14A  
**Course:** CS344 - Web Engineering  
**Instructor:** Ms. Naema Asif  
**Date:** November 20, 2025

---

## License

ISC License - For educational purposes only.

---

**End of README**
