import React from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import CountryBox from '../header/country-box';
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
    <div>
      <CountryBox countryList={countryList} setCountryList={setCountryList} />
      <div className="country-select">
        <div
          className="addBtn"
          onClick={() => {
            // add to list if not present before
            if (
              countryList.indexOf(country) === -1 &&
              country !== 'Add Location'
            )
              setCountryList([...countryList, country]);
          }}
        >
          +
        </div>
        <div className="dropdown">
          <Dropdown
            options={options}
            value={defaultOption}
            placeholder="Select an option"
            onChange={value => setCountry(value.value)}
          />
        </div>
      </div>
    </div>
  );
}
