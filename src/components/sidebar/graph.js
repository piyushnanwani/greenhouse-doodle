import React from 'react';
import { Chart } from 'react-charts';

export default function Graph({
  country,
  parameter,
  CLEANED_DATA,
  timePeriod,
  countryList
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
    let new_arr = [];
    for (let i = 0; i < countryList.length; i++) {
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

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  const getSeriesStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease',
    }),
    []
  );

  const getDatumStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease',
    }),
    []
  );

  return (
    <div className="chart">
      <Chart
        data={data}
        axes={axes}
        tooltip
        getSeriesStyle={getSeriesStyle}
        getDatumStyle={getDatumStyle}
      />
    </div>
  );
}
