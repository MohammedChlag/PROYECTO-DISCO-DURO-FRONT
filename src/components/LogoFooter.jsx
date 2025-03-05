import logoFooter from '../assets/img/logo-hackloud-solo-blanco.png';
import { Link } from 'react-router-dom';
import { useAuthHook } from '../hooks/useAuthHook.js';

export const Logofooter = () => {
    const { currentUser } = useAuthHook();
    const redirectPath = currentUser ? '/storage' : '/aboutUs';

    return (
        <Link to={redirectPath}>
            <img
                src={logoFooter}
                alt="Hackloud blanco"
                className="h-4 w-auto hover:opacity-80 transition-opacity md:h-6"
            />
        </Link>
    );
};
