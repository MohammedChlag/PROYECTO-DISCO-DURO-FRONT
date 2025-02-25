import React from 'react';

import logowhite from '../../../assets/img/logo-hackloud-solo-blanco.png';

export const Footer = () => {
    return (
        <footer className="flex-col justify-items-center w-full h-28 bg-black fixed bottom-0">
            <img
                className="h-6 w-28 mt-5"
                src={logowhite}
                alt="Logo Hackloud blanco"
            />
            <p className="text-sm mt-8 text-white">Copyright© Hackloud</p>
        </footer>
    );
};
