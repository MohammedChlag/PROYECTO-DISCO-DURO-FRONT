import { Link } from 'react-router-dom';
import { Logo } from './Logo.jsx';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { ProfileMenu } from '../profile/ProfileMenu.jsx';
import { useLocation } from 'react-router-dom';

export const Header = () => {
    const { currentUser } = useAuthHook();
    const location = useLocation();

    // Determinar si estamos en una ruta de storage para ajustar el ancho
    const isStoragePage = location.pathname.startsWith('/storage');

    // Clases del header según la ruta
    const headerClasses = `flex items-center justify-between w-[90vw] lg:w-full ${
        isStoragePage ? 'lg:max-w-screen-xl' : 'lg:max-w-screen-lg'
    } mx-auto ${
        isStoragePage ? 'lg:px-8' : 'px-4 sm:px-6 lg:px-8'
    } border-b-2 border-black py-3 transition-all duration-300 ease-in-out`;

    return (
        <header className={headerClasses}>
            {/* Ajustamos el tamaño del logo */}
            <div className="flex items-center">
                <Logo className="w-14 sm:w-20 md:w-24" />
            </div>

            {currentUser ? (
                <ProfileMenu />
            ) : (
                <nav className="space-x-2 sm:space-x-4 text-xs sm:text-sm md:text-base">
                    <Link
                        className="hover:bg-gray-200 border-b-2 border-transparent hover:border-[#009EB5] p-1 rounded-md"
                        to="/users/register"
                    >
                        Registrarse
                    </Link>
                    <Link
                        to="/users/login"
                        className="hover:bg-gray-200 border-b-2 border-transparent hover:border-[#009EB5] p-1 rounded-md"
                    >
                        Iniciar Sesión
                    </Link>
                </nav>
            )}
        </header>
    );
};
