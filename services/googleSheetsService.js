// services/googleSheetsService.js
const { google } = require("googleapis");

// Service Account authentication
async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return auth.getClient();
}

module.exports = {
  getSheetData,
  findObjectLocation,
};
