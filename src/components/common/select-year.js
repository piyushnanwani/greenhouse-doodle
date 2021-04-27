import React from 'react';
import DropDown from 'react-dropdown';
import 'react-dropdown/style.css';

const SelectYear = ({year, setYear}) => {
  return (
    <DropDown
    className='yearDropDwn'
      options={arr}
      placeholder="Year"
      onChange={(e) => setYear(e.value)}
      value={year}
      default
    />
  );
}

export default SelectYear;

let arr = [];
arr.length = 25;
arr.fill(1990);
arr = arr.map((a, b) => a + b);
