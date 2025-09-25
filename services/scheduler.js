const cron = require("node-cron");
const config = require("../config");

class Scheduler {
  constructor() {
    this.interval = config.CHECK_INTERVAL;
    this.job = null;
  }

  start(callback) {
    if (this.job) {
      console.log("Scheduler is already running");
      return;
    }

    console.log(
      `Starting scheduler - checking every ${this.interval} minutes...`
    );

    // Schedule the check every X minutes
    this.job = cron.schedule(`*/${this.interval} * * * *`, () => {
      console.log("Running scheduled check...");
      callback();
    });

    console.log("Scheduler started successfully");
  }

  stop() {
    if (this.job) {
      this.job.stop();
      this.job = null;
      console.log("Scheduler stopped");
    }
  }

  isRunning() {
    return this.job !== null;
  }

  getStatus() {
    return {
      running: this.isRunning(),
      interval: this.interval,
      nextRun: this.job
        ? "Next run in less than " + this.interval + " minutes"
        : "Not scheduled",
    };
  }
}

module.exports = Scheduler;
