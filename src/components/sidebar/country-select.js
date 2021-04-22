import React from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

// processing done once to load the all the coutries
export default function CountrySelect({
  country,
  setCountry,
  COUNTRIES_NAMES,
}) {
  const options = [...COUNTRIES_NAMES];

  const defaultOption = country;

  return (
    <div className="country-select">
      <div className="addBtn" onClick={() => console.log('hey')}>
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
  );
}
