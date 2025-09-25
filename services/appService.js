const DataFetcher = require("./dataFetcher");
const TelegramService = require("./telegramService");
const Scheduler = require("./scheduler");

class AppService {
  constructor() {
    this.dataFetcher = new DataFetcher();
    this.telegramService = new TelegramService();
    this.scheduler = new Scheduler();

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    // Listen for manual check requests from Telegram bot
    this.telegramService.on("manualCheck", () => {
      this.checkAndNotify();
    });
  }

  async checkAndNotify() {
    try {
      const data = await this.dataFetcher.fetchData();

      if (this.dataFetcher.isDataAvailable(data)) {
        console.log("Data available! Sending notification...");
        await this.telegramService.sendAvailabilityNotification(data.length);
      } else {
        console.log("No data available yet.");
      }
    } catch (error) {
      console.error("Error during check:", error);

      // Send error notification
      try {
        await this.telegramService.sendErrorNotification(error);
      } catch (notificationError) {
        console.error("Failed to send error notification:", notificationError);
      }
    }
  }

  start() {
    console.log("Starting Obywatelstwo Bot...");

    // Run initial check
    console.log("Running initial check...");
    this.checkAndNotify();

    // Start the scheduler
    this.scheduler.start(() => {
      this.checkAndNotify();
    });

    console.log("Bot is running...");
  }

  stop() {
    console.log("Stopping bot...");
    this.scheduler.stop();
    this.telegramService.stop();
    console.log("Bot stopped.");
  }

  getStatus() {
    return {
      scheduler: this.scheduler.getStatus(),
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = AppService;
