import React, { useState } from 'react';
import ParameterSelect from '../sidebar/parameter-select';
import TimePeriod from '../sidebar/time-period';
import Map from './Map';
import ErrorBoundary from '../ErrorBoundary';

export default function MapParent({mapYear, setMapYear, mapParameter, setMapParameter}) {
  console.log('state values in Map Parent');
  console.log(mapYear);
  console.log(mapParameter);

  return (
    <div>
      <TimePeriod start={mapYear} setStart={setMapYear} isThisForMap={true} />
      <ParameterSelect
        parameter={mapParameter}
        setParameter={setMapParameter}
        isThisForMap={true}
      />
      <ErrorBoundary>
        <Map year={mapYear} gas_parameter={mapParameter} />
      </ErrorBoundary>
    </div>
  );
}
