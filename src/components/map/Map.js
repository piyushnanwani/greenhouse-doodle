import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from './components/Legend';
import './Map.css';
import data from '../../data.json';
import greenhouse_gas_inventory_data from '../../greenhouse_gas_inventory_data.json';
import { options } from './index';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = ({ year, gas_parameter }) => {
  const [parameter, setParameter] = useState(gas_parameter);
  const [timePeriod, setPeriod] = useState(year);
  const [queryData, setQueryData] = useState({});
  const [resultData, setResultData] = useState({});
  const [active, setActive] = useState(options.find(ele => ele.name === gas_parameter));
  // const [active, setActive] = useState(
  //   options.find(ele => ele.name === gas_parameter)
  // );

  useEffect(() => {
    function filter_data(dataaa) {
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
        ele => ele.year === timePeriod && ele.category === parameter
      );
      // setQueryData(result);
      return asynchFake(result);
    }
    function asynchFake(data) {
      return new Promise(resolve => {
        setTimeout(() => resolve(data), 1000);
      });
    }

    function fetchData() {
      return getData_all_countries(gas_parameter, year)
        .then(async result => {
          setQueryData(await result);
          return filter_data(await result);
        })
        .then(async res => {
          const [fetchData1, fetchData2] = await res;

          Promise.all([fetchData1, fetchData2]).then(responses => {
            // setQueryData(responses[0]);
            setResultData(responses[1]);
            console.log('After all promises resolved')
            console.log(responses[1].features[0].properties.environment_parameter_name);
            // console.log(responses[1]);
          })
        }).then(()=> {
          console.log('Now setting state of active');
          console.log(resultData);
          console.log(queryData);
          console.log(options.find(ele => ele.name === gas_parameter));
          setActive(options.find(ele => ele.name === gas_parameter));

        })
    }
    fetchData();
    // if (gas_parameter !== active.name) {
    //   setActive(options.find(ele => ele.name === gas_parameter));
    //   // changeState(options.findIndex(ele => ele.name === gas_parameter));
    // }
  }, [parameter, timePeriod, gas_parameter]);

  const mapContainerRef = useRef(null);

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
      console.log('running my paint job');
      console.log(active);
      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, [resultData]);

  useEffect(() => {
    console.log(`active updated. Running the paint job`);
    console.log(active);
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
    // console.log('change state called');
    // console.log(options[i]);
    setActive(options[i]);
    // setParameter(options[i].name);
    // console.log(active)
    map.setPaintProperty('countries', 'fill-color', {
      // property: options[i].property,
      // stops: options[i].stops,
      property: active.property,
      stops: active.stops,
    });
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <Legend active={active} stops={active.stops} />
    </div>
  );
};

export default Map;
