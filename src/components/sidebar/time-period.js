import React, { useState } from 'react';

export default function TimePeriod() {
  const [start, setStart] = useState(1990);
  const [end, setEnd] = useState(2014);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p>Select time period</p>
      <input
        type="text"
        label={'start'}
        value={start}
        onChange={event => setStart(event.target.value)}
      ></input>
      <input
        type="text"
        label={'end'}
        value={end}
        onChange={event => setEnd(event.target.value)}
      ></input>
      <p>
        start : {start} <br /> end : {end}
      </p>
    </div>
  );
}
