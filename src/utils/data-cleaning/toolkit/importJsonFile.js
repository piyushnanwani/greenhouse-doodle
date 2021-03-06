const file = require('./file.js');
// Toolkit function to import a JSON file.
function importJsonFile(filePath) {
  return file.read(filePath).then(textFileData => {
    return JSON.parse(textFileData);
  });
}
module.exports = importJsonFile;
