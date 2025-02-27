import { Logo } from '../Logo.jsx';

export const Footer = () => {
    return (
        <footer className="flex flex-col items-center bg-gradient-to-r from-cyan-300 to-slate-900 py-2 sm:py-4 mt-auto z-10">
            <Logo className="w-24 sm:w-32" />
            <p className="text-white/90 text-xs sm:text-sm mt-2 sm:mt-4">
                Copyright Hackloud
            </p>
        </footer>
    );
};
