import React, { useContext, useState } from 'react';

import { Button } from '../Button.jsx';
import Form from './Form.jsx';
import { Input } from './Input.jsx';
import { useNavigate } from 'react-router-dom';
import { registerUserService } from '../../services/fetchApi.js';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
    const { info, errors, handleChange } = useContext(); //FormContext falta
    const [isLoading, setIsLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    const hadleSubmit = async (e) => {
        try {
            e.preventDefault();

            // const value = validation(registerUserShema); luego se hace
            setIsLoading(true);

            const message = await registerUserService();

            const params = new URLSearchParams({
                type: 'success',
                message,
            });

            navigate(`/login?${params.toString()}`);
            toast.info('Verifica tu correo para activar tu cuenta');
        } catch (error) {
            toast.error(error.message || 'Error al registrar el usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form className="register-form" hadleSubmit={hadleSubmit}>
            <Input
                label="Name"
                type="text"
                name="firstName"
                value={info.firstName}
                errors={errors}
                handleChange={handleChange}
            />
            <Input
                label="Lastname"
                type="text"
                name="lastName"
                value={info.lastName}
                errors={errors}
                handleChange={handleChange}
            />
            <Input
                label="Date of birth"
                type="date"
                name="birthday"
                value={info.birthday}
                errors={errors}
                handleChange={handleChange}
            />
            <Input
                label="User Name"
                type="text"
                name="username"
                value={info.username}
                errors={errors}
                handleChange={handleChange}
            />
            <Input
                label="Email"
                type="email"
                name="email"
                value={info.email}
                errors={errors}
                handleChange={handleChange}
            />
            <Input
                label="Password"
                type="password"
                name="password"
                value={info.password}
                errors={errors}
                handleChange={handleChange}
            />
            <div>
                <input
                    type="checkbox"
                    name="termsAccepted"
                    // id="terms"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="terms">Aceptar términos y condiciones</label>
            </div>
            <Button
                id="register"
                className="submit"
                type="submit"
                isLoading={isLoading}
            ></Button>
        </Form>
    );
};
