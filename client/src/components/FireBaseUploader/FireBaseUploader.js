import React from "react";
import './FireBaseUploader.scss';

export const FireBaseUploader = ({ handleChange, isMultiple }) => {
    return (
        <form className="form-fireBaseUploader" method="POST">
            <p>Drag your files here or click in this area.</p>
            <input type="file" multiple={isMultiple} onChange={handleChange} />
        </form>
    )



}