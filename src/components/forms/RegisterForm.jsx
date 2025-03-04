import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormHook } from '../../hooks/useFormHook.js';
import { toast } from 'react-toastify';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import { registerUserService } from '../../services/fetchApi.js';
import { registerUserSchema } from '../../schemas/users/registerUserShema.js';
import { Link } from 'react-router-dom';
import { Boundary } from '../../services/ErrorBoundary.jsx';

export const RegisterForm = () => {
    const { info, errors, validate, handleChange } = useFormHook();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const value = await validate(registerUserSchema);

            const message = await registerUserService(value);

            toast.success(message);
            toast.info('Verifica tú email');
            navigate(`/users/login`);
        } catch (error) {
            toast.error(error.message || 'Error al registrar el usuario');
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
                    Crear cuenta
                </h3>
                <p className="text-sm text-gray-500">
                    Únete a Hackloud hoy mismo
                </p>
            </div>

            <Boundary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        id="firstName"
                        label="Nombre"
                        type="text"
                        name="firstName"
                        value={info.firstName}
                        errors={errors}
                        handleChange={handleChange}
                    />
                    <Input
                        id="lastName"
                        label="Apellido"
                        type="text"
                        name="lastName"
                        value={info.lastName}
                        errors={errors}
                        handleChange={handleChange}
                    />
                </div>
            </Boundary>

            <Boundary>
                <div className="space-y-4">
                    <Input
                        id="username"
                        label="Nombre de usuario"
                        type="text"
                        name="username"
                        value={info.username}
                        errors={errors}
                        handleChange={handleChange}
                    />
                    <Input
                        id="birthday"
                        label="Fecha de nacimiento"
                        type="date"
                        name="birthday"
                        value={info.birthday}
                        errors={errors}
                        handleChange={handleChange}
                    />
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
            </Boundary>
            <Boundary>
                <div className="space-y-4">
                    <Button
                        type="submit"
                        className="w-full bg-[#009EB5] hover:bg-[#009ec3] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:translate-y-[-1px] active:translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={loading}
                    >
                        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            to="/users/login"
                            className="text-[#009EB5] hover:text-[#009ec3] font-medium hover:underline"
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </Boundary>
        </Form>
    );
};
