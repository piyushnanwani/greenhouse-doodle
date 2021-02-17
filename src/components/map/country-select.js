import React from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'

export default function CountrySelect() {
    //Write logic to render all countries as dropdown options
    const options = [
        'Country One', 'Country Two', 'Country Three'
    ];
    
    const defaultOption = options[0];

    return(
        <div className="country-select">
            <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
        </div>
    )
}