import React from 'react';
import TrashIcon from '../../delete.svg'
export default function CountryBox({ countryList, setCountryList }) {
  function handleRemove(event) {
    const newList = countryList.filter(item => item !== event.target.id);

    setCountryList(newList);
  }
  return (
    <div className="countrybox">
      <div className="boxtopbar">Location</div>
      {countryList.map(function (country) {
        return (
          <div>
          <div style={{ display: 'flex', justifyContent: 'space-between',padding:10 }}>
            <div>{country}</div>
            <div className="a" onClick={(event) => {
              handleRemove(event);
              console.log('clicked!')
              console.log(event.target.id)
              }}>
              <img id={country} src={TrashIcon}  alt="logo" height={20}/>
            </div>
          </div>
            <hr/>
          </div>
        );
      })}
    </div>
  );
}
