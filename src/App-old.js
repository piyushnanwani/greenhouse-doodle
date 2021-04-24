import './App.css';
import React, { useState, useEffect } from 'react';
import Map from './components/map';
import Sidebar from './components/sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import GREENHOUSE_DATA from './greenhouse_gas_inventory_data.json';
import COUNTRIES_DATA from './countries.json';
import { coordinates as COUNTRIES_COORDINATES } from './country_coordinates.js';

function App() {
  const [colors, setColors] = useState([
    'rgba(5, 155, 247, 0.7)',
    'rgba(233,30,99,0.7)',
    'rgba(53,211,156,0.7)',
  ]);
  const [countries_data, setCountries_data] = useState([]);
  const [data_loaded, setData_loaded] = useState(false);
  const [fields, setFields] = useState(['confirmed', 'deaths', 'recovered']);
  const [query, setQuery] = useState('confirmed');

  const COUNTRIES_DATA_ARR = COUNTRIES_DATA.map(value => value.name);

  useEffect(() => {
    let filtered_country_data = [];
    for (let i = 0; i < COUNTRIES_DATA.length; i++) {
      for (let j = 0; j < COUNTRIES_COORDINATES.length; j++) {
        if (COUNTRIES_COORDINATES[j].name === COUNTRIES_DATA[i].name)
          filtered_country_data.push(COUNTRIES_COORDINATES[j]);
      }
    }
    // setting latitudes and longitudes
    for (const d of filtered_country_data) {
      d['cordinates'] = {
        latitude: d['latlng'][0],
        longitude: d['latlng'][1],
      };
    }
    setCountries_data(filtered_country_data);
    console.log('countries data');
    console.log(countries_data);
  }, []);

  return (
    <div className="App">
      {/* <Sidebar
        CLEANED_DATA={GREENHOUSE_DATA}
        COUNTRIES_DATA={COUNTRIES_DATA_ARR}
      /> */}
      {/* <ErrorBoundary> */}
      <Map
        colors={colors}
        data={countries_data}
        // data={countries_data}
        fields={fields}
        query={query}
      />
      {/* </ErrorBoundary> */}
    </div>
  );
}

export default App;
