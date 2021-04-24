import './App.css';
import MapParent from './components/map/MapParent';
import Sidebar from './components/sidebar';
import GREENHOUSE_DATA from './greenhouse_gas_inventory_data.json';
import COUNTRIES_DATA from './countries.json';
import ErrorBoundary from './components/ErrorBoundary';
// Add ErrorBoundary later
function App() {
  const COUNTRIES_DATA_ARR = COUNTRIES_DATA.map(value => value.name);

  return (
    <div className="App">
      <h1 style={{textAlign: 'center', paddingTop:10}} >
        <a style={{ color: 'cyan' }}>Air Quality App:</a> Green House Emissions
        Timeline
      </h1>
      <div>
        <Sidebar
          CLEANED_DATA={GREENHOUSE_DATA}
          COUNTRIES_DATA={COUNTRIES_DATA_ARR}
        />
        <MapParent />
      </div>
    </div>
  );
}

export default App;
