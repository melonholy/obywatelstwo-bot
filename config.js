module.exports = {
  // Bot token from environment variable or fallback to placeholder
  BOT_TOKEN: process.env.BOT_TOKEN || "YOUR_BOT_TOKEN_HERE",

  // Chat ID from environment variable or fallback to placeholder
  CHAT_ID: parseInt(process.env.CHAT_ID) || 0,

  // Check interval in minutes
  CHECK_INTERVAL: parseInt(process.env.CHECK_INTERVAL) || 5,

  // API URL to monitor
  API_URL: process.env.API_URL ||
    "https://rezerwacja.gdansk.uw.gov.pl:8445/qmaticwebbooking/rest/schedule/branches/1cf1e3e60eeb96dae2bb572487249bd48cc5bed0024960eaee0c893ce4918569/dates;servicePublicId=2c5251d564aaf0b09c2a39d69cf7ed4cb1e142ab3a501b4b688e1e7c2d80b8e0;customSlotLength=40",
};
