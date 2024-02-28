const {google} = require('googleapis');

const serviceAccountKeyFile = "./python-pilot-392406-89c4c091f3a3.json";
const sheetId = '1AmJCyQ9EybaGHPHTmestQ7n_y6ROI_n5HlYfbugU4I0'
const tabName = 'Users'
const range = 'A:F'

main().then(() => {
  console.log('Completed')
})

async function main() {
  // Generating google sheet client
  const googleSheetClient = await _getGoogleSheetClient();

    // Listing all sheets
    const sheets = await listSheets(googleSheetClient, sheetId);
    console.log('Sheets:', sheets);
    
  // Reading Google Sheet from a specific range
  const data = await _readGoogleSheet(googleSheetClient, sheetId, tabName, range);
  console.log(data);

  // Adding a new row to Google Sheet
  const dataToBeInserted = [
     ['11', 'rohith', 'Rohith', 'Sharma', 'Active'],
     ['12', 'virat', 'Virat', 'Kohli', 'Active']
  ]
//   await _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, dataToBeInserted);
}

async function _getGoogleSheetClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: 'v4',
    auth: authClient,
  });
}

async function _readGoogleSheet(googleSheetClient, sheetId, tabName, range) {
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });

  return res.data.values;
}

async function _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, data) {
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      "majorDimension": "ROWS",
      "values": data
    },
  })
}

async function listSheets(googleSheetClient, sheetId) {
    const response = await googleSheetClient.spreadsheets.get({
      spreadsheetId: sheetId,
    });
  
    const sheets = response.data.sheets.map(sheet => sheet.properties.title);
    return sheets;
  }
