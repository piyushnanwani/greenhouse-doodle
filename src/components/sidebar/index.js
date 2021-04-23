import React, { useState, useEffect } from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import TimePeriod from './time-period';
// import COUNTRIES_DATA from '../../countries.json';

export default function Sidebar({ CLEANED_DATA, COUNTRIES_DATA }) {
  const [urlQueryParams, setUrlQueryParams] = useState('');
  const [savedDataList, setSavedDataList] = useState([]);
  const [currentdata, setCurrentData] = useState([]);

  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState('Add Location');

  const [parameter, setParameter] = useState('CO2');
  const [start, setStart] = useState(1990);
  const [end, setEnd] = useState(2014);
  const COUNTRIES_NAMES = COUNTRIES_DATA;
  // const COUNTRIES_NAMES = COUNTRIES_DATA.map(item => item.name);
  // console.log(COUNTRIES_NAMES);
  // window.history.replaceState(null, 'New Page Title', urlQueryParams);
  // let countryListStr = countryList.map((ele) => {
  //   return (
  //     'country:',
  //   )
  // })

  let countryListStr = String(countryList);
  // console.log('cry====');
  // console.log(countryListStr.replace(',', '%2b'));
  // console.log(countryList);

  window.history.replaceState(
    null,
    'New Page Title',
    `chart?start=${start}&end=${end}&parameter=${parameter}&location=${countryListStr.replace(
      ',',
      '%2b'
    )}`
  );
  useEffect(() => {
    let countryListStr = localStorage.getItem('countryList'); // return as string by default
    let startStr = localStorage.getItem('start'); // returns string by default
    let endStr = localStorage.getItem('end'); // returns string by default
    let parameterStr = localStorage.getItem('parameter'); // returns string by default
    // const savedNotes = JSON.parse(json);
    console.log('getting following value from local storage: ');
    console.log(countryList);
    console.log(typeof countryList);
    // countryList = countryList.map(element => String(element));
    let countryListStr2 = JSON.stringify(countryList);
    console.log(countryListStr);

    let countryListArr = countryListStr.split(',');
    console.log(countryListArr);
    console.log(countryListArr[0]);

    if (countryList) {
      // setCountry(countryList[0]);
      // setCountryList(countryList);
      setCountry(countryListArr[0]);
      setCountryList(countryListArr);
    }
    if (startStr) setStart(startStr);
    if (endStr) setEnd(endStr);
    if (parameterStr) setParameter(parameterStr);
  }, []);
  useEffect(() => {
    // const json = JSON.stringify(notes);
    localStorage.setItem('countryList', countryList);
    localStorage.setItem('start', start); //time Period
    localStorage.setItem('end', end); // time period
    localStorage.setItem('parameter', parameter);
    console.log('setting following value in local storage: ');
    console.log(countryList);
  }, [countryList, start, end, parameter]);
  return (
    <div className="sidebar">
      <div className="dropdowns">
        <CountrySelect
          countryList={countryList}
          setCountryList={setCountryList}
          COUNTRIES_NAMES={COUNTRIES_NAMES}
          country={country}
          setCountry={setCountry}
        />
        <div className="timeNParameter">
          <TimePeriod
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
          />
          <ParameterSelect parameter={parameter} setParameter={setParameter} />
        </div>
      </div>
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
    </div>
  );
}
