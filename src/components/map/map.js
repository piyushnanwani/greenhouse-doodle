import React, { useState, Suspense } from 'react';
import { default as WorldMap } from './world-map.js';
import { SelectYear, ParameterSelect } from '../common';
import { fetchMapData } from '../../api/get-map-data';
import { generateColorsArr } from '../../utils/get-coloring-data';

export default function Map() {
  const [minX, setMinX] = useState(600); // mouse drag, changes these OR Zoom in & Zoom out buttons
  const [minY, setMinY] = useState(0);
  const [viewBoxWidth, setViewBoxWidth] = useState(1000);
  const [viewBoxHeight, setViewBoxHeight] = useState(1000);

  const [mapYear, setMapYear] = useState(1990); // defining map state variables here, as we need to pass these to Sidebar, so that URL is in sync with state
  const [mapParameter, setMapParameter] = useState('HFC');

  const data = fetchMapData(mapParameter, mapYear);
  const colorsArr = generateColorsArr(data);

  const [position, setPosition] = React.useState({
    x: 100,
    y: 100,
    active: false,
    offset: {},
  });

  const handlePointerDown = e => {
    const el = e.target;
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    el.setPointerCapture(e.pointerId);
    setPosition({
      ...position,
      active: true,
      offset: {
        x,
        y,
      },
    });
  };
  const handlePointerMove = e => {
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    if (position.active) {
      setPosition({
        ...position,
        x: position.x - (position.offset.x - x),
        y: position.y - (position.offset.y - y),
      });
    }
  };
  const handlePointerUp = e => {
    setPosition({
      ...position,
      active: false,
    });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: 10,
          margin: 10,
        }}
      >
        <button onClick={() => setViewBoxHeight(viewBoxHeight - 50)}>
          Zoom In
        </button>
        <button onClick={() => setViewBoxHeight(viewBoxHeight + 50)}>
          Zoom Out
        </button>
        <button onClick={() => setMinY(minY - 50)}>Up</button>
        <button onClick={() => setMinY(minY + 50)}>Down</button>
        <button onClick={() => setMinX(minX - 50)}>Left</button>
        <button onClick={() => setMinX(minX + 50)}>Right</button>

        <ParameterSelect
          parameter={mapParameter}
          setParameter={setMapParameter}
          isThisForMap={true}
        />

        <SelectYear year={mapYear} setYear={setMapYear} />
      </div>
      <Suspense fallback={<h1>Loading map.. . </h1>}>
        <svg
          viewBox="1000 0 1000 1000"
          width="2000"
          height="857"
          viewport-fill="rgb(255,150,200)"
          viewport-stroke="rgb(255,150,200)"
        >
          <WorldMap
            x={position.x}
            y={position.y}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            fill={position.active ? 'blue' : 'black'}
            width="2000"
            height="857"
            // viewBox="600 0 1000 1000"
            gas_parameter={mapParameter}
            year={mapYear}
            // width={2000}
            // height={857}
            viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
            colors={colorsArr}
          />
        </svg>
      </Suspense>
    </div>
  );
}
