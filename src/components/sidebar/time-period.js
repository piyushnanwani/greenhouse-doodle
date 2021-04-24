import React from 'react';
import Dropdown from 'react-dropdown';

const options = Array(34)
  .fill(1990)
  .map((x, y) => x + y);

// export default function TimePeriod({
//   start = options[0],
//   setStart = null,
//   end = options[33],
//   setEnd = null,
//   isThisForMap = false,
// }) {
//   const extraStyleForMap = isThisForMap === true ? 'timeperiod-map' : '';
//   const style = 'timeperiod' + ' ' + extraStyleForMap;
//   return (
//     <div className={style}>
//       <Dropdown
//         options={options}
//         onChange={event => setStart(event.target.value)}
//         value={start}
//         placeholder="Starting year"
//       />
//       {isThisForMap === false ? (
//         <Dropdown
//           options={options}
//           onChange={event => setStart(event.target.value)}
//           value={end}
//           placeholder="Ending year"
//         />
//       ) : null}
//     </div>
//   );
// }
export default function TimePeriod({
  start,
  setStart,
  end = null,
  setEnd = null,
  isThisForMap = false,
}) {
  const extraStyleForMap = isThisForMap === true ? 'timeperiod-map' : '';
  const style = 'timeperiod' + ' ' + extraStyleForMap;
  return (
    <div className={style}>
      <input
        className="myinput"
        type="text"
        label={'start'}
        value={start}
        placeholder="year "
        onChange={event => setStart(event.target.value)}
      ></input>
      {isThisForMap === false ? (
        <input
          className="myinput"
          type="text"
          label={'end'}
          value={end}
          onChange={event => setEnd(event.target.value)}
        ></input>
      ) : null}
    </div>
  );
}
