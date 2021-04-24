import React, { useRef, useEffect, useState, useReducer } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from './components/Legend';
import Optionsfield from './components/Optionsfield';
import './Map.css';
import data from '../../data.json';
import countries from '../../countries.json';
import greenhouse_gas_inventory_data from '../../greenhouse_gas_inventory_data.json';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const initialState = { resultData: {} };

function reducer(state, action) {
  switch (action.type) {
    case 'setQueryData':
      return { queryData: action.value };
    case 'setResultData':
      return { resultData: action.value };
    default:
      throw new Error();
  }
}

const Map = ({year, gas_parameter}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [dataLoading, setDataLoading] = useState(false);
  const [parameter, setParameter] = useState(gas_parameter);
  const [timePeriod, setPeriod] = useState(year);
  const [queryData, setQueryData] = useState({});
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    function filter_data(dataaa) {
      // console.log("hayee hayyee");
      // console.log(dataaa);
      // getData_all_countries(parameter, timePeriod);

      // not filtering based on all countries stored but only those queried [2 diff st of data here, in sidebar different sets were there]
      let filtered_data = [];
      let result_data = {};
      result_data['type'] = 'FeatureCollection';
      for (let i = 0; i < dataaa.length; i++) {
        for (let j = 0; j < data.features.length; j++) {
          if (data.features[j].properties.name === dataaa[i].country_or_area) {
            let features_tmp = data.features[j];
            features_tmp.properties['environment_parameter_value'] =
              dataaa[i].value;
            features_tmp.properties['year'] = dataaa[i].year;
            features_tmp.properties['environment_parameter_name'] =
              dataaa[i].category;
            // filtered_data.push(queryData[i].country_or_area);
            filtered_data.push(features_tmp);
          }
        }
      }
      result_data['features'] = filtered_data;
      setResultData(result_data);
      return asynchFake([dataaa, result_data]);
    }

    async function getData_all_countries(parameter, timePeriod) {
      let result = await greenhouse_gas_inventory_data.filter(
        ele => ele.year == timePeriod && ele.category == parameter
      );
      // console.log(result);
      // console.log(typeof result);
      setQueryData(result);
      // console.log(queryData);
      return asynchFake(result);
    }
    function asynchFake(data) {
      return new Promise(resolve => {
        setTimeout(() => resolve(data), 1000);
      });
    }

    function fetchData() {
      return getData_all_countries(parameter, timePeriod)
        .then(async result => {
          setQueryData(await result);
          // console.log(await result);
          // console.log(queryData);
          return filter_data(await result);
        })
        .then(async res => {
          const [fetchData1, fetchData2] = await res;
          // setResultData(tmp1);
          // console.log(tmp1);

          Promise.all([fetchData1, fetchData2]).then(responses => {
            setQueryData(responses[0]);
            setResultData(responses[1]);
            console.log(responses[0]);
            console.log(responses[1]);
            console.log(parameter);
            // // dispatch({type: "setQueryData", value: responses[0]})
            // dispatch({type: "setResultData", value: responses[1] });
            // console.log(state)
          });
        });
    }
    fetchData();
  }, [parameter]);

  const options2 = [
    {
      name: 'CO2',
      description: 'CO2 in kilotonnes',
      property: 'environment_parameter_value',
      stops: [
        [0, '#f8d5cc'],
        [1000000, '#f4bfb6'],
        [5000000, '#f1a8a5'],
        [10000000, '#ee8f9a'],
        [50000000, '#ec739b'],
        [100000000, '#dd5ca8'],
        [250000000, '#c44cc0'],
        [500000000, '#9f43d7'],
        [1000000000, '#6e40e6'],
      ],
    },
    {
      name: 'GHG',
      description: 'GHG in kilotonnes',
      property: 'environment_parameter_value',
      stops: [
        [0, '#f8d5cc'],
        [1000, '#f4bfb6'],
        [5000, '#f1a8a5'],
        [10000, '#ee8f9a'],
        [50000, '#ec739b'],
        [100000, '#dd5ca8'],
        [250000, '#c44cc0'],
        [5000000, '#9f43d7'],
        [10000000, '#6e40e6'],
      ],
    },
  ];
  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options2[0]);
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [5, 34],
      zoom: 1.5,
    });
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.on('load', () => {
      map.addSource('countries', {
        type: 'geojson',
        // data: data,
        // data: state.resultData,
        data: resultData,
      });

      map.setLayoutProperty('country-label', 'text-field', [
        'format',
        ['get', 'name_en'],
        { 'font-scale': 1.2 },
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': [
            'literal',
            ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
          ],
        },
      ]);

      map.addLayer(
        {
          id: 'countries',
          type: 'fill',
          source: 'countries',
        },
        'country-label'
      );

      map.setPaintProperty('countries', 'fill-color', {
        property: active.property,
        stops: active.stops,
      });
      console.log();
      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, [resultData]);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty('countries', 'fill-color', {
        property: active.property,
        stops: active.stops,
      });
    }
  };

  const changeState = i => {
    console.log('change state called');
    setActive(options2[i]);
    setParameter(options2[i].name);
    map.setPaintProperty('countries', 'fill-color', {
      property: active.property,
      stops: active.stops,
    });
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <Legend active={active} stops={active.stops} />
      <Optionsfield
        options={options2}
        property={active.property}
        changeState={changeState}
      />
    </div>
  );
};

export default Map;
