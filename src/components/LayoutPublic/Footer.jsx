import { Logo } from '../Logo.jsx';

export const Footer = () => {
    return (
        <footer className="flex flex-col items-center bg-gradient-to-r from-cyan-300 to-slate-900 p-2.5">
            <Logo />
            <p>Copyright© Hackloud</p>
        </footer>
    );
};
