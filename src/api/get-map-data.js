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
