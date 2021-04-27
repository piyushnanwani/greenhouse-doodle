import React from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import CountryBox from './country-box';
// processing done once to load the all the coutries
export default function CountrySelect({
  country,
  setCountry,
  COUNTRIES_NAMES,
  countryList,
  setCountryList,
}) {
  const options = [...COUNTRIES_NAMES];

  const defaultOption = country;

  return (
    <div style={{paddingTop:20}} >
      <div className="country-select">
        <div className="dropdown">
          <div className="tooltip" style={{ width: '100%' }}>
            <Dropdown
              options={options}
              value={defaultOption}
              placeholder="Select an option"
              onChange={value => setCountry(value.value)}
            />
            <span class="tooltiptext">Select a country</span>
          </div>
        </div>
        <div className="tooltips">
          <div
            className="addBtn"
            onClick={() => {
              // add to list if not present before
              if (
                countryList.indexOf(country) === -1 &&
                country !== 'Add Location'
              )
                setCountryList([...countryList, country]);
              /* first get value of previous state if necessary */
            }}
          >
            +
          </div>
          {/* <span class="tooltiptext">Click to Add</span> */}
        </div>
      </div>
      <CountryBox countryList={countryList} setCountryList={setCountryList} />
    </div>
  );
}
