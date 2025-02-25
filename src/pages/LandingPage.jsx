import { Header } from '../components/Header/Header.jsx';

export const LandingPage = () => {
    return (
        <>
            <Header />
            <main>
                <section>
                    <h2>Guarda y comparte tus archivos</h2>
                    <p>
                        Herramienta que te permite guardar tus documentos en la
                        nube y tener acceso a ellos en cualquier momento.
                    </p>
                </section>
                <button>Regístrate</button>
                <section>
                    <h3>Esto es lo que opinan nuestros usuarios:</h3>
                    <article>Votación</article>
                </section>
            </main>
            <footer>
                <img src="" alt="" />
                <a href="">Registrarse</a>
                <a href="">Iniciar Sesión</a>
                <p>Copyright© Hackloud</p>
            </footer>
        </>
    );
};
