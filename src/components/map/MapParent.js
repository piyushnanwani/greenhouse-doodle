import React, {useState} from 'react';
import DropDown from 'react-dropdown';
import ParameterSelect from '../sidebar/parameter-select';
import TimePeriod from '../sidebar/time-period';
// import Map from './index-young';
import Map from './Map';

const options = Array(34)
  .fill(1990)
  .map((x, y) => x + y);


export default function MapParent() {
  const [year,setYear ] = useState(1990);
  const [parameter,setParameter ] = useState('CO2');
  console.log(year);
  return (
    <div>
      {/* <div style={{display: 'inline-block', width: 100,height:100, padding:100}} >
      <DropDown options={options} value={options[0]} />
      </div> */}
      <TimePeriod  start={year} setStart={setYear} isThisForMap={true} />
      <ParameterSelect  parameter={parameter} setParameter={setParameter}
       isThisForMap={true} />
       {/* <Map />  */}
      {/* <button title="GO">GO</button> */}
      <Map year={year} gas_parameter={parameter} />
    </div>
  );
}
