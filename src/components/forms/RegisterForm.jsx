import { useState } from 'react';
import { Button } from '../Button.jsx';
import { Input } from './Input.jsx';
import { useNavigate } from 'react-router-dom';
import { registerUserService } from '../../services/fetchApi.js';
import { registerUserSchema } from '../../schemas/users/registerUserShema.js';
import { toast } from 'react-toastify';
import { useFormHook } from '../../hooks/useFormHook.js';
import { Form } from './Form.jsx';
import { Link } from 'react-router-dom';

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
            className="flex flex-col gap-6 p-8 bg-[#F7FBFC] rounded-lg w-full max-w-md mx-auto"
            handleSubmit={handleSubmit}
        >
            <h3 className="text-3xl font-bold text-black text-center mb-4">
                Regístrate
            </h3>

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
            <Input
                id="username"
                label="Username"
                type="text"
                name="username"
                value={info.username}
                errors={errors}
                handleChange={handleChange}
            />
            <Input
                id="birthday"
                label="Fecha nacimiento"
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

            <div>
                <Input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    label="Aceptar términos y condiciones"
                    checked={info.terms}
                    errors={errors}
                    handleChange={handleChange}
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-semibold py-3 rounded-md transition-colors"
                disabled={loading}
            >
                {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
            <section className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link
                        to="/users/login"
                        className="text-[#00B4D8] hover:underline"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </section>
        </Form>
    );
};
