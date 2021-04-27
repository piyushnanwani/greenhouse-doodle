import React, {useState} from 'react';
import Sidebar from '../sidebar';
import Map from '../map/map';
import GREENHOUSE_DATA from '../../data/greenhouse_gas_inventory_data.json';
import COUNTRIES_DATA from '../../data/countries.json';
import ErrorBoundary from '../common';

export default function MainApp({ setTheme, theme }) {
  const [mapYear, setMapYear] = useState(1990); // defining map state variables here, as we need to pass these to Sidebar, so that URL is in sync with state
  const [mapParameter, setMapParameter] = useState('HFC');
  const COUNTRIES_DATA_ARR = COUNTRIES_DATA.map(value => value.name);

  return (
    <>
      <Sidebar
        CLEANED_DATA={GREENHOUSE_DATA}
        COUNTRIES_DATA={COUNTRIES_DATA_ARR}
        mapYear={mapYear}
        mapParameter={mapParameter}
      />
      <Map />
    </>
  );
}
