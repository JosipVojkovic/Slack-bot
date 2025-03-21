const { google } = require("googleapis");

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return auth.getClient();
}

async function getSheetData(spreadsheetId, range) {
  const authClient = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth: authClient });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values;
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    throw error;
  }
}

async function findObjectLocation(objectName) {
  const spreadsheetId = process.env.OBJECT_SPREADSHEET_ID;
  const range = process.env.OBJECT_SHEET_RANGE || "Sheet1!A:B";

  try {
    const rows = await getSheetData(spreadsheetId, range);

    if (!rows || rows.length === 0) {
      return "No data found in the inventory database.";
    }

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[0] && row[0].toLowerCase() === objectName.toLowerCase()) {
        return row[1]
          ? `${objectName} is located at: ${row[1]}`
          : `${objectName} was found but has no location specified`;
      }
    }
    return `Sorry, I couldn't find "${objectName}" in our inventory.`;
  } catch (err) {
    console.error("Error searching for object:", err);
    return "Sorry, I encountered an error when trying to access the inventory database.";
  }
}

module.exports = {
  getSheetData,
  findObjectLocation,
};
