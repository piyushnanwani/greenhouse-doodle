import React from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'

export default function ParameterSelect() {
    const options = [
        'Parameter One', 'Parameter Two', 'Parameter Three'
    ];
    const defaultOption = options[0];

    return(
        <div className="parameter-select">
            <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
        </div>
    )
}