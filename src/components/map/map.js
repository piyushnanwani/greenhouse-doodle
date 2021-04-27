import React, { useState, Suspense } from 'react';
import { SelectYear, ParameterSelect } from '../common';
import { fetchMapData } from '../../api/get-map-data';
import { generateColorsArr } from '../../utils/get-coloring-data';
import { MAP_COLORS } from '../../config';
import { NavigationBox, Legend, WorldMap } from './index';

export default function Map({
  mapYear,
  setMapYear,
  mapParameter,
  setMapParameter,
}) {
  const [minX, setMinX] = useState(0); // mouse drag, changes these OR Zoom in & Zoom out buttons
  const [minY, setMinY] = useState(0);
  const [viewBoxWidth, setViewBoxWidth] = useState(1500);
  const [viewBoxHeight, setViewBoxHeight] = useState(800);

  const data = fetchMapData(mapParameter, mapYear);
  const colorsArr = generateColorsArr(data);

  console.log(mapYear);
  console.log(mapParameter);
  console.log(data);
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
    <div className="map-container">
      <div className="mapParameterNYearDiv">
        <ParameterSelect
          parameter={mapParameter}
          setParameter={setMapParameter}
          isThisForMap={true}
        />
        <SelectYear year={mapYear} setYear={setMapYear} />
      </div>
      <Suspense fallback={<h1>Loading map.. . </h1>}>
        <div className="nav-box-legend-map-div">
          <NavigationBox
            viewBoxHeight={viewBoxHeight}
            setViewBoxHeight={setViewBoxHeight}
          />
          <Legend
            mapYear={mapYear}
            mapParameter={mapParameter}
            colors={MAP_COLORS}
          />
          <svg viewBox="1000 0 1000 1000" width="700" height="600">
            <WorldMap
              x={position.x}
              y={position.y}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
              fill={position.active ? '#A0A0A0' : '#C8C8C8'}
              width="2000"
              height="857"
              gas_parameter={mapParameter}
              year={mapYear}
              viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
              colors={colorsArr}
            />
          </svg>
        </div>
      </Suspense>
    </div>
  );
}
