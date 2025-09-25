# Obywatelstwo Bot 🤖

Telegram bot that monitors appointment availability for Polish citizenship applications in Gdansk and sends notifications when slots become available.

## Project Structure

```
obywatelstwo-bot/
├── index.js              # Main entry point
├── config.js             # Configuration settings
├── package.json          # Dependencies
├── README.md             # Documentation
└── services/
    ├── appService.js     # Main application logic
    ├── dataFetcher.js    # API data fetching
    ├── telegramService.js # Telegram bot operations
    └── scheduler.js      # Cron job scheduling
```

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token (something like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Get Your Chat ID

1. Send a message to your bot
2. Run the bot temporarily to see your chat ID in the logs
3. Or visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`

### 3. Configure the Bot

Edit `config.js` file:

```javascript
module.exports = {
  BOT_TOKEN: 'YOUR_ACTUAL_BOT_TOKEN_HERE',
  CHAT_ID: 'YOUR_ACTUAL_CHAT_ID_HERE',
  CHECK_INTERVAL: 5, // Check every 5 minutes
};
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Bot

```bash
node index.js
```

## Features

- ✅ Monitors appointment availability every 5 minutes
- ✅ Sends Polish language notifications when appointments are found
- ✅ Handles SSL certificate issues with the government website
- ✅ Bot commands: `/start`, `/check`, `/status`
- ✅ Error handling and logging

## Bot Commands

- `/start` - Start the bot and get your chat ID
- `/check` - Manually check for available appointments
- `/status` - Check if the bot is running

## Cloud Deployment 🚀

### Recommended Free Platforms:

1. **Railway** (⭐ Recommended)
   - $5/month free credits
   - Easy GitHub deployment
   - [railway.app](https://railway.app)

2. **Render**
   - 750 hours/month free
   - [render.com](https://render.com)

3. **Fly.io**
   - Generous free tier
   - [fly.io](https://fly.io)

### Deployment Steps:

1. **Push to GitHub** (sensitive data is already protected)
2. **Choose a platform** from the list above
3. **Connect your GitHub repository**
4. **Set environment variables:**
   ```
   BOT_TOKEN=your_actual_bot_token
   CHAT_ID=your_actual_chat_id
   CHECK_INTERVAL=5
   ```
5. **Deploy!**

### Environment Variables Setup:
The bot uses environment variables for security. In production, set:
- `BOT_TOKEN` - Your Telegram bot token
- `CHAT_ID` - Your Telegram chat ID
- `CHECK_INTERVAL` - Check frequency in minutes (optional, defaults to 5)

## Running as a Service (Optional)

To keep the bot running continuously locally, you can use PM2:

```bash
npm install -g pm2
pm2 start index.js --name "obywatelstwo-bot"
pm2 save
pm2 startup
```

## Notes

- The bot checks for appointments on the Gdansk citizenship office website
- Notifications are sent in Polish
- The bot runs continuously and checks every 5 minutes
- SSL certificate verification is disabled for the government website
