import './App.css';
import React, {useState} from 'react';
import MapParent from './components/map/MapParent';
import Sidebar from './components/sidebar';
import GREENHOUSE_DATA from './greenhouse_gas_inventory_data.json';
import COUNTRIES_DATA from './countries.json';
import ErrorBoundary from './components/ErrorBoundary';
// Add ErrorBoundary later
function App() {
    const [mapYear, setMapYear] = useState(1990);  // defining map state variables here, as we need to pass these to Sidebar, so that URL is in sync with state
    const [mapParameter, setMapParameter] = useState('HFC');
  const COUNTRIES_DATA_ARR = COUNTRIES_DATA.map(value => value.name);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', paddingTop: 10 }}>
        <a style={{ color: 'cyan' }}>Air Quality App:</a> Green House Emissions
        Timeline
      </h1>
      <div>
        <Sidebar
          CLEANED_DATA={GREENHOUSE_DATA}
          COUNTRIES_DATA={COUNTRIES_DATA_ARR}
          mapYear={mapYear}
          mapParameter={mapParameter}
        />
        <MapParent
          mapYear={mapYear}
          setMapYear={setMapYear}
          mapParameter={mapParameter}
          setMapParameter={setMapParameter}
        />
      </div>
    </div>
  );
}

export default App;
