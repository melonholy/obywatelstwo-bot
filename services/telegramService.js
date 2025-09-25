const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");

class TelegramService {
  constructor() {
    this.bot = new TelegramBot(config.BOT_TOKEN, { polling: true });
    this.chatId = config.CHAT_ID;
    this.setupCommands();
    this.setupErrorHandling();
  }

  async sendMessage(message) {
    try {
      await this.bot.sendMessage(this.chatId, message);
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  async sendAvailabilityNotification(dataCount) {
    const message = `🎉 Dostępne terminy!\n\nZnaleziono ${dataCount} dostępnych terminów na wizyty w urzędzie.\n\nSprawdź: https://rezerwacja.gdansk.uw.gov.pl:8445/qmaticwebbooking/`;
    return this.sendMessage(message);
  }

  async sendErrorNotification(error) {
    const errorMessage = `❌ Błąd podczas sprawdzania terminów: ${error.message}`;
    return this.sendMessage(errorMessage);
  }

  setupCommands() {
    // Handle /check command
    this.bot.onText(/\/check/, (msg) => {
      if (msg.chat.id !== config.CHAT_ID) {
        return;
      }

      const chatId = msg.chat.id;
      console.log("Manual check requested from chat:", chatId);
      this.bot.sendMessage(chatId, "Sprawdzam dostępność terminów...");
      // Emit an event that can be listened to by the main application
      this.emit("manualCheck", { chatId });
    });
  }

  setupErrorHandling() {
    this.bot.on("polling_error", (error) => {
      console.error("Telegram polling error:", error);
    });

    this.bot.on("error", (error) => {
      console.error("Telegram bot error:", error);
    });
  }

  stop() {
    console.log("Stopping Telegram bot...");
    this.bot.stopPolling();
  }

  // Simple event emitter functionality
  emit(eventName, data) {
    if (this.listeners && this.listeners[eventName]) {
      this.listeners[eventName].forEach((callback) => callback(data));
    }
  }

  on(eventName, callback) {
    if (!this.listeners) {
      this.listeners = {};
    }
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
}

module.exports = TelegramService;
