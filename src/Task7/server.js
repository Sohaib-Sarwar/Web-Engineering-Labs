// Task 7 - Basic HTTP Server
const http = require('http');
const url = require('url');

// Configuration
const PORT = 3000;
const HOSTNAME = 'localhost';

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Log incoming request
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);
    
    // Route handling
    if (pathname === '/') {
        // Root path - send HTML response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Node.js HTTP Server</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                    }
                    .container {
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                        padding: 60px 80px;
                        max-width: 700px;
                        width: 100%;
                    }
                    h1 {
                        color: #2d3748;
                        font-size: 2.5rem;
                        font-weight: 600;
                        margin-bottom: 15px;
                        letter-spacing: -0.5px;
                        text-align: center;
                    }
                    .divider {
                        width: 60px;
                        height: 3px;
                        background: linear-gradient(90deg, #667eea, #764ba2);
                        margin: 25px auto 35px;
                    }
                    .info-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin-bottom: 40px;
                    }
                    .info-card {
                        background: #f7fafc;
                        padding: 20px;
                        border-radius: 8px;
                        border-top: 3px solid #667eea;
                        text-align: center;
                    }
                    .info-label {
                        color: #667eea;
                        font-weight: 600;
                        font-size: 0.85rem;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 8px;
                    }
                    .info-value {
                        color: #2d3748;
                        font-size: 1.1rem;
                        font-weight: 500;
                    }
                    .routes-section {
                        margin-top: 30px;
                    }
                    .section-title {
                        color: #2d3748;
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin-bottom: 15px;
                        text-align: center;
                    }
                    .route-list {
                        list-style: none;
                    }
                    .route-item {
                        background: #f7fafc;
                        padding: 12px 20px;
                        margin: 8px 0;
                        border-radius: 6px;
                        border-left: 4px solid #48bb78;
                        font-family: 'Courier New', monospace;
                        font-size: 0.95rem;
                        color: #2d3748;
                    }
                    .route-item a {
                        color: #2d3748;
                        text-decoration: none;
                        display: block;
                    }
                    .route-item:hover {
                        background: #edf2f7;
                        border-left-color: #667eea;
                    }
                    .note {
                        margin-top: 30px;
                        padding: 15px;
                        background: #fff5f5;
                        border-radius: 6px;
                        border-left: 4px solid #fc8181;
                        color: #742a2a;
                        font-size: 0.9rem;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Node.js HTTP Server</h1>
                    <div class="divider"></div>
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-label">Lab Assignment</div>
                            <div class="info-value">Lab 10</div>
                        </div>
                        <div class="info-card">
                            <div class="info-label">Task</div>
                            <div class="info-value">Task 7</div>
                        </div>
                    </div>
                    <div class="routes-section">
                        <div class="section-title">Available Routes</div>
                        <ul class="route-list">
                            <li class="route-item"><a href="/">/ - Home (this page)</a></li>
                            <li class="route-item"><a href="/about">/about - About page</a></li>
                            <li class="route-item"><a href="/contact">/contact - Contact page</a></li>
                            <li class="route-item"><a href="/api/data">/api/data - API endpoint</a></li>
                        </ul>
                    </div>
                    <div class="note">
                        Try visiting different paths to see the 404 response
                    </div>
                </div>
            </body>
            </html>
        `);
    } else {
        // Any other path - send 404 Not Found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404 - Page Not Found</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                    }
                    .error-container {
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                        padding: 60px 80px;
                        max-width: 600px;
                        width: 100%;
                        text-align: center;
                    }
                    .error-code {
                        font-size: 6rem;
                        font-weight: 700;
                        background: linear-gradient(135deg, #e53e3e, #fc8181);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        line-height: 1;
                        margin-bottom: 20px;
                    }
                    h2 {
                        color: #2d3748;
                        font-size: 2rem;
                        font-weight: 600;
                        margin-bottom: 20px;
                    }
                    p {
                        color: #4a5568;
                        font-size: 1.1rem;
                        line-height: 1.6;
                        margin-bottom: 30px;
                    }
                    .path {
                        color: #667eea;
                        font-weight: 600;
                        font-family: 'Courier New', monospace;
                        background: #f7fafc;
                        padding: 3px 8px;
                        border-radius: 4px;
                    }
                    .button {
                        display: inline-block;
                        padding: 14px 32px;
                        background: linear-gradient(90deg, #667eea, #764ba2);
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: 500;
                        font-size: 1rem;
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <div class="error-code">404</div>
                    <h2>Page Not Found</h2>
                    <p>The requested page <span class="path">${pathname}</span> does not exist on this server.</p>
                    <a href="/" class="button">Return Home</a>
                </div>
            </body>
            </html>
        `);
    }
});

// Start the server
server.listen(PORT, HOSTNAME, () => {
    console.log('=== Task 7: Basic HTTP Server ===\n');
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
    console.log('--- Request Log ---');
});

/*
 * ANSWERS TO QUESTIONS:
 * 
 * Q1: How would you return JSON instead of text?
 * A: Change the Content-Type header to 'application/json' and use JSON.stringify():
 *    
 *    res.setHeader('Content-Type', 'application/json');
 *    res.end(JSON.stringify({ message: 'Hello', status: 'success' }));
 * 
 * Q2: How would you extend this to serve actual HTML files?
 * A: Use the fs module to read HTML files and send them:
 *    
 *    const fs = require('fs');
 *    const path = require('path');
 *    
 *    const filePath = path.join(__dirname, 'index.html');
 *    fs.readFile(filePath, (err, data) => {
 *        if (err) {
 *            res.statusCode = 500;
 *            res.end('Server Error');
 *        } else {
 *            res.statusCode = 200;
 *            res.setHeader('Content-Type', 'text/html');
 *            res.end(data);
 *        }
 *    });
 */
