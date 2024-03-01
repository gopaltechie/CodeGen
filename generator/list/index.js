const { getSheetList, getSheetRows } = require('../googleSheets.js');
const sheetsList = async () => {


    const sheetList = await getSheetList();
    console.log('List of sheets:', sheetList);

    // const sheetName = 'Sheet1'; // Replace with the sheet you want to retrieve
    // const rows = await getSheetRows(sheetName);
    // console.log(`Rows of ${sheetName}:`, rows);

    return sheetList;
};



// [{
//     type: 'list',
//     name: 'name',
//     message: 'What is your component name?',
//     choices: sheetsList
// },
// {
//     type: "input",
//     name: "element",
//     message: "HTML element (div is default)",
//     default: "div",
// }]

module.exports = {
    description: 'new component',
    prompts: [{
        type: 'list',
        name: 'sheetName',
        message: 'What is your component name?',
        choices: sheetsList
    },
    {
        type: "input",
        name: "element",
        message: "HTML element (div is default)",
        default: "div",
    }],
    actions: [
        async (data) => {


            // const sheetList = await getSheetList();
            // console.log('List of sheets:', sheetList);
            // console.log('List of sheets data:', data);


            const rows = await getSheetRows(data.sheetName);
                // const rows = ["row1","row2"];
                // console.log(`Rows of ${data.sheetName}:`, rows);
                data.fields = rows;
            return rows;
        
        },
        function (data) {
            console.log("data",data);
        //     console.log("sheetName",data.sheetName);
        //     const fieldsList = (data) => {

        //         console.log("BAUTO ~ fieldsList ~ data.sheetName:", data.sheetName);

        //         // const sheetList = await getSheetList();
        //         // console.log('List of sheets:', sheetList);
            
        //         // const sheetName = 'Sheet1'; // Replace with the sheet you want to retrieve
        //         // const rows = await getSheetRows(data.sheetName);
        //         const rows = ["row1","row2"];
        //         console.log(`Rows of ${data.sheetName}:`, rows);
            
        //         return rows;
        //     };
        //     console.log("fieldsList",fieldsList)

            return "yay";
        },
        {
            type: 'add',
            path: '../src/components/{{pascalCase sheetName}}/index.js',
            templateFile: 'list/templates/Component.js.hbs'
        },
        // {
        //     type: 'add',
        //     path: '../src/components/{{pascalCase sheetName}}/style.js',
        //     templateFile: 'component/templates/styled.js.hbs'
        // },
        // {
        //     type: 'add',
        //     path: '../src/components/{{pascalCase sheetName}}/{{pascalCase sheetName}}.stories.js',
        //     templateFile: 'component/templates/stories.js.hbs'
        // },
        // {
        //     type: 'add',
        //     path: '../src/components/{{pascalCase sheetName}}/{{pascalCase sheetName}}.test.js',
        //     templateFile: 'component/templates/test.js.hbs'
        // }
    ]
};