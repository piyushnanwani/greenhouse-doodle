import React from 'react';
import DropDown from 'react-dropdown';
import 'react-dropdown/style.css';

let arr = [];
arr.length = 25;
arr.fill(1990);
arr = arr.map((a, b) => a + b);


const SelectYear = ({year, setYear}) => {
  return (
    <div className="yearMapDropDownContainer">
      <div className="tooltip">
        <DropDown
          className="yearDropDown"
          options={arr}
          placeholder="Select a year"
          onChange={e => setYear(parseInt(e.value))}
          value={year.toString()}
        />
        <span class="tooltiptext">Select a year</span>
      </div>
    </div>
  );
}

export default SelectYear;


