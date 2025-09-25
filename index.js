const AppService = require("./services/appService");

// Create and start the application
const app = new AppService();

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Shutting down gracefully...");
  app.stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nReceived SIGTERM. Shutting down gracefully...");
  app.stop();
  process.exit(0);
});

// Start the application
app.start();
