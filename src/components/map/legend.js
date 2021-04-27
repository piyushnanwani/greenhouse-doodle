import React from 'react';
const Legend = props => {
  const range = [1000,3000,5000, 10000, 25000, 50000, 100000,200000];
  const renderLegendKeys = (colors, i) => {
    return (
      <div key={i} >
        <span
          style={{ backgroundColor: colors }}
        >
        <span style={{width:1}} >{`____ `}
        </span>
        </span>
        <span style={{ marginLeft:5 }} >{range[i]} </span>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: '14%',
          // right: '2%',
          // backgroundColor: 'pink',
          border: 'solid',
          borderColor: 'cyan',
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          zIndex: +12
        }}
      >
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          <p >{props.mapParameter}</p>
          <p style={{fontSize:12}} >( In Kilo Tons )</p>
          <p>{props.mapYear}</p>
        </div>
        {props.colors.map(renderLegendKeys)}
      </div>
    </>
  );
};

export default Legend;
