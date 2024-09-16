import React, { useState } from 'react';
import './Checkbox.css'


function Checkbox(props) {
    return (
        <div className="checkbox-container form-check">
            <input className="form-check-input" type="checkbox" checked={props.isChecked} onClick={props.setChecked} id={props.id}/>
            <label className="form-check-label" for={props.id}>
                {props.description}
            </label>
        </div>
    )
}


export default Checkbox;