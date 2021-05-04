import greenhouse_gas_inventory_data from '../data/greenhouse_gas_inventory_data.json';
import {MAP_COLORS} from '../config';

export function fetchMapDataAverage(parameter, start, end, countryNames) {
    let data = greenhouse_gas_inventory_data.filter(
      ele => ele.year >= start && ele.year <= end && ele.category === parameter
    );

    data = data.map(ele => {
      return { country_or_area: ele.country_or_area, value: ele.value };
    });

    let resultArr = [];

    countryNames.forEach(country => {
      let result = data.filter((element) => element.country_or_area === country);
      
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
      return resultArr;
}