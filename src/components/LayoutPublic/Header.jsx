import { Link } from 'react-router-dom';
import { Logo } from '../Logo.jsx';

export const Header = () => {
    return (
        <header className="flex items-center justify-between w-[90vw] mx-auto gap-3 border-b-2 border-black py-4 ">
            <Logo />
            <nav className="space-x-3 text-xs">
                <Link
                    className="hover:bg-gray-200 border-b-2 border-transparent outline-yellow-300 hover:border-yellow-300 p-1 rounded-md"
                    to="/users/register"
                >
                    Registrarse
                </Link>
                <Link
                    to="/users/login"
                    className="hover:bg-gray-200 border-b-2 border-transparent hover:border-green-300 p-1 rounded-md"
                >
                    Iniciar Sesión
                </Link>
            </nav>
        </header>
    );
};
