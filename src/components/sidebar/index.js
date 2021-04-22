import React, { useState } from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import TimePeriod from './time-period';
// import COUNTRIES_DATA from '../../countries.json';

export default function Sidebar({ CLEANED_DATA, COUNTRIES_DATA }) {
  const [countryList, setCountryList] = useState(['Australia']);
  const [country, setCountry] = useState('Australia');
  const [parameter, setParameter] = useState('CO2');
  const [start, setStart] = useState(1990);
  const [end, setEnd] = useState(2014);
  const COUNTRIES_NAMES = COUNTRIES_DATA.map(item => item.name);
  // const COUNTRIES_NAMES = COUNTRIES_DATA.map(item => item.name);
  // console.log(COUNTRIES_NAMES);

  return (
    <div className="sidebar">
      <div className="dropdowns">
        <CountrySelect
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
      />
    </div>
  );
}
