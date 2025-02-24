import { createContext } from 'react';

export const AuthContext = createContext({
    token: null,
    currentUser: null,
    onLogin: () => undefined,
    onLogout: () => undefined,
});
