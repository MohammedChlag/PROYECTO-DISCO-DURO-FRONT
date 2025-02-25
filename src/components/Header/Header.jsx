import React from 'react';

import './header.css';
export const Header = () => {
    return (
        <header className="flex flex-justify-between items-center p-4 border-b">
            <h1 className="text-3xl font-bold">Hackloud</h1>
            <nav>
                <a href="/users/register" className="mx-2">
                    Registrate
                </a>
                <a href="/users/login" className="mx-2">
                    Inicia Sesion
                </a>
            </nav>
        </header>
    );
};
