import React, { useState, useEffect } from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import { SelectYear } from '../common';
import TimePeriod from './time-period';
import { ErrorBoundary } from '../common';

export default function Sidebar({
  CLEANED_DATA,
  COUNTRIES_DATA,
  mapYear,
  mapParameter,
  setMapParameter,
  setMapYear,
}) {
  const [savedDataList, setSavedDataList] = useState([]);
  const [currentdata, setCurrentData] = useState([]);

  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState('Add Location');

  const [parameter, setParameter] = useState('CO2');
  const [start, setStart] = useState(1990);
  const [end, setEnd] = useState(2014);
  const COUNTRIES_NAMES = COUNTRIES_DATA;

  let countryListStr = String(countryList);

  window.history.replaceState(
    null,
    'New Page Title',
    `chart?start=${start}&end=${end}&parameter=${parameter}&location=${countryListStr.replace(
      ',',
      '%2b'
    )}&mapYear=${mapYear}&mapParameter=${mapParameter}`
  );
  useEffect(() => {
    let countryListStr = localStorage.getItem('countryList'); // return as string by default
    let startStr = localStorage.getItem('start'); // returns string by default
    let endStr = localStorage.getItem('end'); // returns string by default
    let parameterStr = localStorage.getItem('parameter'); // returns string by default
    let mapYearStr = localStorage.getItem('mapYear'); // returns string by default
    let mapParameterStr = localStorage.getItem('mapParameter'); // returns string by default
    // const savedNotes = JSON.parse(json);
    // console.log('getting following value from local storage: ');
    // console.log(countryList);
    // console.log(typeof countryList);
    // countryList = countryList.map(element => String(element));

    if (countryList && countryListStr && countryListStr !== '') {
      let countryListStr2 = JSON.stringify(countryList);
      // console.log(countryListStr);

      let countryListArr = countryListStr.split(',');
      setCountry(countryListArr[0]);
      setCountryList(countryListArr);
    }
    if (startStr) setStart(startStr);
    if (endStr) setEnd(endStr);
    if (parameterStr) setParameter(parameterStr);
    if (mapYearStr) setMapYear(mapYearStr);
    if (mapParameterStr) setMapParameter(mapParameterStr);
  }, []);
  useEffect(() => {
    // const json = JSON.stringify(notes);
    localStorage.setItem('countryList', countryList);
    localStorage.setItem('start', start); //time Period
    localStorage.setItem('end', end); // time period
    localStorage.setItem('parameter', parameter);
    localStorage.setItem('mapYear', mapYear);
    localStorage.setItem('mapParameter', mapParameter);
    // console.log('setting following value in local storage: ');
    // console.log(countryList);
  }, [countryList, start, end, parameter, mapYear, mapParameter]);

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

      <div style={{ border: 'solid'}}>
        <ErrorBoundary>
          <Graph
            country={country}
            parameter={parameter}
            timePeriod={{ start, end }}
            CLEANED_DATA={CLEANED_DATA}
            countryList={countryList}
            // currentdata={currentdata}
            setCurrentData={setCurrentData}
            savedDataList={savedDataList}
            setSavedDataList={setSavedDataList}
          />
        </ErrorBoundary>
      </div>
      <CountrySelect
        countryList={countryList}
        setCountryList={setCountryList}
        COUNTRIES_NAMES={COUNTRIES_NAMES}
        country={country}
        setCountry={setCountry}
      />
    </div>
  );
}
