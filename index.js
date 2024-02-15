const fs = require('node:fs');
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

/**
 * Validates a CSV file and retunrs json with information about:
 * execution result and time, CSV files and arrays containing the line numbers with error.
 * Also very useful for quickly finding the wrong records among millions of lines.
 *
 * @param {string} csvFile - The path to the CSV file.
 * @param {string} separator - The CSV separator character, not mandatory. Default value = ','.
 * @param {boolean} ignoreEmptyRows - Non-mandatory parameter to handle the blank line at the end of the file.
 */
function jsonValidation(csvFile, separator = ',', ignoreEmptyRows = true) {

    const start = Date.now();
    let result = true;
    let badRows = new Array();
    let executiontime;

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
    
        rowsInCsv.forEach(function callback(element, index) {
            //console.log(`${index}: ${element}`);
            if (element.length != firstLineLength) {
                badRows.push(index + 1);
                result = false;
            }
        });
        
        const end = Date.now();
        executiontime = end - start;

        if (badRows.length > 0) {
            result = false;
        } else {
            result = true;
        }
    
        //return result;
        return JSON.stringify({ 
            "csvFile": csvFile
            , "executiontime" : `${(executiontime)}ms.`
            , "rowsCount" : rowsInCsv.length
            , "columns" : firstLineLength
            , "badRowsLines": badRows
            , "result" : result
            , "message" : ""
        });
    } catch (error) {
        const end = Date.now();
        executiontime = end - start;
        result = false;

        //return result;
        return JSON.stringify({ 
            "csvFile": csvFile
            , "executiontime" : `${(executiontime)}ms.`
            , "rowsCount" : NaN
            , "columns" : NaN
            , "badRowsLines": NaN
            , "result" : result
            , "message" : error.message
        });        
    }
}

module.exports = {itWorks, booleanValidation, jsonValidation}