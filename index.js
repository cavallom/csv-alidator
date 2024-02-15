const fs = require('fs');
const pjson = require('./package.json');

function itWorks() {
    return JSON.stringify({"itWorks": "Yes, it works!"
    , "package": pjson.name
    , "version": pjson.version
    });
}
/**
 * Validates a CSV file.
 *
 * @param {string} csvFile - The path to the CSV file.
 * @param {string} separator - The CSV separator character, not mandatory. Default value = ','.
 * @param {boolean} ignoreEmptyRows - Non-mandatory parameter to handle the blank line at the end of the file.
 */
function booleanValidation(csvFile, separator = ',', ignoreEmptyRows = true) {

    const start = Date.now();
    let result = true;

    try
    {
        const pattern = /".*?"/g;
    
        const csvFileLines = csvFile =>
        fs
        .readFileSync(csvFile)
        .toString('UTF8')
        .split('\n')
        .filter(function (el) {
            if (ignoreEmptyRows) {
                return el != '';
            } else {
                return el == el;
            }
        })
        .map(function (row) {
            while(patternFound = pattern.exec(row))
            {
                row = row.replace(patternFound, patternFound.toString().replace(',','@'));
            }
            return row.split(separator);
        });
    
        let rowsInCsv = csvFileLines(csvFile).slice();
        let firstLineLength = rowsInCsv[0].length;
    
        rowsInCsv.forEach(element => {
            if (element.length != firstLineLength) {
                result = false;
            }
        });
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);
    
        return result;
    } catch (error) {
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);
        console.log(error.message)
        result = false;
        return result;
    }
}

module.exports = {itWorks, booleanValidation}