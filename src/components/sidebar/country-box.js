import React from 'react';
import TrashIcon from '../../assets/svg/delete.svg';
export default function CountryBox({
  countryList,
  setCountryList,
  countryNames,
  setCountryNames,
}) {
  function handleRemove(event) {
    if (
      event.target.id === null ||
      event.target.id === '' ||
      event.target.id === ' '
    )
      return;
    const newList = countryList.filter(item => item !== event.target.id);

    setCountryList(newList);
    setCountryNames([...countryNames, event.target.id]);
  }
  return (
    <div className="countrybox">
      {countryList.length === 0 ? null : (
        <div className="boxtopbar">Locations added by you</div>
      )}
      {countryList.map(function (country) {
        if (country === null || country === '') return country;
        return (
          <div className="countryBoxList">
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
                <img
                  id={country}
                  src={TrashIcon}
                  className="trashIcon"
                  alt="logo"
                  height={20}
                />
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
