import React from 'react';
import { LoginForm } from '../components/forms/LoginForm.jsx';
import { FormProvider } from '../context/Form/FormProvider.jsx';
import { LayoutComun } from '../components/LayoutComun1/LayoutComun.jsx';

export const LoginPage = () => {
    return (
        <LayoutComun>
            <FormProvider>
                <LoginForm />
            </FormProvider>
        </LayoutComun>
    );
};
