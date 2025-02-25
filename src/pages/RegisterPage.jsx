import { RegisterForm } from '../components/forms/RegisterForm.jsx';
import { Header } from '../components/Header/Header.jsx';
import { Menu } from '../components/Menu/Menu.jsx';

export const RegisterPage = () => {
    return (
        <>
            <Header>
                <img src="" alt="Logo" />
                <Menu />
            </Header>
            <main>
                <h2>Regístrate</h2>
                <RegisterForm />
            </main>
            <footer>
                <img src="" alt="" />
                <a href="">Regístrarse</a>
                <a href="">Iniciar Sesión</a>
                <p>Copyright© Hackloud</p>
            </footer>
        </>
    );
};
