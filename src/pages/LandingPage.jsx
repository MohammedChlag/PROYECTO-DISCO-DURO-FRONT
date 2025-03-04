import nubelogo from '../assets/img/5390309.png';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { Boundary } from '../services/ErrorBoundary.jsx';

export const LandingPage = () => {
    return (
        <>
            <Boundary>
                <section className="flex flex-col items-center justify-center text-center">
                    <img
                        className="mt-14 w-32 md:mt-24 md:w-40"
                        src={nubelogo}
                        alt="Nube Informática"
                    />
                    <h2 className="text-2xl font-bold mt-4 md:text-3xl text-[#009EB5]">
                        Guarda y comparte tus archivos
                    </h2>
                    <p className="mt-4 text-sm max-w-80 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl md:text-base lg:text-lg">
                        Almacena tus documentos en la nube y ten acceso a ellos
                        en cualquier momento.
                    </p>
                    <Button className="mt-6 px-6 py-3 bg-[#009EB5] text-white text-sm font-semibold rounded-md shadow-md hover:bg-[#009ec3]">
                        <Link to="/users/register">Registrate Aquí</Link>
                    </Button>
                </section>
            </Boundary>

            <Boundary>
                <section className="py-6 px-4 text-center bg-gray-50 rounded-lg shadow-md mt-6 max-w-2xl mx-auto md:mt-16">
                    <h3 className="text-lg font-semibold text-gray-700">
                        Esto es lo que opinan nuestros usuarios:
                    </h3>
                    <div className="mt-6">
                        <Button className="px-6 py-2 bg-[#009EB5] text-white text-sm font-semibold rounded-md shadow-md hover:bg-[#009ec3]">
                            <Link to="/assessments">
                                Ver todas las valoraciones
                            </Link>
                        </Button>
                    </div>
                </section>
            </Boundary>
        </>
    );
};
