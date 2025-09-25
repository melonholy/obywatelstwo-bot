require('dotenv').config();
const AppService = require("./services/appService");
const WebServerService = require("./services/webServerService");
const KeepAliveService = require("./services/keepAliveService");

// Initialize services
const appService = new AppService();
const webServer = new WebServerService();
const keepAlive = new KeepAliveService();

// Start all services
async function startApplication() {
  try {
    console.log("🚀 Starting Obywatelstwo Bot...");

    // Start web server first
    await webServer.start();

    // Start keep-alive service for Render
    keepAlive.start();

    // Start main application
    appService.start();

    console.log("✅ All services started successfully!");
  } catch (error) {
    console.error("❌ Failed to start application:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
async function shutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  try {
    // Stop services in reverse order
    appService.stop();
    keepAlive.stop();
    await webServer.stop();

    console.log("✅ Shutdown complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Start the application
startApplication();
