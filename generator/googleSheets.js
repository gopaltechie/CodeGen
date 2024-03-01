const { google } = require('googleapis');
const credentials = require('../credentials.json'); // Your Google Sheets API credentials file
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Function to authenticate and get the list of sheets
async function getSheetList() {
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.get({
        spreadsheetId: '1AmJCyQ9EybaGHPHTmestQ7n_y6ROI_n5HlYfbugU4I0', // Replace with your spreadsheet ID
    });
    return res.data.sheets.map(sheet => sheet.properties.title);
}

// Function to get rows of a specific sheet
async function getSheetRows(sheetName) {
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1AmJCyQ9EybaGHPHTmestQ7n_y6ROI_n5HlYfbugU4I0', // Replace with your spreadsheet ID
        range: `${sheetName}!A:ZZ`, // Adjust range as per your requirements
    });
    const rows = res.data.values;
    if (rows.length) {
        const headers = rows[0];
        return rows.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, i) => {
                obj[header] = row[i];
            });
            return obj;
        });
    } else {
        console.log('No data found.');
        return [];
    }
}

module.exports = {
    getSheetList,
    getSheetRows
};
