function cleaning_logic(data) {

  let savedNullIndices = []; // storing all null indices
  for (let i = 0; i < data.length; i++) {

    data[i].year = parseInt(data[i].year); //convert year to int
    data[i].value = parseInt(data[i].value); // value to int, since so many decimals insignificant (Since Big Numbers!!)

    /* Shortening these long repeated values */
    data[i].category =  nameShortner[ data[i].category ];
      if (
        data[i].category === '' ||
        parseInt(data[i].year) === null ||
        parseInt(data.value) === null ||
        data.country_or_area === ''
      )
        savedNullIndices.push(i);
  }
  /* removing null data */
  for (let i =0; i<savedNullIndices.length; i++)
  {
      data = data.splice(savedNullIndices[i], 1);
  }
  return data;
}

/* Steps: import JSON */
/* Clean Data */
/* Export JSON Data */
/* Export function which will trigger all above */

const importJsonFile = require('./toolkit/importJsonFile.js');
const exportJsonFile = require('./toolkit/exportJsonFile.js');

function data_cleaning(inputFilePath, outputFilePath) {
  importJsonFile(inputFilePath).then(data => {
    let result = cleaning_logic(data);
    exportJsonFile(outputFilePath, result);
  });
}
module.exports = { data_cleaning };

let nameShortner = {
  carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent:
    'CO2',
  greenhouse_gas_ghgs_emissions_including_indirect_co2_without_lulucf_in_kilotonne_co2_equivalent:
    'GHG_indirect_CO2',
  greenhouse_gas_ghgs_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent:
    'GHG',
  hydrofluorocarbons_hfcs_emissions_in_kilotonne_co2_equivalent: 'HFC',
  methane_ch4_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent:
    'CH4',
  nitrogen_trifluoride_nf3_emissions_in_kilotonne_co2_equivalent: 'NF3',
  nitrous_oxide_n2o_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent:
    'N2Os',
  perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent: 'PFCs',
  sulphur_hexafluoride_sf6_emissions_in_kilotonne_co2_equivalent: 'SF6',
  unspecified_mix_of_hydrofluorocarbons_hfcs_and_perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent:
    'HFC-PFC-mix'
};