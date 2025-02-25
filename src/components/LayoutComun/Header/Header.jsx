import logo from '../../../assets/img/logo-hackloud-solo.png';

export const Header = () => {
    return (
        <header className="flex items-center justify-between w-[90vw] mx-auto gap-3 border-b-2 border-black py-4 ">
            <img className="w-28" src={logo} alt="Logo Hackloud" />
            <nav className="space-x-3 text-xs">
                <a href="/users/register" className="">
                    Registrarse
                </a>
                <a href="/users/login">Iniciar Sesión</a>
            </nav>
        </header>
    );
};
