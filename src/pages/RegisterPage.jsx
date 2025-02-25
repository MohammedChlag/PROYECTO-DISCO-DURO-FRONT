import { Button } from '../components/Button.jsx';
import { RegisterForm } from '../components/forms/RegisterForm.jsx';

export const RegisterPage = () => {
    return (
        <LayoutComun>
            <Header />
            <section>
                <h2> Regístrate </h2>
                <FormContextProvider>
                    <RegisterForm />
                </FormContextProvider>
            </section>
            <Footer />
            {/* <Button> Regístrate</Button> */}
        </LayoutComun>
    );
};
