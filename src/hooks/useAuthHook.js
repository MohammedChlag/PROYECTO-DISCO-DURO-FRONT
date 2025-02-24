import { useContext } from 'react';
import { AuthContext } from '../context/Auth/AuthContext.js';

export const useAuthHook = () => {
    const { token, currentUser, onLogin, onLogout } = useContext(AuthContext);
    return { token, currentUser, onLogin, onLogout };
};
