# csv-alidator

NPM package written in **JavaScript** to quickly validate a csv file based on **RCF 4180 directives**.

- [csv-alidator](#csv-alidator)
  - [Installation](#installation)
    - [Package check](#package-check)
  - [Usage](#usage)
    - [Validations](#validations)
      - [booleanValidation](#booleanvalidation)
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

#output : { json } > {"itWorks":"Yes, it works!","package":"csv-alidator","version":"1.0.1"} 
```

## Usage

### Validations

#### booleanValidation

```bash
/**
 * Validates a CSV file.
 *
 * @param {string} csvFile - The path to the CSV file.
 * @param {string} separator - The CSV separator character, not mandatory. Default value = ','.
 * @param {boolean} ignoreEmptyRows - Non-mandatory parameter to handle the blank line at the end of the file.
 */

const csvalidator = require('csv-alidator');
console.log(csvalidator.booleanValidation('path-to-csv-file'));

#output : { bool } > true | false
```

## Performance considerations

**csv-alidator** is designed and tested to quickly validate even large csv files with millions of rows and many columns.

## Comma-Separated Values (CSV)

[RCF 4180 directives](https://www.rfc-editor.org/rfc/rfc4180.html)

## License

[MIT](https://opensource.org/license/mit/)
