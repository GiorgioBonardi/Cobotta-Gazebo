import React, { useState } from 'react';

import './Joint.css';

const Joint = ({ name, min, max }) => {
    const [value, setValue] = useState((min + max) / 2);

    const increment = () => {
        setValue(prevValue => Math.min(prevValue + 1, max));
    };

    const decrement = () => {
        setValue(prevValue => Math.max(prevValue - 1, min));
    };

    const handleChange = (event) => {
        setValue(Number(event.target.value));
    };

    return (
        <div className="joint">
            <h3>{name}</h3>
            <div className="controls">
                <button onClick={decrement}>-</button>
                <input 
                    type="range" 
                    min={min} 
                    max={max} 
                    value={value} 
                    onChange={handleChange} 
                />
                <button onClick={increment}>+</button>
            </div>
            <div className="value-box">
                <input type="number" value={value} readOnly />
            </div>
        </div>
    );
};

export default Joint;