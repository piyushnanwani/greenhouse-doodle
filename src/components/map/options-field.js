import React from 'react';
import DropDown from 'react-dropdown';

const Optionsfield = props => {
  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={event => {
            console.log(event);
            props.changeState(i);
            alert('arey bhai bhai bhai!')
          }}
          checked={option.name === props.name}
          name="toggle"
          type="radio"
        />
        <div
          className="toggle txt-s py3 toggle--active-white"
          onClick={event => {
            let targetValue = event.target.textContent;
            let index = props.options.findIndex(
              ele => ele.name === targetValue
            );
            console.log('hi while changing the state');
            console.log(index);
            props.changeState(index);
          }}
        >
          {option.name}
        </div>
      </label>
    );
  };
  return (
    <div>
      <div
        style={{ position: 'absolute', top: '40%', right: '10%' }}
        className="toggle-group  ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1 "
        // className="toggle-group absolute top right ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1 "
      >
        {props.options.map(renderOptions)}
      </div>
      <DropDown
        className="optionsFields-dropdown  ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1"
        // style={{ position: 'absolute', top: '50%', right: '10%', width:'10%' }}
        options={arr}
        placeholder="Year"
        // onChange={this._onSelect}
        // value={defaultOption}
      />
    </div>
  );
};

export default Optionsfield;

let arr = [];
arr.length = 25;
arr.fill(1990);
arr = arr.map((a, b) => a + b);
console.log(arr);
