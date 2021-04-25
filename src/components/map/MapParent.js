import React, { useState } from 'react';
import ParameterSelect from '../sidebar/parameter-select';
import TimePeriod from '../sidebar/time-period';
import Map from './Map';
import ErrorBoundary from '../ErrorBoundary';

export default function MapParent() {
  const [year, setYear] = useState(1990);
  const [parameter, setParameter] = useState('CH4');
  console.log('state values in Map Parent');
  console.log(year)
  console.log(parameter);
  return (
    <div>
      <TimePeriod start={year} setStart={setYear} isThisForMap={true} />
      <ParameterSelect
        parameter={parameter}
        setParameter={setParameter}
        isThisForMap={true}
      />
      <ErrorBoundary>
        <Map year={year} gas_parameter={parameter} />
      </ErrorBoundary>
    </div>
  );
}
