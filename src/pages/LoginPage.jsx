import React from 'react';
import { LoginForm } from '../components/forms/LoginForm.jsx';
import { FormProvider } from '../context/Form/FormProvider.jsx';
import { LayoutPublic } from '../components/LayoutPublic/LayoutPublic.jsx';

export const LoginPage = () => {
    return (
        <LayoutPublic>
            <FormProvider>
                <LoginForm />
            </FormProvider>
        </LayoutPublic>
    );
};
