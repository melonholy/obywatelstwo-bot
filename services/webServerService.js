const express = require('express');

class WebServerService {
  constructor() {
    this.app = express();
    this.server = null;
    this.port = process.env.PORT || 3000;
    this.setupRoutes();
  }

  setupRoutes() {
    // Main status endpoint
    this.app.get('/', (req, res) => {
      res.json({
        status: 'Bot is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // Health check endpoint for monitoring services
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
      });
    });

    // Status endpoint with more details
    this.app.get('/status', (req, res) => {
      res.json({
        status: 'running',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
      });
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.port, () => {
          console.log(`🌐 Web server running on port ${this.port}`);
          resolve();
        });

        this.server.on('error', (error) => {
          console.error('Web server error:', error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  stop() {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          console.log('🌐 Web server stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  getStatus() {
    return {
      running: this.server !== null,
      port: this.port,
      uptime: process.uptime()
    };
  }
}

module.exports = WebServerService;
