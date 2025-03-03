import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordService } from '../services/fetchApi.js';
import { Form } from '../components/forms/Form.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Button } from '../components/Button.jsx';

export const RecoveryPassCodePage = () => {
    const [searchParams] = useSearchParams(); //Obtenemos el código de la URL
    const recoveryPassCode = searchParams.get('recoveryPassCode');

    const [formData, setFormData] = useState({
        //Se guarda la nueva contraseña en formData
        newPassword: '',
        confirmNewPassword: '',
    });

    const navigate = useNavigate();

    //Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error('Las contraseñas no coinciden'); //validamos que las contraseñas coincidan
            return;
        }
        try {
            const success = await resetPasswordService(
                //cambiamos la contraseña
                recoveryPassCode,
                formData.newPassword
            );

            if (success) {
                toast.success('Contraseña cambiada con éxito');
                navigate('/users/login');
            } else {
                toast.error('Error al cambiar la contraseña');
            }
        } catch (error) {
            toast.error('Hubo un error al procesar la solicitud');
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-3 border border-cyan-300 rounded-lg shadow-md space-y-2"
            >
                <h2>Restablecer Contraseña</h2>
                <Input
                    type="password"
                    placeholder="Nueva contraseña"
                    name="newPassword"
                    value={formData.newPassword}
                    handleChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    handleChange={handleChange}
                    required
                />
                <Button type="submit">Cambiar Contraseña</Button>
            </form>
        </div>
    );
};
