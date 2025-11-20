# Task 3: package.json & npm Scripts

## Overview
This document explains the npm scripts and package management for Lab 10.

## package.json Scripts

### Basic Task Scripts
```json
"task1": "node src/Task1/hello.js",
"task2": "node src/Task2/main.js",
"task4-sync": "node src/Task4/fileSync.js",
"task4-async": "node src/Task4/fileAsync.js",
"task5": "node src/Task5/pathAndOs.js",
"task6": "node src/Task6/events.js",
"task7": "node src/Task7/server.js",
"task8": "node src/Task8/usePackage.js",
"task8-express": "node src/Task8/expressServer.js"
```

### Development Scripts (with nodemon)
```json
"dev:task7": "nodemon src/Task7/server.js",
"dev:task8": "nodemon src/Task8/expressServer.js"
```

## Usage Examples

### Running a Task
```bash
npm run task1
```

### Running with Auto-restart (Development Mode)
```bash
npm run dev:task7
```
This will use nodemon to automatically restart the server when files change.

## Installed Packages

### Dependencies (Production)
- **chalk** (^4.1.2): Terminal string styling with colors
- **express** (^4.18.2): Fast, unopinionated web framework

### DevDependencies (Development Only)
- **nodemon** (^3.0.1): Auto-restart tool for development

## Question: Dependencies vs DevDependencies

### Dependencies
- Required for the application to **run in production**
- Installed with: `npm install <package>`
- Example: express, chalk, mongoose
- Installed in production environments

### DevDependencies
- Required **only during development** and testing
- Installed with: `npm install --save-dev <package>`
- Example: nodemon, jest, eslint, webpack
- NOT installed in production (using `npm install --production`)

### Why Separate Them?

1. **Smaller Production Builds**: DevDependencies are excluded, reducing bundle size
2. **Security**: Fewer packages means smaller attack surface
3. **Faster Deployment**: Less to download and install
4. **Clear Intent**: Shows what's needed where

### Example Scenario

```json
{
  "dependencies": {
    "express": "^4.18.2",      // Web server - needed in production
    "chalk": "^4.1.2"           // Terminal colors - needed if app uses it
  },
  "devDependencies": {
    "nodemon": "^3.0.1",        // Auto-restart - only for development
    "jest": "^29.0.0",          // Testing - only for development
    "eslint": "^8.0.0"          // Linting - only for development
  }
}
```

## Installation Commands

### Install All Packages
```bash
npm install
```

### Install Production Only
```bash
npm install --production
```

### Install New Dependency
```bash
npm install <package-name>
```

### Install New DevDependency
```bash
npm install --save-dev <package-name>
```

## Benefits of npm Scripts

1. **Convenience**: Short commands instead of long paths
2. **Consistency**: Same commands work across different systems
3. **Documentation**: Scripts document how to run the project
4. **Automation**: Easy to integrate with CI/CD pipelines
5. **Environment**: npm scripts have access to `node_modules/.bin`

## Conclusion

npm scripts and proper dependency management are essential for:
- Professional project organization
- Team collaboration
- Deployment optimization
- Development efficiency
