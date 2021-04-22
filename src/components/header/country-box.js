import React from 'react';

export default function CountryBox({ countryList, setCountryList }) {
  console.log(countryList);
  function handleRemove(event) {
    const newList = countryList.filter(item => item !== event.target.id);

    setCountryList(newList);
  }
  return (
    <div className="countrybox">
      <div className="boxtopbar">Location</div>
      {countryList.map(function (country) {
        return (
          <div className="boxchild">
            <div id={country} className="addBtn" onClick={handleRemove}>
              -
            </div>
            <div className="dropdown">{country}</div>
          </div>
        );
      })}
    </div>
  );
}
