import { Logo } from '../Logo.jsx';

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-cyan-300 to-slate-900 py-4">
            <div className="flex flex-col items-center">
                <Logo />
                <p className="text-sm mt-4">Copyright© Hackloud</p>
            </div>
        </footer>
    );
};
