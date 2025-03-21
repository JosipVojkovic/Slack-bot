require("dotenv").config();
const { App } = require("@slack/bolt");
const { handleMessage, handleObjectQuery } = require("./services/slackService");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

app.message("hello", handleMessage);

app.message(/where is|find|locate/, handleObjectQuery);

(async () => {
  await app.start();
  app.logger.info("⚡️ Bolt app is running!");
})();
