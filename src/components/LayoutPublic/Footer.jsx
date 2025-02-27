import { Logo } from '../Logo.jsx';

export const Footer = () => {
    return (
        <footer className="flex-col justify-items-center w-full h-28 bg-gradient-to-r from-cyan-300 to-slate-900 bottom-0">
            <Logo />
            <p className="text-sm mt-8">Copyright© Hackloud</p>
        </footer>
    );
};
