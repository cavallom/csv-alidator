const { performance } = require('perf_hooks');
const fs = require('fs');

function itWorks() {
    return "Yes, it works!"
}
/**
 * Validates a CSV file.
 *
 * @param {String} csvFile - The path to the CSV file.
 * @param {string} separator - The CSV separator character, not mandatory. Default value = ','.
 * @param {boolean} ignoreEmptyRows - Non-mandatory parameter to handle the blank line at the end of the file.
 */
function booleanValidation(csvFile, separator = ',', ignoreEmptyRows = true) {
    const start = performance.now();
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
        const end = performance.now();
        console.log("executiontime: " + `${(end - start).toFixed(2)}ms.`);
    
        return result;
    } catch (error) {
        console.log(error.message)
        result = false;
        return result;
    }
}

module.exports = {itWorks, booleanValidation}