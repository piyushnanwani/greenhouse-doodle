import React, { useState } from 'react';
import Sidebar from '../sidebar';
import Map from '../map';
import GREENHOUSE_DATA from '../../data/greenhouse_gas_inventory_data.json';
import COUNTRIES_DATA from '../../data/countries.json';

export default function MainApp() {
  const COUNTRIES_DATA_ARR = COUNTRIES_DATA.map(value => value.name);
  const [countryNames, setCountryNames] = useState(COUNTRIES_DATA_ARR); // for drop down
  const [parameter, setParameter] = useState('CO2');
  const [start, setStart] = useState(1990);
  const [end, setEnd] = useState(2014);
  const [countryList, setCountryList] = useState([]);
  
  return (
    <div className="mainApp">
      <h1 className="mainAppH1">
        <span className="mainAppA">Air Quality App:</span> Green House Emissions
        Timeline
      </h1>
      <div className="mainAppChildren">
        <Sidebar
          CLEANED_DATA={GREENHOUSE_DATA}
          parameter={parameter}
          setParameter={setParameter}
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          countryNames={countryNames}
          setCountryNames={setCountryNames}
          countryList={countryList}
          setCountryList={setCountryList}
        />
        <Map
          countryNames={countryNames}
          parameter={parameter}
          start={start}
          end={end}
          countryList={countryList}
        />
      </div>
    </div>
  );
}
