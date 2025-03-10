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
    const headerClasses = `flex items-center justify-between w-[92vw] lg:w-full ${
        isStoragePage ? 'lg:max-w-screen-xl' : 'lg:max-w-screen-lg'
    } mx-auto ${
        isStoragePage ? 'lg:px-8' : 'sm:px-6 lg:px-8'
    } border-b-2 border-black dark:border-white py-3 transition-all duration-300 ease-in-out`;

    return (
        <header className={headerClasses}>
            {/* Ajustamos el tamaño del logo */}
            <div className="flex w-[92vw]">
                <Logo className="w-14 sm:w-20 md:w-24" />
            </div>

            {currentUser ? (
                <ProfileMenu />
            ) : (
                <nav className="flex sm:space-x-4 text-xs sm:text-sm md:text-base">
                    <Link
                        className="hover:bg-gray-600 border-b-2 border-transparent hover:border-[#009EB5] p-1 rounded-md dark:text-white"
                        to="/users/register"
                    >
                        Registrarse
                    </Link>
                    <Link
                        to="/users/login"
                        className="hover:bg-gray-600 dark:text-white w-24 sm:w-28 md:w-32 border-b-2 border-transparent hover:border-[#009EB5] p-1 rounded-md text-gray-500"
                    >
                        Iniciar Sesión
                    </Link>
                </nav>
            )}
        </header>
    );
};
