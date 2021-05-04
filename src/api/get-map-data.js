import greenhouse_gas_inventory_data from '../data/greenhouse_gas_inventory_data.json';
import {MAP_COLORS} from '../config';

export function fetchMapData(gas_parameter, year) {
  let data = greenhouse_gas_inventory_data.filter(
    ele => ele.year === year && ele.category === gas_parameter
  );
  data = data.map(ele => {
    return { country_or_area: ele.country_or_area, value: ele.value };
  });

  for (let i = 0; i<data.length; i++)
  {
    if (data[i].value > 100000) data[i]['color'] = MAP_COLORS[7];
    else if (data[i].value > 50000) data[i]['color'] = MAP_COLORS[6];
    else if (data[i].value > 25000) data[i]['color'] = MAP_COLORS[5];
    else if (data[i].value > 10000) data[i]['color'] = MAP_COLORS[4];
    else if (data[i].value > 5000) data[i]['color'] = MAP_COLORS[3];
    else if (data[i].value > 3000) data[i]['color'] = MAP_COLORS[2];
    else if (data[i].value > 1000) data[i]['color'] = MAP_COLORS[1];
    else  data[i]['color'] = MAP_COLORS[0];

  }
  console.log(data);
  return data;
}
export function fetchMapDataAverage(parameter, start, end, countryNames) {
  console.log('suppied country names', countryNames)
  // get all data based on paramater, start, end and countrynames (max 1000 rows)
  // let's say max all 40 countries , all data 8000/8 rows 
  // now itearate over each country name. find average add this to result arr (original object, replace value with this average)
  // now add coloring logic as above
  // complexity: worst case, with our data, N*40

  // using hashmap to store country
    let data = greenhouse_gas_inventory_data.filter(
      ele => ele.year >= start && ele.year <= end && ele.category === parameter
    );

    // check if removing below thing will be good in terms of performance
    data = data.map(ele => {
      return { country_or_area: ele.country_or_area, value: ele.value };
    });

    let resultArr = [];

    countryNames.forEach(country => {
      let result = data.filter((element) => element.country_or_area === country);
      console.log(result)
      
      let sum =0;
      result.forEach(element => {
        sum += element.value;
      });
      let average = sum/(result.length);
      resultArr.push({country_or_area: country, value: average});
    });

      for (let i = 0; i < resultArr.length; i++) {
        if (resultArr[i].value > 100000) resultArr[i]['color'] = MAP_COLORS[7];
        else if (resultArr[i].value > 50000) resultArr[i]['color'] = MAP_COLORS[6];
        else if (resultArr[i].value > 25000) resultArr[i]['color'] = MAP_COLORS[5];
        else if (resultArr[i].value > 10000) resultArr[i]['color'] = MAP_COLORS[4];
        else if (resultArr[i].value > 5000) resultArr[i]['color'] = MAP_COLORS[3];
        else if (resultArr[i].value > 3000) resultArr[i]['color'] = MAP_COLORS[2];
        else if (resultArr[i].value > 1000) resultArr[i]['color'] = MAP_COLORS[1];
        else resultArr[i]['color'] = MAP_COLORS[0];
      }
      console.log(resultArr);
      return resultArr;
}