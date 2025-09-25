const cron = require('node-cron');
const axios = require('axios');

class KeepAliveService {
  constructor() {
    this.job = null;
    this.isEnabled = false;
    this.renderUrl = process.env.RENDER_EXTERNAL_URL;
    this.interval = '*/14 * * * *'; // Every 14 minutes
  }

  start() {
    // Only run in production with Render URL
    if (process.env.NODE_ENV !== 'production' || !this.renderUrl) {
      console.log('🛡️ KeepAlive service disabled (not in production or no RENDER_EXTERNAL_URL)');
      return;
    }

    if (this.job) {
      console.log('KeepAlive service is already running');
      return;
    }

    console.log('🛡️ Starting KeepAlive service...');

    this.job = cron.schedule(this.interval, async () => {
      await this.pingServer();
    });

    this.isEnabled = true;
    console.log(`🛡️ Self-ping scheduled every 14 minutes to ${this.renderUrl}/health`);
  }

  stop() {
    if (this.job) {
      this.job.destroy();
      this.job = null;
      this.isEnabled = false;
      console.log('🛡️ KeepAlive service stopped');
    }
  }

  async pingServer() {
    try {
      console.log('🔄 Self-ping to prevent sleep...');
      const response = await axios.get(`${this.renderUrl}/health`, {
        timeout: 10000 // 10 second timeout
      });
      console.log(`✅ Self-ping successful: ${response.status}`);
    } catch (error) {
      console.log(`❌ Self-ping failed: ${error.message}`);
    }
  }

  getStatus() {
    return {
      enabled: this.isEnabled,
      renderUrl: this.renderUrl,
      interval: this.interval,
      nextPing: this.job ? 'Next ping in less than 14 minutes' : 'Not scheduled'
    };
  }

  // Manual ping for testing
  async manualPing() {
    if (!this.renderUrl) {
      throw new Error('No RENDER_EXTERNAL_URL configured');
    }
    return await this.pingServer();
  }
}

module.exports = KeepAliveService;
