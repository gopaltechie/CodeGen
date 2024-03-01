// Plopfile.js
const {google} = require('googleapis');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
    plop.setGenerator('form', {
        description: 'Generate a form from a Google Sheet',
        prompts: [
            {
                type: 'input',
                name: 'sheetId',
                message: 'Enter the Google Sheet ID:',
            },
        ],
        actions: async (answers) => {
            const sheetId = answers.sheetId;
            const sheets = google.sheets('v4');
            const auth = new google.auth.GoogleAuth({
                keyFile: './credentials.json', // Update this path
                scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
            });

            const client = await auth.getClient();
            google.options({auth: client});

            const sheetNames = await fetchSheetNames(sheets, sheetId);
            const {selectedSheet} = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'selectedSheet',
                    message: 'Choose a sheet:',
                    choices: sheetNames,
                },
            ]);

            const fields = await fetchSheetData(sheets, sheetId, selectedSheet);

            // Generate files based on fields
            const actions = fields.map((field) => {
                return {
                    type: 'add',
                    path: `output/${field.fieldName}.ejs`,
                    templateFile: 'templates/form.ejs', // Update this path
                    data: { field },
                };
            });

            return actions;
        },
    });
};

async function fetchSheetNames(sheets, sheetId) {
    const response = await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
    });
    return response.data.sheets.map((sheet) => sheet.properties.title);
}

async function fetchSheetData(sheets, sheetId, sheetName) {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${sheetName}!A:F`, // Assuming your fields are in columns A to F
    });
    return response.data.values.map(([fieldName, fieldType, validation, helpText, status, type]) => ({
        fieldName,
        fieldType,
        validation,
        helpText,
        status,
        type,
    }));
}
