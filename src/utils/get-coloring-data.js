export function generateColorsArr(data) {
  let colorsArr = {};
  for (let i = 0; i < data.length; i++) {
    let lowerCase = data[i].country_or_area.toLowerCase();
    lowerCase = lowerCase.replace(` `, ''); // cleaning
    lowerCase = lowerCase.replace(/['"]+/g, '');

    colorsArr[`${lowerCase}`] = data[i].color;
  }
  return colorsArr;
}
