const csvReader = require("./utils/csvReader");
const pjson = require('./package.json');

/**
 * Just to check the success of the installation, also returns basic package information.
 * No parameters.
 */
function itWorks() {
    return JSON.stringify({"itWorks": "Yes, it works!"
    , "package": pjson.name
    , "version": pjson.version
    });
}
/**
 * Validates a CSV file and return true or false.
 *
 * @param {string} csvFile - The path to the CSV file.
 * @param {string} csvDelimiter - The CSV separator character, not mandatory. Default value = ','.
 * @param {boolean} ignoreEmptyRows - Non-mandatory parameter to handle the blank line at the end of the file.
 */
function booleanValidation(csvFile, csvDelimiter = ',', ignoreEmptyRows = true) {

    const start = Date.now();
    let result = true;

    try
    {
        let csvrows = csvReader.csvFileLines(csvFile, csvDelimiter, ignoreEmptyRows);
        
        //bidimensional array check to find bad formatting csv
        if (!Number.isInteger(csvrows.flat().length/csvrows.length)
            || csvrows.flat().length === csvrows.length)
        {
            result = false;
        }

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
 * execution result and time, CSV file name, array containing lines numbers with error.
 * Also very useful for quickly finding the wrong records among millions of lines.
 *
 * @param {string} csvFile - The path to the CSV file.
 * @param {string} csvDelimiter - The CSV separator character, not mandatory. Default value = ','.
 * @param {boolean} ignoreEmptyRows - Non-mandatory parameter to handle the blank line at the end of the file.
 */
function jsonValidation(csvFile, csvDelimiter = ',', ignoreEmptyRows = true) {

    const start = Date.now();
    let result = true;
    let badRows = new Array();
    let executiontime;

    try
    {
        let csvrows = csvReader.csvFileLines(csvFile, csvDelimiter, ignoreEmptyRows);
        let firstLineLength = csvrows[0].length;
        
        //bidimensional array check to find bad formatting csv
        if (!Number.isInteger(csvrows.flat().length/csvrows.length)
            || csvrows.flat().length === csvrows.length)
        {
            csvrows.forEach(function callback(element, index) {
                if (element.length != firstLineLength) {
                    badRows.push(index + 1);
                    result = false;
                }
            });
        }
        
        const end = Date.now();
        executiontime = end - start;

        if (badRows.length > 0) {
            result = false;
        } else {
            result = true;
        }
    
        return JSON.stringify({ 
            "csvFile": csvFile
            , "executiontime" : `${(executiontime)}ms.`
            , "rowsCount" : csvrows.length
            , "columns" : firstLineLength
            , "badRowsLines": badRows
            , "result" : result
            , "message" : ""
        });
    } catch (error) {
        const end = Date.now();
        executiontime = end - start;
        result = false;

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