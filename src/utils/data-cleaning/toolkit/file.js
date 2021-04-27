const fs = require('fs');
function read(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', function (err, textFileData) {
      if (err) {
        reject(err);
        return;
      }
      resolve(textFileData);
    });
  });
}
module.exports = { read: read };

// // ... read toolkit function ...
function write(fileName, textFileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, textFileData, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
module.exports = { read: read, write: write };
