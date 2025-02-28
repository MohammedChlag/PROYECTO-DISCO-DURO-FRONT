import { useState } from 'react';
import { useFormHook } from '../../hooks/useFormHook.js';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { useNavigate } from 'react-router-dom';
import { loginUserService } from '../../services/fetchApi.js';
import { Form } from './Form.jsx';
import { Button } from '../Button.jsx';
import { toast } from 'react-toastify';
import { loginUserSchema } from '../../schemas/users/loginUserSchema.js';
import { Input } from './Input.jsx';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const { info, errors, validate, handleChange } = useFormHook();
    const [loading, setLoading] = useState(false);
    const { onLogin } = useAuthHook();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const value = await validate(loginUserSchema);

            setLoading(true);
            const { message, token } = await loginUserService(value);
            await onLogin(token);

            toast.success(message);
            navigate('/storage');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Form
            className="flex flex-col gap-2 p-8 bg-[#F7FBFC] rounded-lg w-full max-w-md my-8 mx-auto"
            handleSubmit={handleSubmit}
        >
            <h3 className="text-3xl font-bold text-black text-center mb-4">
                Iniciar sesión
            </h3>

            <Input
                id="email"
                label="Correo Electrónico"
                type="email"
                name="email"
                value={info.email}
                errors={errors}
                handleChange={handleChange}
            />

            <Input
                id="password"
                label="Contraseña"
                type="password"
                name="password"
                value={info.password}
                errors={errors}
                handleChange={handleChange}
            />

            <Button
                type="submit"
                className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-semibold py-3 rounded-md transition-colors"
                disabled={loading}
            >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <Link
                        to="/users/register"
                        className="text-[#00B4D8] hover:underline"
                    >
                        Regístrate aquí
                    </Link>
                </p>
            </div>
            <div className="text-center">
                <Link
                    to="/users/recovery"
                    className="text-sm text-[#00B4D8] hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>
        </Form>
    );
};
