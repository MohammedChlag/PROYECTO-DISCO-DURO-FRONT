import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo-hackloud-solo.png';
import { Boundary } from '../services/ErrorBoundary.jsx';

export const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col items-center text-center px-6 py-8 flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">About us</h2>
            <div className="w-12 h-1 bg-[#009EB5] mb-6"></div>

            <img src={logo} alt="Hackloud Logo" className="w-32 sm:w-40 mb-4" />

            <p className="text-base sm:text-lg font-medium">Save it ALL</p>

            <div className="max-w-2xl mx-auto text-gray-700 space-y-4 mt-4">
                <p>
                    Soy tu espacio seguro en la nube. Guarda, organiza y accede
                    a tus archivos desde cualquier dispositivo, en cualquier
                    momento. Conmigo, tus documentos están protegidos con la más
                    alta seguridad y encriptación.
                </p>
                <p>
                    Olvídate de perder información o quedarte sin espacio. Mi
                    interfaz intuitiva te permite encontrar lo que necesitas en
                    segundos y compartir archivos fácilmente con quien quieras.
                    Además, mis planes se adaptan a tus necesidades, desde el
                    usuario individual hasta grandes empresas.
                </p>
                <p className="font-bold">
                    ¡Prueba la libertad de tener tus archivos siempre contigo!
                </p>
            </div>

            <Boundary>
                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-sm sm:max-w-md">
                    <button className="w-full sm:w-auto text-white px-4 py-2 rounded-lg bg-[#009EB5] shadow-md hover:bg-[#009ec3] transition-all">
                        Valoraciones de la App
                    </button>
                    <button
                        onClick={() => navigate('/assessments')}
                        className="w-full sm:w-auto text-white px-4 py-2 rounded-lg bg-[#009EB5] shadow-md hover:bg-[#009ec3] transition-all"
                    >
                        Dejar una Valoración
                    </button>
                </div>
            </Boundary>
        </section>
    );
};
