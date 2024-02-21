# csv-alidator

NPM package written in **JavaScript** to quickly validate a csv file based on **RCF 4180 directives** and find wrong records among millions of lines and many columns.

- [csv-alidator](#csv-alidator)
  - [Installation](#installation)
    - [Package check](#package-check)
  - [Usage](#usage)
    - [Validations](#validations)
      - [booleanValidation](#booleanvalidation)
      - [jsonValidation](#jsonvalidation)
  - [Performance considerations](#performance-considerations)
  - [Comma-Separated Values (CSV)](#comma-separated-values-csv)
  - [License](#license)

## Installation

You can install this package via npm.

```bash
npm i csv-alidator
```

### Package check

Just to check the success of the installation, also returns basic package information.

```bash
/**
 * No parameters.
 */

const csvalidator = require('csv-alidator');
console.log(csvalidator.itWorks());

#output : { json } > {
#    "itWorks": "Yes, it works!",
#    "package": "csv-alidator",
#    "version": "1.0.3"
#}
```

## Usage

### Validations

#### booleanValidation

Validates a CSV file giving back true or false.

| Param | Type | Description |
| ----- | ---- | ----------- |
| csvFile | string | Path to the CSV file |
| csvDelimiter | string | The CSV delimiter character, not mandatory. Default value = ',' |
| ignoreEmptyRows | bool | Non-mandatory parameter to handle the blank line at the end of the file |

```bash
const csvalidator = require('csv-alidator');
console.log(csvalidator.booleanValidation('path-to-csv-file'));

#output : { bool } > true | false
```

#### jsonValidation

Validates a CSV file giving back json with information about:
execution result and time, CSV file name, array containing lines numbers with error.
Also very useful for quickly finding the wrong records among millions of lines.

| Param | Type | Description |
| ----- | ---- | ----------- |
| csvFile | string | Path to the CSV file |
| csvDelimiter | string | The CSV delimiter character, not mandatory. Default value = ',' |
| ignoreEmptyRows | bool | Non-mandatory parameter to handle the blank line at the end of the file |

```bash
const csvalidator = require('csv-alidator');
console.log(csvalidator.jsonValidation('path-to-csv-file'));

#output { json } > successful validation: {
#    "csvFile": "path-to-csv-file",
#    "executiontime": "5496ms.",
#    "rowsCount": 1000001,
#    "columns": 9,
#    "badRowsLines": [],
#    "result": true,
#    "message": ""
#}

#output { json } > failed validation: {
#    "csvFile": "path-to-csv-file",
#    "executiontime": "4817ms.",
#    "rowsCount": 1000001,
#    "columns": 9,
#    "badRowsLines": [
#        394579,
#        941245
#    ],
#    "result": false,
#    "message": ""
#}

#output { json } > failed no such file: {
#    "csvFile": "path-to-csv-file",
#    "executiontime": "1ms.",
#    "rowsCount": null,
#    "columns": null,
#    "badRowsLines": null,
#    "result": false,
#    "message": "ENOENT: no such file or directory, open 'path-to-csv-file'"
#}
```

## Performance considerations

**csv-alidator** is designed and tested to quickly validate even large csv files with millions of rows and many columns.

## Comma-Separated Values (CSV)

[RCF 4180 directives](https://www.rfc-editor.org/rfc/rfc4180.html)

## License

[MIT](https://opensource.org/blog/license/mit)
