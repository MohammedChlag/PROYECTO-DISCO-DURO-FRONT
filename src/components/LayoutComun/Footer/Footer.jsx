import React from 'react';

import logo from '../../../assets/img/logo-hackloud-solo.png';

export const Footer = () => {
    return (
        <footer className="flex-col justify-items-center w-full h-28 bg-gradient-to-r from-cyan-300 to-slate-900 bottom-0">
            <img className="" src={logo} alt="Logo Hackloud" />
            <p className="text-sm mt-8">Copyright© Hackloud</p>
        </footer>
    );
};
