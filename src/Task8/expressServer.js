// Task 8 - Optional: HTTP Server using Express
const express = require('express');

const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Express Server</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .container {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                    padding: 60px 80px;
                    max-width: 800px;
                    width: 100%;
                }
                h1 {
                    color: #2d3748;
                    font-size: 3rem;
                    font-weight: 600;
                    margin-bottom: 15px;
                    letter-spacing: -0.5px;
                    text-align: center;
                }
                .subtitle {
                    color: #4a5568;
                    font-size: 1.2rem;
                    line-height: 1.8;
                    margin-bottom: 30px;
                    text-align: center;
                }
                .divider {
                    width: 60px;
                    height: 3px;
                    background: linear-gradient(90deg, #1e3c72, #2a5298);
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
                    border-top: 3px solid #2a5298;
                    text-align: center;
                }
                .info-label {
                    color: #2a5298;
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
                    font-size: 1.3rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .route {
                    background: #f7fafc;
                    padding: 15px 20px;
                    margin: 10px 0;
                    border-radius: 8px;
                    border-left: 4px solid #48bb78;
                    display: flex;
                    align-items: center;
                }
                .method {
                    display: inline-block;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-weight: 600;
                    font-size: 0.75rem;
                    margin-right: 15px;
                    min-width: 50px;
                    text-align: center;
                }
                .get { background: #4299e1; color: white; }
                .post { background: #48bb78; color: white; }
                code {
                    background: #edf2f7;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                    color: #2d3748;
                    font-size: 0.95rem;
                }
                .description {
                    color: #718096;
                    font-size: 0.9rem;
                    margin-left: 10px;
                }
                .benefits {
                    margin-top: 40px;
                    padding: 20px;
                    background: #f7fafc;
                    border-radius: 8px;
                    border-left: 4px solid #9f7aea;
                }
                .benefits-title {
                    color: #2d3748;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                .benefits-text {
                    color: #4a5568;
                    line-height: 1.6;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Express.js Server</h1>
                <p class="subtitle">A modern, minimalist Node.js web framework</p>
                <div class="divider"></div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Lab Assignment</div>
                        <div class="info-value">Lab 10</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Task</div>
                        <div class="info-value">Task 8</div>
                    </div>
                </div>
                <div class="routes-section">
                    <div class="section-title">Available API Endpoints</div>
                    <div class="route">
                        <span class="method get">GET</span>
                        <code>/</code>
                        <span class="description">This home page</span>
                    </div>
                    <div class="route">
                        <span class="method get">GET</span>
                        <code>/api/users</code>
                        <span class="description">Get all users (JSON)</span>
                    </div>
                    <div class="route">
                        <span class="method get">GET</span>
                        <code>/api/users/:id</code>
                        <span class="description">Get user by ID</span>
                    </div>
                    <div class="route">
                        <span class="method post">POST</span>
                        <code>/api/users</code>
                        <span class="description">Create new user</span>
                    </div>
                    <div class="route">
                        <span class="method get">GET</span>
                        <code>/about</code>
                        <span class="description">About page</span>
                    </div>
                </div>
                <div class="benefits">
                    <div class="benefits-title">Why Express.js?</div>
                    <div class="benefits-text">
                        Express provides robust routing, middleware support, JSON parsing, 
                        and simplified HTTP utilities - making it faster and cleaner than the native HTTP module.
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

// About route
app.get('/about', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>About - Express Server</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .container {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                    padding: 60px 80px;
                    max-width: 600px;
                    width: 100%;
                    text-align: center;
                }
                h1 {
                    color: #2d3748;
                    font-size: 2.5rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                }
                p {
                    color: #4a5568;
                    font-size: 1.1rem;
                    line-height: 1.8;
                    margin-bottom: 30px;
                }
                .button {
                    display: inline-block;
                    padding: 14px 32px;
                    background: linear-gradient(90deg, #1e3c72, #2a5298);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 500;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(42, 82, 152, 0.4);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>About Page</h1>
                <p>This is an Express.js server demonstration for Lab 10, showcasing modern web development with Node.js.</p>
                <a href="/" class="button">Return Home</a>
            </div>
        </body>
        </html>
    `);
});

// API Routes - Get all users
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Sohaib', role: 'Student' },
        { id: 2, name: 'Ali', role: 'Student' },
        { id: 3, name: 'Ahmed', role: 'Instructor' }
    ];
    res.json({ success: true, data: users });
});

// API Routes - Get user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const users = [
        { id: 1, name: 'Sohaib', role: 'Student', email: 'sohaib@example.com' },
        { id: 2, name: 'Ali', role: 'Student', email: 'ali@example.com' },
        { id: 3, name: 'Ahmed', role: 'Instructor', email: 'ahmed@example.com' }
    ];
    
    const user = users.find(u => u.id === userId);
    
    if (user) {
        res.json({ success: true, data: user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

// API Routes - Create new user (POST)
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log('Received new user:', newUser);
    res.status(201).json({ 
        success: true, 
        message: 'User created successfully',
        data: { id: 4, ...newUser }
    });
});

// 404 handler - must be last
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Not Found</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .error-container {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
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
                    margin-bottom: 30px;
                }
                .button {
                    display: inline-block;
                    padding: 14px 32px;
                    background: linear-gradient(90deg, #1e3c72, #2a5298);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 500;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(42, 82, 152, 0.4);
                }
            </style>
        </head>
        <body>
            <div class="error-container">
                <div class="error-code">404</div>
                <h2>Page Not Found</h2>
                <p>The requested page does not exist on this server.</p>
                <a href="/" class="button">Return Home</a>
            </div>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log('\n=== Express Server (Optional) ===');
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop\n');
});
