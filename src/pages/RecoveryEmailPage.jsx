import { useState } from 'react';
import { recoveryPasswordService } from '../services/fetchApi.js';
import { toast } from 'react-toastify';
// import { Form } from '../components/forms/Form.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Button } from '../components/Button.jsx';

export const RecoveryEmailPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await recoveryPasswordService(email); //se llama al service para enviar código al correo

        if (success) {
            toast.success('Código enviado, Revisa tu email');
            setEmail('');
        } else {
            toast.error('Error al enviar código de recuperación');
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            <form
                onSubmit={handleSubmit}
                className={
                    '`w-full max-w-md bg-white p-3 border border-cyan-300 rounded-lg shadow-md space-y-2'
                }
            >
                <Input
                    label="Correo Electrónico"
                    type="email"
                    name="email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <Button>Enviar Codigo</Button>
            </form>
        </div>
    );
};
