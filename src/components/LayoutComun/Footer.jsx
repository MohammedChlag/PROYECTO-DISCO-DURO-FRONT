export const Footer = () => {
    return (
        <footer className="text-center p-4 border-t mt-4">
            <p>Copyright &copy; Hackcloud</p>
            <nav>
                <a href="/register" className="mx-2">
                    Registrarse
                </a>
                <a href="/login" className="mx-2">
                    Iniciar sesión
                </a>
            </nav>
        </footer>
    );
};
