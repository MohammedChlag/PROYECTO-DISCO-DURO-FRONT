import { useFormHook } from '../../hooks/useFormHook.js';

export const Input = ({
    label,
    type = 'text',
    name,
    value = '',
    checked = false,
    handleChange,
}) => {
    const { errors } = useFormHook();

    const error = errors.find((error) => error.context.key === name);

    const handleInputChange = (event) => {
        const { type, name, checked, value } = event.target;
        console.log('Input onChange:', { type, name, checked, value });

        if (type === 'checkbox') {
            handleChange({
                target: {
                    type,
                    name,
                    checked,
                    value: checked,
                },
            });
        } else {
            handleChange({
                target: {
                    type,
                    name,
                    value,
                },
            });
        }
    };

    return (
        <label className={`block ${error ? 'text-red-500' : 'text-gray-600'}`}>
            {type !== 'checkbox' && (
                <span className="block mb-2 text-sm font-medium">{label}</span>
            )}
            <div className={type === 'checkbox' ? 'flex items-center' : ''}>
                <input
                    type={type}
                    name={name}
                    checked={type === 'checkbox' ? checked : undefined}
                    value={type === 'checkbox' ? 'true' : value || ''}
                    placeholder={type !== 'checkbox' ? label : undefined}
                    autoComplete={
                        type !== 'checkbox' ? `new-${name}` : undefined
                    }
                    onChange={handleInputChange}
                    className={`${
                        type === 'checkbox'
                            ? 'mr-2 h-4 w-4 rounded border-gray-300 text-[#00B4D8] focus:ring-[#00B4D8]'
                            : `w-full p-3 bg-[#F7FBFC] border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 ${
                                  error
                                      ? 'border-red-500 focus:ring-red-200'
                                      : 'border-gray-200 focus:ring-[#00B4D8] focus:border-[#00B4D8]'
                              }`
                    }`}
                />
                {type === 'checkbox' && (
                    <span className="text-sm text-gray-600">{label}</span>
                )}
            </div>
            {error && (
                <span className="text-sm text-red-500 mt-1">
                    {error.message}
                </span>
            )}
        </label>
    );
};
