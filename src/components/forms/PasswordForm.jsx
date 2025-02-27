import { useState } from 'react';
import { useFormHook } from '../../hooks/useFormHook.js';
import { toast } from 'react-toastify';
import { registerUserSchema } from '../../schemas/users/registerUserShema.js';
import { registerUserService } from '../../services/fetchApi.js';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';

export const PasswordForm = () => {
    const { info, errors, validate, handleChange } = useFormHook();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const value = await validate(registerUserSchema);

            const message = await registerUserService(value);

            toast.success(message);
            toast.info('Verifica tú email');
        } catch (error) {
            toast.error(error.message || 'Error al registrar el usuario');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <p>Cambiar contraseña</p>
            <Form
                className="flex flex-col gap-2 p-8 bg-[#F7FBFC] rounded-lg w-full max-w-md mx-auto text-center"
                handleSubmit={handleSubmit}
            >
                <Input
                    id="username"
                    label="Contraseña"
                    type="text"
                    name="username"
                    value={info.username}
                    errors={errors}
                    handleChange={handleChange}
                />
                <Input
                    id="firstName"
                    label="Nueva Contraseña"
                    type="text"
                    name="firstName"
                    value={info.firstName}
                    errors={errors}
                    handleChange={handleChange}
                />
                <Input
                    id="lastName"
                    label="Confirmar contraseña"
                    type="text"
                    name="lastName"
                    value={info.lastName}
                    errors={errors}
                    handleChange={handleChange}
                />
                <Button
                    type="submit"
                    className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-semibold py-3 rounded-md transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Cambiando...' : 'Cambiar contraseña'}
                </Button>
            </Form>
        </>
    );
};
