import React, { useState } from 'react';

import './Joint.css';

const Joint = ({ name, min, max, value, _onChangeGlobal }) => {
    const [_value, setValue] = useState(value);

    const increment = () => {
        const newValue = Math.min(_value + 1, max);
        setValue(newValue);
        _onChangeGlobal({ target: { name, value: newValue } });
    };

    const decrement = () => {
        const newValue = Math.max(_value - 1, min);
        setValue(newValue);
        _onChangeGlobal({ target: { name, value: newValue } });
    };

    const handleChange = (event) => {
        _onChangeGlobal({ target: { name, value: event.target.value } });
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
                    value={_value} 
                    onChange={handleChange} 
                />
                <button onClick={increment}>+</button>
            </div>
            <div className="value-box">
                <input type="number" value={_value} readOnly />
            </div>
        </div>
    );
};

export default Joint;