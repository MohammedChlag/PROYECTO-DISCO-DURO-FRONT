import { RegisterForm } from '../components/forms/RegisterForm.jsx';

export const RegisterPage = () => {
    return (
        <LayoutComun>
            <section>
                <h2> Regístrate </h2>
                <FormContextProvider>
                    <RegisterForm />
                </FormContextProvider>
            </section>
        </LayoutComun>
    );
};
