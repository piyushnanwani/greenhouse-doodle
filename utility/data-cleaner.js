function cleaning_logic(data) {

  let savedNullIndices = []; // storing all null indices
  for (let i = 0; i < data.length; i++) {

    data[i].year = parseInt(data[i].year); //convert year to int
    data[i].value = parseInt(data[i].value); // value to int, since so many decimals insignificant (Since Big Numbers!!)

    /* Shortening these long repeated values */
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

      if (
        data[i].category === '' ||
        parseInt(data[i].year) === null ||
        parseInt(data.value) === null ||
        data.country_or_area === ''
      )
        savedNullIndices.push(i);
  }
  /* removing null data */
  // console.log(savedNullIndices.length);
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
