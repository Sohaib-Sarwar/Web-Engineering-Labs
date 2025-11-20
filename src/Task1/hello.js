// Task 1 - Hello Node
// Demonstrating asynchronous behavior in Node.js

console.log('Start - This runs first');

// Asynchronous operation with setTimeout
setTimeout(() => {
    console.log('Delayed message - This runs last (after 2 seconds)');
}, 2000);

console.log('End - This runs second');

/* 
 * Expected Output Order:
 * 1. Start - This runs first
 * 2. End - This runs second
 * 3. Delayed message - This runs last (after 2 seconds)
 * 
 * ANSWERS TO QUESTIONS:
 * Q1: Which line prints last? Why?
 * A: The line inside setTimeout prints last because it's asynchronous.
 *    setTimeout adds the callback to the event queue, which executes
 *    only after the main synchronous code completes.
 * 
 * Q2: What does this tell you about Node's event loop?
 * A: Node.js uses a non-blocking event loop. Synchronous code runs first,
 *    then asynchronous callbacks (from timers, I/O, etc.) are processed
 *    from the event queue. This allows Node to handle multiple operations
 *    efficiently without waiting for time-consuming tasks.
 */
