import React from 'react';
import { Chart } from 'react-charts';

export default function Graph({
  country,
  parameter,
  CLEANED_DATA,
  timePeriod,
  countryList,
  savedDataList,
  setSavedDataList,
  // currentData,
  setCurrentData,
}) {
  // if country does not lie in country list , then render it
  let filteredDataArr = [];
  for (let i = 0; i < countryList.length; i++) {
    let filteredData_current_country = CLEANED_DATA.filter(
      dataPoint =>
        dataPoint.country_or_area === countryList[i] &&
        dataPoint.category === parameter &&
        dataPoint.year >= timePeriod.start &&
        dataPoint.year <= timePeriod.end
    );
    filteredDataArr.push(filteredData_current_country);
  }

  function format_data_for_line_chart(filteredDataArr, countryList) {
    console.log('bye');
    console.log(filteredDataArr);
    console.log(countryList);
    let new_arr = [];
    for (let i = 0; i < countryList.length; i++) {
      // new_arr.push({ label: countryList[i], data:  () => { x:filteredDataArr[i].year, y: filteredDataArr[i].value} })
      new_arr.push({
        label: countryList[i],
        data: filteredDataArr[i].map(ele => {
          return {
            x: ele.year,
            y: ele.value,
          };
        }),
      });
    }
    return new_arr;
  }

  const data = format_data_for_line_chart(filteredDataArr, countryList);
  console.log('Hi');
  console.log(data);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        padding: 0,
        margin: 10,
      }}
      className="chart"
    >
      <Chart data={data} axes={axes} tooltip />
    </div>
  );
}
