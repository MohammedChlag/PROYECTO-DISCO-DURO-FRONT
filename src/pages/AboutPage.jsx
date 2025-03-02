import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo-hackloud-solo.png';
export const AboutPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="justify-center items-center text-center px-6 py-6 flex flex-col">
                <h2 className="text-2xl font-semibold mb-2"> About us</h2>

                <div className="w-16 h-1 bg-[#009EB5] mb-14"></div>

                <img src={logo} alt="Hackloud Logo" className="w-40" />
                <p className="text-lg font-medium mb-6"> Save it ALL </p>
                <p className="mt-4 max-w-lg sm:max-w-2xl sm:text-base">
                    Soy tu espacio seguro en la nube. Guarda, organiza y accede
                    a tus archivos desde cualquier dispositivo, en cualquier
                    momento. Conmigo, tus documentos, están protegidos con la
                    más alta seguridad y encriptación.
                </p>
                <p className="mt-4 max-w-lg sm:max-w-2xl sm:text-base">
                    Olvídate de perder información quedarte sin espacio. Mi
                    interfaz intuitiva te permite encontrar lo que necesitas en
                    segundos y compartir archivos fácilmente con quien quieras.
                    Además, mis planes se adaptan a tus necesidades, desde el
                    usuario individual hasta grandes empresas.
                </p>
                <p className="font-bold mt-10 sm:mt-16 md:mt-24">
                    ¡Prueba la libertad de tener tus archivos siempre contigo!
                </p>

                <div className="flex gap-4 mt-6">
                    <button className="font-bold px-4 py-2  rounded-lg bg-[#009EB5] shadow.md hover:bg-[#009ec3] ">
                        Valoraciones de la App
                    </button>
                    <button
                        onClick={() => navigate('/assessments')}
                        className="font-bold px-4 py-2 rounded-lg bg-[#009EB5] hover:bg-[#009ec3]"
                    >
                        Dejar una Valoracion
                    </button>
                </div>
            </div>
        </>
    );
};
