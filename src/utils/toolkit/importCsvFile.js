const file = require('./file.js');
function importCsvFile(filePath) {
  return file.read(filePath).then(data => {
    // let result = [];
    let dataArray = data.split(/\r?\n/);
    // let headers = dataArray[0].split(',');

    // for (let i = 0; i < dataArray.length; i++) {
    //   let currentLine = dataArray[i].split(',');
    //   let obj = {};

    //   for (let j = 0; j < headers.length; j++) {
    //     obj[headers[j]] = currentLine[j];
    //   }

    //   result.push(obj);
    // }
    // exportJsonFile('result.json', result);
    // console.log(result);
    return dataArray;
  });
}
module.exports = { importCsvFile: importCsvFile };
