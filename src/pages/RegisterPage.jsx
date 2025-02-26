import { RegisterForm } from '../components/forms/RegisterForm.jsx';
import { LayoutPublic } from '../components/LayoutPublic/LayoutPublic.jsx';
import { FormProvider } from '../context/Form/FormProvider.jsx';

export const RegisterPage = () => {
    return (
        <LayoutPublic>
            <FormProvider>
                <RegisterForm />
            </FormProvider>
        </LayoutPublic>
    );
};
