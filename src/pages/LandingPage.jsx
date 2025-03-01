import nubelogo from '../assets/img/5390309.png';

export const LandingPage = () => {
    return (
        <>
            <section className="flex-1 flex flex-col items-center justify-center text-center text-[#009EB5]">
                <img
                    className="mt-24 w-32 md:mt-24 md:w-40"
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
            <section className="mt-14 py-4 text-center">
                <h3 className="text-sm text-black mb-4">
                    Esto es lo que opinan nuestros usuarios:
                </h3>
                <article className="">Votación</article>
            </section>
        </>
    );
};
