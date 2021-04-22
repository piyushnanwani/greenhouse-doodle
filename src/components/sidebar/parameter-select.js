import React from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

export default function ParameterSelect({ parameter, setParameter }) {
  console.log(parameter);
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

  return (
    <div className="parameter-select">
      <Dropdown
        options={options}
        value={parameter}
        placeholder="Select an option"
        onChange={value => setParameter(value)}
      />
    </div>
  );
}
