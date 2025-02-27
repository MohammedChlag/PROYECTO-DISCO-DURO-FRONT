import { FormProvider } from '../context/Form/FormProvider.jsx';
import { ProfileForm } from '../components/forms/ProfileForm.jsx';
import { PasswordForm } from '../components/forms/PasswordForm.jsx';

export const ProfilePage = () => {
    return (
        <FormProvider>
            <ProfileForm />
            <PasswordForm />
        </FormProvider>
    );
};
