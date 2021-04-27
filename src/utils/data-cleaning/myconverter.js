const importCsvFile = require('./toolkit/importCsvFile.js');
const exportJsonFile = require('./toolkit/exportJsonFile.js');

function csv_to_json_converter(inputFile, outputFile) {
  importCsvFile
    .importCsvFile(inputFile)
    .then(dataArray => {
      // first converting that data into object
      let result = [];
      let headers = dataArray[0].split(',');

      for (let i = 1; i < dataArray.length; i++) {
        let currentLine = dataArray[i].split(',');
        let obj = {};

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }

        result.push(obj);
      }
      exportJsonFile(outputFile, result);
    })
    .catch(err => {
      console.error('An error occurred.');
      console.error(err.stack);
    });
}

module.exports = {
  csv_to_json_converter: csv_to_json_converter,
};
