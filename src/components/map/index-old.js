import React, { Component, useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

// import Tooltip from './Tooltip';

const TOKEN =
  'pk.eyJ1Ijoiam9udGF5eXciLCJhIjoiY2s4aXcwbnA0MGFqYjNscDZicm9haXA3cCJ9.rI3D6Y4ZETQnYukX9RCOow';
export default function Map(props) {
  console.log('inside map component');
  console.log(props);
  const [map_data, setMap_data] = useState(props.data);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });
  const [fields, setFields] = useState(props.fields);

  // useEffect(()=> {
  //   console.log('map data');
  //   console.log(props.data);
  //   setMap_data(map_data);
  // },[])

  // useEffect(() => {
  //   const { query } = props;
  //   if (query !== props.query) {
  //     prepareData();
  //   }
  // }, [props])

  return (
    // <div className='map' >
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onViewportChange={viewport => setViewport(viewport)}
    >
      {map_data.map((country, index) => {
        const longitude = Number(country.cordinates.latitude);
        const latitude = Number(country.cordinates.longitude);

        return (
          <Marker key={index} longitude={longitude} latitude={latitude}>
            <div
              className="map-marker"
              style={{
                backgroundColor: 'blue',
                height: 10,
                width: 12,
                // backgroundColor: country.color,
                // height: country.size,
                // width: country.size,
              }}
              // onClick={() => this.setState({ tooltip: country })}
            />
          </Marker>
        );
      })}

      <div className="map-nav">
        <NavigationControl
          onViewportChange={viewport => setViewport(viewport)}
        />
      </div>
    </ReactMapGL>
    // </div>
  );
}
