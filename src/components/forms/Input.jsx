import { useState } from 'react';

export const Input = ({
    label,
    type = 'text',
    name,
    value,
    errors,
    handleChange,
    checked,
}) => {
    const errorMesaage = errors?.[name];

    return (
        <label className={error ? 'label-error' : ''}>
            <span className="label-content">{label}</span>
            <div>{type === 'checkbox'}</div>
        </label>
    );
};
