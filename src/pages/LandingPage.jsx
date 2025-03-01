import { useNavigate } from 'react-router-dom';
import nubelogo from '../assets/img/5390309.png';

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className=" flex flex-col items-center justify-center text-center text-[#009EB5]">
                <img
                    className="mt-16 w-32"
                    src={nubelogo}
                    alt="Nube Informática"
                />
                <h2 className="text-2xl font-bold mt-4">
                    Guarda y comparte tus archivos
                </h2>
                <p className="mt-4 text-sm text-black max-w-md">
                    Herramienta que te permite Almacenar tus documentos en la
                    nube y tener acceso a ellos en cualquier momento.
                </p>
            </section>

            <section className=" py-4 text-center">
                <h3 className="text-sm text-black mb-4 px-4 font-medium">
                    Esto es lo que opinan nuestros usuarios:
                </h3>
                <div className="border border-gray-300 rounded-lg mb-4"></div>
                <div className="flex flex-col items-end gap-3">
                    <button
                        className="text-white px-2 py-2 mr-2 rounded-lg bg-[#009EB5] hover:bg-[#009ec3]"
                        onClick={() => navigate('/assessments')}
                    >
                        Dejar una valoracion
                    </button>
                    <button className=" py-2 px-5 mr-2 text-white bg-[#009EB5] border rounded-md shadow-md hover:bg-[#009ec3]">
                        Ver valoraciones
                    </button>
                </div>
            </section>
        </>
    );
};
