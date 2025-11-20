// Task 5 - Using Path & OS Modules
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

// 8. Additional useful path operations
console.log('\n8. ADDITIONAL PATH OPERATIONS:');
const samplePath = '/users/documents/project/src/index.js';
console.log('   Sample path:', samplePath);
console.log('   Parsed path:', path.parse(samplePath));
