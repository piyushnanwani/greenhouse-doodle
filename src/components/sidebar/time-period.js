import React from 'react';

export default function TimePeriod({ start, setStart, end, setEnd }) {
  return (
    <div className="timeperiod">
      <input
        className="myinput"
        type="text"
        label={'start'}
        value={start}
        onChange={event => setStart(event.target.value)}
      ></input>
      <input
        className="myinput"
        type="text"
        label={'end'}
        value={end}
        onChange={event => setEnd(event.target.value)}
      ></input>
    </div>
  );
}
