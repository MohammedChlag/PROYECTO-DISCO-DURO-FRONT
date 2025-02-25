import { useFormHook } from '../../hooks/useFormHook.js';

export const Input = ({ label, type = 'text', name, value = '' }) => {
    const { errors, handleChange } = useFormHook();

    const error = errors.find((error) => error.context.key === name);
    return (
        <label className={error ? 'label-error' : ''}>
            <span>{label}</span>
            <div>
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        value={value}
                        placeholder={label}
                        autoComplete={`new-${name}`}
                        onChange={handleChange}
                    ></textarea>
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        placeholder={label}
                        autoComplete={`new-${name}`}
                        onChange={handleChange}
                    />
                )}
            </div>
            <span id={`error-${name}`}>
                {errors?.map((error) => {
                    if (error.context.key === name) {
                        return error.message;
                    }
                    return null;
                })}
            </span>
        </label>
    );
};
