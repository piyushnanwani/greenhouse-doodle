import React, { useState, useEffect } from 'react';
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
  let filteredData = [];
  // // if (!countryList.includes(country)) {

  // // }
  // useEffect(()=> {

  //   // means added new country whose graph needs to be rendered
  //   for(let i=0; i<countryList.length; i++)
  //   {

  //   }

  // }, [countryList])

  filteredData = CLEANED_DATA.filter(
    dataPoint =>
      dataPoint.country_or_area === countryList[0] &&
      dataPoint.category === parameter &&
      dataPoint.year >= timePeriod.start &&
      dataPoint.year <= timePeriod.end
  );
  let filteredData2 = CLEANED_DATA.filter(
    dataPoint =>
      dataPoint.country_or_area === countryList[1] &&
      dataPoint.category === parameter &&
      dataPoint.year >= timePeriod.start &&
      dataPoint.year <= timePeriod.end
  );
  let filteredData3 = CLEANED_DATA.filter(
    dataPoint =>
      dataPoint.country_or_area === countryList[2] &&
      dataPoint.category === parameter &&
      dataPoint.year >= timePeriod.start &&
      dataPoint.year <= timePeriod.end
  );
  console.log('inside graph component');
  console.log(country);
  console.log(filteredData);

  const data = [
    {
      label: countryList[0],
      data: filteredData.map(dataItem => {
        return { x: dataItem.year, y: dataItem.value };
      }),
    },

    {
      label: countryList[1],
      data: filteredData2.map(dataItem => {
        return { x: dataItem.year, y: dataItem.value };
      }),
    },
    {
      label: countryList[2],
      data: filteredData3.map(dataItem => {
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
