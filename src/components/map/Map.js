import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from './components/Legend';
import Optionsfield from './components/Optionsfield';
import Tooltip from './components/Tooltip';
import './Map.css';
import data from '../../data.json';
import greenhouse_gas_inventory_data from '../../greenhouse_gas_inventory_data.json';
import { options } from './index';
import ReactDOM from 'react-dom';
import { coordinates } from '../../country_coordinates.js';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = ({ year, gas_parameter }) => {
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [loading, setLoading] = useState(false);
  const [parameter, setParameter] = useState(gas_parameter);
  const [timePeriod, setPeriod] = useState(year);
  const [queryData, setQueryData] = useState({});
  const [resultData, setResultData] = useState({});
  const [active, setActive] = useState(
    options.find(ele => ele.name === gas_parameter)
  );
  // const [active, setActive] = useState(
  //   options.find(ele => ele.name === gas_parameter)
  // );
  // useEffect(() => {
  //   changeState(options.find(ele => ele.name === gas_parameter));
  // },[active])
  useEffect(() => {
    setLoading(true);
    /* getting and setting stored state values from map and session storage & URL */
    let stored_year = localStorage.getItem('mapYear'); // returns a string by default
    let stored_gas_parameter = localStorage.getItem('mapParameter');
    if (stored_year && stored_year !== '') {
      let stored_yearStr = JSON.stringify(stored_year);
      console.log(stored_yearStr);
      setPeriod(stored_yearStr);
    }
    if (stored_gas_parameter && stored_gas_parameter !== '') {
      let stored_gas_parameterStr = JSON.stringify(stored_gas_parameter);
      console.log(stored_gas_parameterStr);
      setParameter(stored_gas_parameterStr);
    }
  }, []);
  // useEffect(() => {
  //   // const json = JSON.stringify(notes);
  //   localStorage.setItem('mapYear', timePeriod);
  //   localStorage.setItem('mapParameter', parameter);
  //   console.log('setting following value in local storage: ');
  //   console.log(timePeriod);
  // }, [timePeriod, parameter]);

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
    return new Promise(resolve => resolve(data));
  }

  function fetchData() {
    return getData_all_countries(gas_parameter, year)
      .then(async result => {
        setQueryData(await result);
        return filter_data(await result);
      })
      .then(async res => {
        const [fetchData1, fetchData2] = await res;
        // const promise3 = new Promise((resolve, reject) => {
        //   console.log('Promise 3')
        //   console.log(options.findIndex(ele => ele.name === gas_parameter));
        //   console.log(options.find(ele => ele.name === gas_parameter));
        //   changeState(options.findIndex(ele => ele.name === gas_parameter));
        // });
        return Promise.all([fetchData1, fetchData2]).then(responses => {
          // setQueryData(responses[0]);
          setResultData(responses[1]);
          console.log('After all promises resolved');
          setResultData(responses[1]);
          console.log(
            responses[1].features[0].properties.environment_parameter_name
          );
          // return new Promise((resolve, reject) => {
          //   console.log('Promise 3');
          //   console.log(options.findIndex(ele => ele.name === gas_parameter));
          //   console.log(options.find(ele => ele.name === gas_parameter));
          //   changeState(options.findIndex(ele => ele.name === gas_parameter));
          // });
          // console.log(responses[1]);
        });
      })
      .then(resultPromise => {
        console.log('Now status of last promise');
        console.log(resultPromise);
        // console.log(queryData);
        // console.log(options.find(ele => ele.name === gas_parameter));
        // setActive(options.find(ele => ele.name === gas_parameter));
      });
  }
  useEffect(() => {
    fetchData();
    // if (gas_parameter !== active.name) {
    //   setActive(options.find(ele => ele.name === gas_parameter));
    //   // changeState(options.findIndex(ele => ele.name === gas_parameter));
    // }
  }, [parameter, timePeriod]);

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

      for (const datum of resultData.features) {
        console.log('Hola');
        console.log(datum.properties);
        let name = datum.properties.name;
        let environment_parameter_value =
          datum.properties.environment_parameter_value;
        let latlng = coordinates.find(ele => ele.name === name).latlng;

        if (
          latlng[0] <= 90 &&
          latlng[0] >= -90 &&
          latlng[1] <= 90 &&
          latlng[1] >= -90
        ) {
          new mapboxgl.Popup()
            .setLngLat(latlng)
            .setHTML(
              `<div><h1>${name}</h1><h1>${environment_parameter_value}</h1> </div>`
            )
            .addTo(map);
        }
      }
      map.setPaintProperty('countries', 'fill-color', {
        property: active.property,
        stops: active.stops,
      });
      console.log('running my paint job');
      console.log(active);
      setMap(map);
    });
    // change cursor to pointer when user hovers over a clickable feature
    map.on('mouseenter', e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on('mouseleave', () => {
      map.getCanvas().style.cursor = '';
    });

    // add tooltip when users mouse move over a point
    map.on('mousemove', e => {
      const features = map.queryRenderedFeatures(e.point);
      // console.log(e.lngLat);
      // console.log(features);

      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement('div');
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });
    // let marker = new mapboxgl.Marker().setLngLat([17.05, -61.8]).addTo(map);

    // new mapboxgl.Popup()
    //   .setLngLat([17.05, -61.8])
    //   .setHTML('<h1>Null Island</h1>')
    //   .addTo(map);
    // Clean up on unmount
    return () => map.remove();
  }, [resultData, active]);

  // useEffect(() => {
  //   console.log(`active updated. Running the paint job`);
  //   console.log(active);
  //   paint();
  // }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty('countries', 'fill-color', {
        property: active.property,
        stops: active.stops,
      });
    }
  };
  function func1(i) {
    console.log(`I'm in function 1`);
    console.log(i);
    console.log(active);
    console.log(options[i]);
    setActive(options[i]);
    return asynchFake(i);
  }

  function func2(func1Data) {
    console.log(`I'm in function 2`);
    console.log(active);
    fetchData();
    // console.log('func1Data in fun2')
    // console.log(func1Data);
    // // let options_tmp = func1Data[0];
    // setActive(options[func1Data]);
    return asynchFake(func1Data);
  }

  function func3(func2Data) {
    if (map !== null) {
      console.log('map not null');
      console.log(active);
      map.setPaintProperty('countries', 'fill-color', {
        // property: options[i].property,
        // stops: options[i].stops,
        property: active.property,
        stops: active.stops,
      });
    }
    return asynchFake('may filled with new data');
  }

  function main(optionsIndex) {
    return func1(optionsIndex).then(func2).then(func3);
  }

  const changeState = optionsIndex => {
    console.log('hikary dickary dock state called');
    console.log(optionsIndex);
    main(optionsIndex).then(res => console.log(res));
    // console.log(options[i]);
    // setActive(options[i]);
    // console.log(active);
    // setParameter(options[i].name);
    // wait for new resultData

    // if (map !== null) {
    //   console.log('map not null');
    //   console.log(active);
    //   map.setPaintProperty('countries', 'fill-color', {
    //     // property: options[i].property,
    //     // stops: options[i].stops,
    //     property: active.property,
    //     stops: active.stops,
    //   });
    // }
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <Legend active={active} stops={active.stops} />
      <Optionsfield
        options={options}
        property={active.property}
        name={active.name}
        changeState={changeState}
      />
    </div>
  );
};

export default Map;
