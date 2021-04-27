import React, { useState, useEffect } from 'react';
import { Graph, CountrySelect, ParameterSelect } from './index';
import { SelectYear, ErrorBoundary } from '../common';
import {updateBrowserUrl} from '../../utils/update-browser-url';

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
  
  updateBrowserUrl(
    start,
    end,
    parameter,
    countryListStr,
    mapYear,
    mapParameter
  );

  useEffect(() => {
    let countryListStr = localStorage.getItem('countryList'); // returns a string by default
    let startStr = localStorage.getItem('start'); 
    let endStr = localStorage.getItem('end'); 
    let parameterStr = localStorage.getItem('parameter');
    let mapYearStr = localStorage.getItem('mapYear'); 
    let mapParameterStr = localStorage.getItem('mapParameter'); 

    if (countryList && countryListStr && countryListStr !== '') {
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
    localStorage.setItem('countryList', countryList);
    localStorage.setItem('start', start); //time Period
    localStorage.setItem('end', end); // time period
    localStorage.setItem('parameter', parameter);
    localStorage.setItem('mapYear', mapYear);
    localStorage.setItem('mapParameter', mapParameter);
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

      <div className="graph-container">
        <ErrorBoundary>
          <Graph
            country={country}
            parameter={parameter}
            timePeriod={{ start, end }}
            CLEANED_DATA={CLEANED_DATA}
            countryList={countryList}
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
