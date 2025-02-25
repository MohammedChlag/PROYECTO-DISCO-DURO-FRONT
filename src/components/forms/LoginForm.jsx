import { useState } from 'react';
import { useFormHook } from '../../hooks/useFormHook.js';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { useNavigate } from 'react-router-dom';
import { loginUserService } from '../../services/fetchApi.js';
import { Form } from './Form.jsx';
import { Button } from '../Button.jsx';
import { toast } from 'react-toastify';
import { Icon } from '../Icon.jsx';
import { loginUserSchema } from '../../schemas/users/loginUserSchema.js';
import { Input } from './Input.jsx';

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E5F3F2] p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <Form handleSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-600 text-sm font-medium mb-1"
                        >
                            Correo Electrónico
                        </label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={info.email}
                            errors={errors}
                            handleChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-600 text-sm font-medium mb-1"
                        >
                            Contraseña
                        </label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={info.password}
                            errors={errors}
                            handleChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <Button
                        id="login"
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        className="w-full bg-[#237D77] text-white py-2 rounded-lg hover:bg-[#1A5C58] focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <Icon name="send" />
                        <span>
                            {loading ? 'Cargando...' : 'Iniciar sesión'}
                        </span>
                    </Button>
                </Form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    ¿No tienes una cuenta?{' '}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
};
