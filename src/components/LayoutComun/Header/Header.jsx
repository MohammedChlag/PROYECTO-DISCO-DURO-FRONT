import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo-hackloud-solo.png';

export const Header = () => {
    return (
        <header className="flex items-center justify-between w-[90vw] mx-auto gap-3 border-b-2 border-black py-4 ">
            <img className="w-28" src={logo} alt="Logo Hackloud" />
            <nav className="space-x-3 text-sm">
                <Link
                    className="hover:bg-gray-200 border-b-2 border-transparent hover:border-yellow-300 focus:border-2 focus:border-yellow-300 rounded-md"
                    to="/users/register"
                >
                    Registrarse
                </Link>
                <Link
                    to="/users/login"
                    className="hover:bg-gray-200 border-b-2 border-transparent hover:border-green-300 rounded-md"
                >
                    Iniciar Sesión
                </Link>
            </nav>
        </header>
    );
};
