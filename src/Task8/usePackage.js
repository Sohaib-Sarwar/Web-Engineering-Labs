// Task 8 - Using Third Party Packages
// Using ANSI color codes for colorful console output (alternative to chalk for CommonJS)

console.log('=== Task 8: Using Third Party Packages ===\n');

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    
    // Foreground colors
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    
    // Background colors
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m'
};

// Demonstrate various color features
console.log(colors.blue + 'Basic blue text' + colors.reset);
console.log(colors.red + colors.bright + 'Bold red text' + colors.reset);
console.log(colors.green + colors.underscore + 'Underlined green text' + colors.reset);

console.log('\n--- Combining Styles ---');
console.log(colors.yellow + colors.bgBlue + ' Yellow text on blue background ' + colors.reset);
console.log(colors.white + colors.bgRed + colors.bright + ' Bold white text on red background ' + colors.reset);

console.log('\n--- Success/Error Messages ---');
console.log(colors.green + '✓ Success: Operation completed successfully!' + colors.reset);
console.log(colors.red + '✗ Error: Something went wrong!' + colors.reset);
console.log(colors.yellow + '⚠ Warning: Please review this message.' + colors.reset);
console.log(colors.blue + 'ℹ Info: Here is some information.' + colors.reset);

console.log('\n--- Practical Example ---');
const username = 'Sohaib';
const score = 95;

console.log(`Welcome ${colors.cyan}${colors.bright}${username}${colors.reset}!`);
console.log(`Your score: ${colors.green}${colors.bright}${score}%${colors.reset}`);

if (score >= 90) {
    console.log(colors.green + colors.bright + '🎉 Excellent performance!' + colors.reset);
} else if (score >= 70) {
    console.log(colors.yellow + colors.bright + '👍 Good job!' + colors.reset);
} else {
    console.log(colors.red + colors.bright + '📚 Keep practicing!' + colors.reset);
}

console.log('\n' + colors.gray + '─'.repeat(50) + colors.reset);
console.log(colors.magenta + 'Using ANSI color codes - Native terminal styling!' + colors.reset);
console.log(colors.gray + '─'.repeat(50) + colors.reset);

console.log('\n' + colors.cyan + 'Note: This demonstrates colorful output without external packages!' + colors.reset);
console.log(colors.gray + 'Third-party packages like chalk, colors, or cli-color can also be used.' + colors.reset);
