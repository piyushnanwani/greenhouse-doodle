import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar';
import GREENHOUSE_DATA from './greenhouse_gas_inventory_data.json';
import COUNTRIES_DATA from './countries.json';
function App() {
  const COUNTRIES_DATA_ARR = COUNTRIES_DATA.map(value => value.name);

  return (
    <div className="App">
      <Sidebar
        CLEANED_DATA={GREENHOUSE_DATA}
        COUNTRIES_DATA={COUNTRIES_DATA_ARR}
      />
      <Map />
    </div>
  );
}

export default App;
