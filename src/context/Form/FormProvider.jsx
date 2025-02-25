import { useState } from 'react';
import { validateSchemaUtil } from '../../utils/helpers.js';
import { FormContext } from './FormContext.js';

export const FormProvider = ({ children }) => {
    const [info, setInfo] = useState(() => ({}));

    const [errors, setErrors] = useState([]);

    const validate = async (schema) => {
        const { value, error } = await validateSchemaUtil(schema, info);
        if (error) {
            setErrors(error);
            throw new Error(error.details.map((error) => error.message));
        } else {
            setErrors([]);
        }
        return value;
    };

    const handleChange = (event) => {
        const { type, name, value, files } = event.target;
        setInfo((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] || null : value,
        }));
    };

    return (
        <FormContext.Provider value={{ info, errors, validate, handleChange }}>
            {children}
        </FormContext.Provider>
    );
};
