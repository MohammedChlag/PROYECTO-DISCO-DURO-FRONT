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
            className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto my-8 sm:my-16"
            handleSubmit={handleSubmit}
        >
            <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Iniciar sesión
                </h3>
                <p className="text-sm text-gray-500">
                    Bienvenido de nuevo a Hackloud
                </p>
            </div>

            <div className="space-y-4">
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
            </div>

            <div className="space-y-4">
                <Button
                    type="submit"
                    className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:translate-y-[-1px] active:translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={loading}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Button>

                <div className="flex flex-col items-center gap-3 text-sm">
                    <p className="text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <Link
                            to="/users/register"
                            className="text-[#00B4D8] hover:text-[#0096B4] font-medium hover:underline"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                    <Link
                        to="/users/recovery-email"
                        className="text-[#00B4D8] hover:text-[#0096B4] font-medium hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
        </Form>
    );
};
