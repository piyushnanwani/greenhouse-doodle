import React, { useState } from 'react'
import CountrySelect from './map/country-select'
import ParameterSelect from './map/parameter-select'

export default function Home() {
    return(
        //The code to render a map goes here.
        <div className="map">
            <p>The Map Goes Here!</p>
            <div className="dropdowns">
                <CountrySelect />
                <ParameterSelect />
            </div>
        </div>
    )
}