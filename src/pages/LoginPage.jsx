import React from 'react';
import { LoginForm } from '../components/forms/LoginForm.jsx';
import { FormProvider } from '../context/Form/FormProvider.jsx';
import { LayoutComun } from '../components/LayoutComun1/LayoutComun.jsx';

export const LoginPage = () => {
    return (
        <LayoutComun>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Iniciar sesión
                </h2>
                <FormProvider>
                    <LoginForm />
                </FormProvider>
            </div>
        </LayoutComun>
    );
};
