import logo from '../assets/img/logo-hackloud-solo.png';
import { Link } from 'react-router-dom';
import { useAuthHook } from '../hooks/useAuthHook.js';

export const Logo = () => {
    const { currentUser } = useAuthHook();
    const redirectPath = currentUser ? '/storage' : '/';

    return (
        <Link to={redirectPath}>
            <img
                src={logo}
                alt="Hackloud"
                className="h-4 w-auto hover:opacity-80 transition-opacity md:h-6"
            />
        </Link>
    );
};
