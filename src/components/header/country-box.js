import React from 'react';
import TrashIcon from '../../delete.svg';
export default function CountryBox({ countryList, setCountryList }) {
  function handleRemove(event) {
    const newList = countryList.filter(item => item !== event.target.id);

    setCountryList(newList);
  }
  return (
    <div className="countrybox">
      {countryList.length === 0 ? null : (
        <div className="boxtopbar">Locations added by you</div>
      )}
      {countryList.map(function (country) {
        return (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 10,
              }}
            >
              <div>{country}</div>
              <div
                className="a"
                onClick={event => {
                  handleRemove(event);
                }}
              >
                <div className="tooltip">
                  <img
                    id={country}
                    src={TrashIcon}
                    className="trashIcon"
                    alt="logo"
                    height={20}
                  />
                  <span id="tooltip-delete" class="tooltiptext tooltip-delete">
                    Delete
                  </span>
                </div>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
