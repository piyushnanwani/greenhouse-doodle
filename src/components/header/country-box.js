import React from 'react';

export default function CountryBox({ currentList }) {
  return (
    <div className="countrybox">
      <div className="boxtopbar">Location</div>
      <div className="boxchild">
        <div>Australia</div>
        <div>Delete Button</div>
      </div>
      <div className="boxaddchild">
        <button title="+">+</button>
        <input type="text" placeholder="Enter location here"></input>
      </div>
    </div>
  );
}
