import React, { useState } from 'react';

import './Joint.css';

const Joint = ({ name, min, max, value, _onChangeGlobal, disabled }) => {
    const [_value, setValue] = useState(value);

    const increment = () => {
        if (!disabled) {
            const newValue = Math.min(_value + 1, max);
            setValue(newValue);
            _onChangeGlobal({ target: { name, value: newValue } });
        }
    };

    const decrement = () => {
        if (!disabled) {
            const newValue = Math.max(_value - 1, min);
            setValue(newValue);
            _onChangeGlobal({ target: { name, value: newValue } });
        }
    };

    const handleChange = (event) => {
        if (!disabled) {
            const newValue = Number(event.target.value);
            setValue(newValue);
            _onChangeGlobal({ target: { name, value: newValue } });
        }
    };

    return (
        <div className="joint">
            <h3>{name}</h3>
            <div className="controls">
                <button onClick={decrement} disabled={disabled}>-</button>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={_value}
                    onChange={handleChange}
                    disabled={disabled}
                />
                <button onClick={increment} disabled={disabled}>+</button>
            </div>
            <div className="value-box">
                <input type="number" value={_value} readOnly disabled={disabled} />
            </div>
        </div>
    );
};

export default Joint;