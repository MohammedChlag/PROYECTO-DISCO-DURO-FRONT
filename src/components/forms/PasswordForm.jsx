import { useState } from 'react';
import { useUserHook } from '../../hooks/useUserHook.js';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { toast } from 'react-toastify';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';

export const PasswordForm = () => {
    const { token } = useAuthHook();
    const { updatePassword, loading, error } = useUserHook(null, token);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            const result = await updatePassword(formData);

            if (result.success) {
                toast.success('Contraseña actualizada correctamente');
                // Limpiar el formulario
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                });
            } else {
                toast.error(
                    result.error || 'Error al actualizar la contraseña'
                );
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            toast.error('Error al actualizar la contraseña');
        }
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            className="flex flex-col items-center gap-2 p-3 bg-[#F7FBFC] rounded-lg w-full max-w-md mx-auto text-center mt-4"
        >
            <h3 className="text-xl font-semibold mb-4">Cambiar Contraseña</h3>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <Input
                id="oldPassword"
                label="Contraseña Actual"
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                handleChange={handleInputChange}
                errors={error}
            />
            <Input
                id="newPassword"
                label="Nueva Contraseña"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                handleChange={handleInputChange}
                errors={error}
            />
            <Input
                id="confirmNewPassword"
                label="Confirmar Nueva Contraseña"
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                handleChange={handleInputChange}
                errors={error}
            />

            <Button
                type="submit"
                className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-semibold py-3 rounded-md transition-colors"
                disabled={loading}
            >
                {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
        </Form>
    );
};
