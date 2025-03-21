// services/slackService.js
const { findObjectLocation } = require("./googleSheetsService");

async function handleMessage({ message, say }) {
  await say(`Hey there <@${message.user}>!`);
}

async function handleObjectQuery({ message, say }) {
  const text = message.text.toLowerCase();

  // Extract the object name - this can be improved with regex or NLP
  let objectName;
  if (text.includes("where is ")) {
    objectName = text.replace("where is ", "").trim();
  } else if (text.includes("find ")) {
    objectName = text.replace("find ", "").trim();
  } else if (text.includes("locate ")) {
    objectName = text.replace("locate ", "").trim();
  } else {
    objectName = text.trim();
  }

  if (objectName) {
    const response = await findObjectLocation(objectName);
    await say(response);
  } else {
    await say("What object are you looking for?");
  }
}

module.exports = {
  handleMessage,
  handleObjectQuery,
};
