import { useNavigate } from 'react-router-dom';
import nubelogo from '../assets/img/5390309.png';

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className=" flex flex-col items-center justify-center text-center text-[#009EB5]">
                <img
                    className="mt-20 w-32 md:mt-22 md:w-40"
                    src={nubelogo}
                    alt="Nube Informática"
                />
                <h2 className="text-2xl font-bold mt-4 md:text-3xl">
                    Guarda y comparte tus archivos
                </h2>
                <p className="mt-4 text-sm text-black max-w-80 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl md:text-base lg:text-lg">
                    Almacena tus documentos en la nube y ten acceso a ellos en
                    cualquier momento.
                </p>
            </section>

            <section className="py-4 pt-6 text-center">
                <h3 className="text-sm text-black px-4 pt-8 pb-3 font-medium">
                    Esto es lo que opinan nuestros usuarios:
                </h3>
                {/* <div className="border border-gray-300 rounded-lg mb-4 w-[99vw]"></div> */}
                <div className="flex flex-col items-end gap-3 border border-cyan-400 rounded-xl mx-8 p-2 w-[90vw] sm:max-w-xl">
                    <button
                        className="text-white px-2 py-2 mr-3 rounded-lg bg-[#009EB5] hover:bg-[#009ec3]"
                        onClick={() => navigate('/assessments')}
                    >
                        Dejar una valoracion
                    </button>
                    <button className="py-2 px-5 mr-3 text-white bg-[#009EB5] border rounded-lg shadow-md hover:bg-[#009ec3]">
                        Ver valoraciones
                    </button>
                </div>
            </section>
        </>
    );
};
