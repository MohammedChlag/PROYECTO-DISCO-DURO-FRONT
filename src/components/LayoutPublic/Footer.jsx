import { Logo } from '../Logo.jsx';

export const Footer = () => {
    return (
        <footer className="flex flex-col items-center bg-gradient-to-r from-cyan-300 via-teal-300 to-slate-900 p-2 gap-2 h-16">
            <Logo />
            <p className="text-xs sm:text-sm">Copyright© Hackloud</p>
        </footer>
    );
};
