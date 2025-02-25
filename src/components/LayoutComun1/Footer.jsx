export const Footer = () => {
    return (
        <footer className="bg-[#1E4D4A] text-white py-6 text-center">
            <h1 className="text-lg font-semibold">Hackcloud</h1>
            <div className="mt-2 space-x-4">
                <a href="/users/register" className="hover:underline">
                    Registrarse
                </a>
                <a href="/users/login" className="hover:underline">
                    Iniciar sesión
                </a>
            </div>
            <p className="mt-2 text-sm">Copyright© SendDoc</p>
        </footer>
    );
};
