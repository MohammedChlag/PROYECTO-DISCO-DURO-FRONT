import { useState } from 'react';
import { Button } from '../Button.jsx';
import { useForm } from 'react-hook-form';

export const Input = ({ label, type = 'text', name, value = '', checked }) => {
    const { errors, handleChange } = useForm();
    const [inputType, setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        setShowPassword(!showPassword);
        setInputType(showPassword ? 'password' : type);
    };

    const error = errors.find((error) => error.context.key === name);

    return (
        <label className={error ? 'label-error' : ''}>
            <span className="label-content"></span>
            <div>
                <span className="label-content">{label}</span>
                <div>
                    {type === 'checkbox' ? (
                        <checkbox
                            type="checkbox"
                            id={name}
                            name={name}
                            checked={checked}
                            onChange={handleChange}
                        ></checkbox>
                    ) : (
                        <input
                            type={inputType}
                            name={name}
                            value={value}
                            placeholder={label}
                            autoComplete={`new-${name}`}
                            onChange={handleChange}
                        />
                    )}
                    ;
                    {type === 'password' && (
                        <Button
                            id="viePassword"
                            className="visibility"
                            handleClick={handleClick}
                        >
                            {/* <Icon></Icon>      */}
                        </Button>
                    )}
                </div>
            </div>
        </label>
    );
};
