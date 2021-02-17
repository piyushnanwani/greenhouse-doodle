import React from 'react'
import CountrySelect from './country-select'
import ParameterSelect from './parameter-select'

export default function Home() {
    return(
        <div className="map">
            <p>The Map Goes Here!</p>
            <div className="dropdowns">
                <CountrySelect />
                <ParameterSelect />
            </div>
        </div>
    )
}