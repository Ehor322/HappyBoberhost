import React from "react";
import './RadioButton.css';

export const RadioButton = ({ label, value, onChange, name }) => {

    return (

        <div>
            <label>
                <input type="radio" checked={value} onChange={onChange} name={name} />
                {label}
            </label>
        </div>
    )

}