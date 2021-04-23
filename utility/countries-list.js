/* To increase performance */
/* Since this is a historial data, we will compute and store these locations once  */

/* Import JSON */
/* logic to find unique locations */
/* EXPORT results to JSON */

const importJsonFile = require('./toolkit/importJsonFile.js');
const exportJsonFile = require('./toolkit/exportJsonFile.js');

function getUniqueLocations(data) {
  let setOfCountries = new Set();

  for (let i = 0; i < data.length; i++) {
    setOfCountries.add(data[i].country_or_area);
  }

  let listOfCountries = Array.from(setOfCountries);
  // console.log(listOfCountries);
  return listOfCountries;
}

function listOfCountries_JSON(inputFilePath, outputFilePath) {
  importJsonFile(inputFilePath).then(data => {
    let result = getUniqueLocations(data);
    let json = [];
    json = result.map(ele => {
      return { name: ele };
    });
    // let json = JSON.stringify(Object.assign({}, result));
    exportJsonFile(outputFilePath, json);
  });
}
module.exports = { listOfCountries_JSON: listOfCountries_JSON };
