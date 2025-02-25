import React from 'react';

export const Header = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-[#E5F3F2]">
            <h1 className="text-2xl font-bold text-gray-800">Hackcloud</h1>
            <nav className="space-x-4 text-gray-700">
                <a href="/users/register" className="hover:underline">
                    Registrarse
                </a>
                <a href="/users/login" className="hover:underline">
                    Iniciar sesión
                </a>
            </nav>
        </header>
    );
};
