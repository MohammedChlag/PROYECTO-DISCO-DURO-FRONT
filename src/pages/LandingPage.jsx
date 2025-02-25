import { LayoutComun } from '../components/LayoutComun/LayoutComun.jsx';

import nubelogo from '../assets/img/5390309.png';

export const LandingPage = () => {
    return (
        <LayoutComun>
            <section className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center text-[#009EB5]">
                <img className="w-28 " src={nubelogo} alt="Nube Informática" />
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
                    Esto es lo que opinan nuestros usuarios:
                </h3>
                <article>Votación</article>
            </section>
        </LayoutComun>
    );
};
