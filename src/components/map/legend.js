import React from 'react';
const Legend = props => {
  const emmisionsRange = [1000, 3000, 5000, 10000, 25000, 50000, 100000, 200000];
  const renderLegendKeys = (colors, i) => {
    return (
      <div key={i}>
        <span style={{ backgroundColor: colors }}>
          <span style={{ width: 1 }}>{`____ `}</span>
        </span>
        <span style={{ marginLeft: 5 }}>{emmisionsRange[i]} </span>
      </div>
    );
  };

  return (
    <>
      <div className="legend-container">
        <div className="legend-header">
          <p>{props.parameter}</p>
          <p style={{ fontSize: 12 }}>( In Kilo Tons )</p>
          <p>
            {props.start}-{props.end} 
          </p>
        </div>
        {props.colors.map(renderLegendKeys)}
      </div>
    </>
  );
};

export default Legend;
