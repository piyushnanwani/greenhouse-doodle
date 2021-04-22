import React from 'react';
import { Chart } from 'react-charts';

export default function Graph({
  country,
  parameter,
  CLEANED_DATA,
  timePeriod,
}) {
  let filteredData = CLEANED_DATA.filter(
    dataPoint =>
      dataPoint.country_or_area === country &&
      dataPoint.category === parameter &&
      dataPoint.year >= timePeriod.start &&
      dataPoint.year <= timePeriod.end
  );
  console.log('inside graph component');
  console.log(country);
  console.log(filteredData);
  console.log(filteredData.map(dataItem => [dataItem.value, dataItem.year]));

  const data = [
    {
      label: country,
      data: filteredData.map(dataItem => {
        return { x: dataItem.year, y: dataItem.value + 1000 };
      }),
    },

    {
      label: country,
      data: filteredData.map(dataItem => {
        return { x: dataItem.year, y: dataItem.value };
      }),
    },
  ];

  const axes = React.useMemo(
    () => [
      // { primary: true, type: 'time', position: 'bottom' },
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
