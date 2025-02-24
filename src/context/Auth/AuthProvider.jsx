import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers.js';
import { AuthContext } from './AuthContext.js';
import { getOwnUserService } from '../../services/fetchApi.js';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getFromLocalStorage('DDToken') || null);
    const [currenUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const user = await getOwnUserService(token);
                    setCurrentUser(user);
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('DDToken');
                    setToken(null);
                    setCurrentUser(null);
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
        } catch (error) {
            localStorage.removeItem('DDToken');
            setToken(null);
            setCurrentUser(null);
            throw error;
        }
    };
    const onLogout = () => {
        localStorage.removeItem('DDToken');
        setToken(null);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={(token, currenUser, onLogin, onLogout)}>
            {children}
        </AuthContext.Provider>
    );
};
