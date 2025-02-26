import { RegisterForm } from '../components/forms/RegisterForm.jsx';
import { LayoutComun } from '../components/LayoutComun/LayoutComun.jsx';
import { FormProvider } from '../context/Form/FormProvider.jsx';

export const RegisterPage = () => {
    return (
        <LayoutComun>
            <FormProvider>
                <RegisterForm />
            </FormProvider>
        </LayoutComun>
    );
};
