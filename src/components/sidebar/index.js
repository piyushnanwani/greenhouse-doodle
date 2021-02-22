import React from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="dropdowns">
        <CountrySelect />
        <ParameterSelect />
      </div>
      <Graph />
    </div>
  );
}
