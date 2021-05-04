import React, { useState, useEffect } from 'react';
import { Graph, CountrySelect, ParameterSelect } from './index';
import { SelectYear, ErrorBoundary } from '../common';
import { updateBrowserUrl } from '../../utils/update-browser-url';

export default function Sidebar({
  CLEANED_DATA,
  countryNames,
  setCountryNames,
  start,
  setStart,
  end,
  setEnd,
  parameter,
  setParameter,
  countryList,
  setCountryList,
}) {
  const [country, setCountry] = useState('Add Location');

  let countryListStr = String(countryList);

  updateBrowserUrl(start, end, parameter, countryListStr);

  useEffect(() => {
    let countryListStr = localStorage.getItem('countryList'); // returns a string by default
    let startStr = localStorage.getItem('start');
    let endStr = localStorage.getItem('end');
    let parameterStr = localStorage.getItem('parameter');

    if (countryList && countryListStr && countryListStr !== '') {
      // removing garbage values from countryListStr
      while (countryListStr[0] === ',') {
        countryListStr = countryListStr.slice(1, countryListStr.length); 
      }
      let countryListArr = countryListStr.split(',');
      setCountry(countryListArr[0]);
      setCountryList(countryListArr);
      // removing already selected countries from country names
      let tmp = countryNames.filter(ele => countryListArr.indexOf(ele) === -1);
      setCountryNames(tmp);
    }
    if (startStr) setStart(startStr);
    if (endStr) setEnd(endStr);
    if (parameterStr) setParameter(parameterStr);
  }, []);
  useEffect(() => {
    localStorage.setItem('countryList', countryList);
    localStorage.setItem('start', start); //time Period
    localStorage.setItem('end', end); // time period
    localStorage.setItem('parameter', parameter);
  }, [countryList, start, end, parameter]);

  if (start > end) {
    alert('Starting year cannot be greater than Ending year!');
    setStart(1990);
    setEnd(2014);
  }

  return (
    <div className="sidebar">
      <div className="dropdowns">
        <ErrorBoundary>
          <div className="timeNParameter">
            <SelectYear year={start} setYear={setStart} str="start" />
            <SelectYear year={end} setYear={setEnd} str="end" />
            <ParameterSelect
              parameter={parameter}
              setParameter={setParameter}
            />
          </div>
        </ErrorBoundary>
      </div>

      <div className="graph-container">
        <ErrorBoundary>
          <Graph
            country={country}
            parameter={parameter}
            timePeriod={{ start, end }}
            CLEANED_DATA={CLEANED_DATA}
            countryList={countryList}
          />
        </ErrorBoundary>
      </div>
      <CountrySelect
        countryList={countryList}
        setCountryList={setCountryList}
        COUNTRIES_NAMES={countryNames}
        country={country}
        setCountry={setCountry}
        countryNames={countryNames}
        setCountryNames={setCountryNames}
      />
    </div>
  );
}
