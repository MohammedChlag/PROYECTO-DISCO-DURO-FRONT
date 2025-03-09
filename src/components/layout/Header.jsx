import { Link } from 'react-router-dom';
import { Logo } from './Logo.jsx';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { ProfileMenu } from '../profile/ProfileMenu.jsx';

export const Header = () => {
    const { currentUser } = useAuthHook();

    return (
        <header className="flex items-center justify-between w-[90vw] max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-gray-600 py-3">
            {/* Ajustamos el tamaño del logo */}
            <div className="flex items-center">
                <Logo className="w-14 sm:w-20 md:w-24" />
            </div>

            {currentUser ? (
                <ProfileMenu />
            ) : (
                <nav className="space-x-2 sm:space-x-4 text-xs sm:text-sm md:text-base">
                    <Link
                        className="hover:bg-gray-200 dark:hover:bg-[#575757] border-b-2 border-transparent hover:border-[#009EB5] p-1 rounded-md"
                        to="/users/register"
                    >
                        Registrarse
                    </Link>
                    <Link
                        to="/users/login"
                        className="hover:bg-gray-200 dark:hover:bg-[#575757] border-b-2 border-transparent hover:border-[#009EB5] p-1 rounded-md"
                    >
                        Iniciar Sesión
                    </Link>
                </nav>
            )}
        </header>
    );
};
