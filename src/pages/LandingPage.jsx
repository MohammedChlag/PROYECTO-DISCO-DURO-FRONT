import { LayoutPublic } from '../components/LayoutPublic/LayoutPublic.jsx';

import nubelogo from '../assets/img/5390309.png';

export const LandingPage = () => {
    return (
        <LayoutPublic>
            <section className="flex flex-col items-center justify-center min-h-[calc(100vh-24rem)] text-center text-[#009EB5]">
                <img className="w-40 " src={nubelogo} alt="Nube Informática" />
                <h2 className="text-2xl font-bold ">
                    Guarda y comparte tus archivos
                </h2>
                <p className="mt-5 text-xs text-black">
                    Almacena tus documentos en la nube y ten acceso a ellos en
                    cualquier momento.
                </p>
            </section>
            <section>
                <h3 className="mt-10 text-xs text-black">
                    e Esto es lo que opinan nuestros usuarios:
                </h3>
                <article>Votación</article>
            </section>
        </LayoutPublic>
    );
};
