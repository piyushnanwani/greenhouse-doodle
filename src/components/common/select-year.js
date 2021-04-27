import React from 'react';
import DropDown from 'react-dropdown';

let arr = [];  // array for drop down for year [1990,2014]
arr.length = 25;
arr.fill(1990);
arr = arr.map((a, b) => a + b);


const SelectYear = ({year, setYear, str=null}) => {
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
        <span class="tooltiptext">
          {str === 'start' ? 'Select starting year' : (str === 'end'? 'Select ending year':  'Select a year')}
        </span>
      </div>
    </div>
  );
}

export default SelectYear;


