const fs = require('node:fs');

/**
 * @param {string} csvFile - The csv file to be read
 * @param {separator} csvDelimiter - The csv delimiter
 * @param {boolean} ignoreEmptyRows - Ignore the empty lines
 */
csvFileLines = function(csvFile, csvDelimiter = ',', ignoreEmptyRows = true) {
  
    const expression = `(".*?"|[^"${csvDelimiter}]+)(?=\\s*${csvDelimiter}|\\s*$)`;
    const regex = new RegExp(expression, 'g');

    const csvLines = csvPath =>
    fs
    .readFileSync(csvPath)
    .toString('UTF8')
    .split('\n')
    .filter(function (el) {
        if (ignoreEmptyRows) {
            return el.trim() != '';
        } else {
            return el == el;
        }
    })
    .map(function (row) {
        return row.match(regex);
    });

    return csvLines(csvFile);

}
  
module.exports = { csvFileLines };