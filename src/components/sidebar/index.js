import React, { useState } from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import TimePeriod from './time-period';
// import COUNTRIES_DATA from '../../countries.json';

export default function Sidebar({ CLEANED_DATA, COUNTRIES_DATA }) {
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
