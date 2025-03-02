import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers.js';
import { AuthContext } from './AuthContext.js';
import { getOwnUserService } from '../../services/fetchApi.js';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getFromLocalStorage('DDToken') || null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const user = await getOwnUserService(token);
                    setCurrentUser(user);
                    setIsAdmin(user.role === 'admin');
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('DDToken');
                    setToken(null);
                    setCurrentUser(null);
                    setIsAdmin(false);
                }
            }
        };
        loadUser();
    }, [token]);

    const onLogin = async (token) => {
        try {
            setToken(token);
            setToLocalStorage('DDToken', token);
            const user = await getOwnUserService(token);
            setCurrentUser(user);
            setIsAdmin(user.role === 'admin');
        } catch (error) {
            localStorage.removeItem('DDToken');
            setToken(null);
            setCurrentUser(null);
            setIsAdmin(false);
            throw error;
        }
    };

    const onLogout = () => {
        localStorage.removeItem('DDToken');
        setToken(null);
        setCurrentUser(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider
            value={{ token, currentUser, isAdmin, onLogin, onLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
