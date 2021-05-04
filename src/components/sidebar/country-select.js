import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import CountryBox from './country-box';
// processing done once to load the all the coutries
export default function CountrySelect({
  country,
  setCountry,
  COUNTRIES_NAMES,
  countryList,
  setCountryList,
  countryNames,
  setCountryNames,
}) {
  // const [countryNames, setCountryNames] = useState(COUNTRIES_NAMES); // for drop down
  const options = [...countryNames];
  // const options = [...COUNTRIES_NAMES];

  const defaultOption = country;
  useEffect(() => {
    setCountry(countryNames[0]);
  }, [countryNames]);
  return (
    <div className="country-select-container">
      <div className="country-select">
        <div className="dropdown">
          <div className="tooltip width-100">
            <Dropdown
              options={options}
              value={defaultOption}
              placeholder="Select an option"
              onChange={value => setCountry(value.value)}
            />
            <span class="tooltiptext">Select a country</span>
          </div>
        </div>
        <div
          unselectable="on"
          onselectstart="return false;"
          onmousedown="return false;"
          className="addBtn"
          onClick={() => {
            // add to list if not present before
            if (
              countryList.indexOf(country) === -1 &&
              country !== 'Add Location'
            )
              if (country === undefined) {
                // if list empty , alert
                alert('All countries already selected!');
                return;
              }

            setCountryList([...countryList, country]);
            setCountryNames(previousState =>
              previousState.filter(ele => ele !== country)
            ); // remove name from drop down
            // setCountry(countryNames[0]);
            /* first get value of previous state if necessary */
          }}
        >
          {' '}
          +
        </div>
      </div>
      <CountryBox
        countryList={countryList}
        setCountryList={setCountryList}
        countryNames={countryNames}
        setCountryNames={setCountryNames}
      />
    </div>
  );
}
