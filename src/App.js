import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar';
import JSON_DATA from './greenhouse_gas_inventory_data_data.json';
// cleaning data
import COUNTRIES_DATA from './countries.json';

function App() {
  const CLEANED_DATA = cleaner(JSON_DATA);
  // const [CLEANED_DATA, COUNTRIES_DATA2] = cleaner(JSON_DATA);
  console.log(CLEANED_DATA);
  // console.log(COUNTRIES_DATA2);

  return (
    <div className="App">
      <Sidebar CLEANED_DATA={CLEANED_DATA} COUNTRIES_DATA={COUNTRIES_DATA2} />
      <Map />
    </div>
  );
}

export default App;

function cleaner(data) {
  // let setOfCountries = new Set();

  for (let i = 0; i < data.length; i++) {
    data[i].value = parseInt(data[i].value);
    // setOfCountries.add(data[i].country_or_area);
    if (
      data[i].category ===
      'carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'CO2';
    else if (
      data[i].category ===
      'greenhouse_gas_ghgs_emissions_including_indirect_co2_without_lulucf_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'GHG_indirect_CO2';
    else if (
      data[i].category ===
      'greenhouse_gas_ghgs_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'GHG';
    else if (
      data[i].category ===
      'hydrofluorocarbons_hfcs_emissions_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'HFC';
    else if (
      data[i].category ===
      'methane_ch4_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'CH4';
    else if (
      data[i].category ===
      'nitrogen_trifluoride_nf3_emissions_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'NF3';
    else if (
      data[i].category ===
      'nitrous_oxide_n2o_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'N2Os';
    else if (
      data[i].category ===
      'perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'PFCs';
    else if (
      data[i].category ===
      'sulphur_hexafluoride_sf6_emissions_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'SF6';
    else if (
      data[i].category ===
      'unspecified_mix_of_hydrofluorocarbons_hfcs_and_perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent'
    )
      data[i].category = 'HFC-PFC-mix';
  }
  console.log('Data cleaned!');
  console.log(data);

  // let listOfCountries = Array.from(setOfCountries);

  return data;
  // return [data, listOfCountries];
}

let COUNTRIES_DATA2 = [
  'Czech Republic',
  'Australia',
  'Cyprus',
  'Germany',
  'Greece',
  'Hungary',
];
