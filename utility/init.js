// This script will act as initialiser. It will do following things:
// 1. converts CSV to JSON
// 2. cleans data
// 3. Saves location / countries list in a JSON [Performance benefits: Since only 40 different places out of 80,000 rows]

const myconverter = require('./myconverter.js');
const cleaner = require('./data-cleaner.js');
const countries = require('./countries-list.js');

function asynchFake(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), 1000);
  });
}

function func1() {
  myconverter.csv_to_json_converter(
    'utility/data/greenhouse_gas_inventory_data_data.csv',
    'countries-n-environment.json'
  );
  return asynchFake([1, 2, 3]);
}

function func2(func1Data) {
  cleaner.data_cleaning(
    'countries-n-environment.json',
    'countries-n-environment.json'
  );
  return asynchFake(func1Data.map(v => v * 10));
}

function func3(func2Data) {
  countries.listOfCountries_JSON(
    'countries-n-environment.json',
    'unique-countries.json'
  );
  return asynchFake(func2Data.map(v => v * 10));
}

function main() {
  return func1().then(func2).then(func3);
}

main().then(res =>
  console.log(
    `Following tasks done : \n 1) Converted input CSV to JSON \n 2) Data cleaning done \n 3) Exported list_of_countries to JSON for performance benefits `
  )
);
