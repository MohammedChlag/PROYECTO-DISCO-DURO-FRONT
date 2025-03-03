// import { Logo } from '../Logo.jsx';

// export const Footer = () => {
//     return (
//         <footer className="flex flex-col items-center bg-gradient-to-r from-cyan-300 via-teal-300 to-slate-900 p-2.5">
//             <Logo />
//             <p>Copyright© Hackloud</p>
//         </footer>
//     );
// };

import { Logo } from '../Logo.jsx';

export const Footer = () => {
    return (
        <footer className="flex flex-col gap-2 items-center justify-center w-full bg-gradient-to-r from-cyan-300 via-teal-300 to-slate-900 p-2 sm:p-4 text-white text-xs sm:text-sm md:text-base">
            {/* Logo ajustable según el tamaño de la pantalla */}
            <Logo className="w-16 sm:w-20 md:w-24 mb-2" />
            <p className="text-center">Copyright© Hackloud</p>
        </footer>
    );
};
