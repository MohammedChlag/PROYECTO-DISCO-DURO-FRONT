import logo from '../assets/img/logo-hackloud-solo.png';
import { Link } from 'react-router-dom';
import { useAuthHook } from '../hooks/useAuthHook.js';

export const Logo = () => {
    const { currentUser } = useAuthHook();
    const redirectPath = currentUser ? '/storage' : '/';

    return (
        <Link to={redirectPath} className="block">
            <img
                src={logo}
                alt="Hackloud"
                className="h-7 w-auto hover:opacity-80 transition-opacity"
            />
        </Link>
    );
};
