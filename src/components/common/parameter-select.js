import React from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

export default function ParameterSelect({ parameter, setParameter, isThisForMap=false }) {
  const options = [
    'CO2',
    'GHG_indirect_CO2',
    'GHG',
    'HFC',
    'CH4',
    'NF3',
    'N2Os',
    'PFCs',
    'SF6',
    'HFC-PFC-mix',
  ];
  const extraStyleForMap = isThisForMap===true? "parameter-select-map": "";
  const style = 'parameter-select' + ' ' + extraStyleForMap;
  return (
      <div className={style}>
    <div className="tooltip">
        <Dropdown
          className="parameter-select2"
          options={options}
          value={parameter}
          placeholder="Select an option"
          onChange={value => {
            setParameter(value.value);
          }}
        />
      <span class="tooltiptext">Select a green house gas</span>
      </div>
    </div>
  );
}
