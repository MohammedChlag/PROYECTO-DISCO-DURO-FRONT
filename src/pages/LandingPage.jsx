import { LayoutComun } from '../components/LayoutComun1/LayoutComun.jsx';
import { LayoutComun } from '../components/LayoutComun/LayoutComun.jsx';
import { Button } from '../components/Button.jsx';

export const LandingPage = () => {
    return (
        <LayoutComun>
            <section className="text-center mt-10">
                <h2 className="text-3xl font-bold">
                    Guarda y comparte tus archivos.
                </h2>
                <p className="mt-4 text-gray-600">
                    Herramienta que te permite guardar tus documentos en la nube
                    y tener acceso a ellos en cualquier momento.
                </p>
                <a
                    href="/users/register"
                    className="mt-6 inline-block bg-blue-500 text-white py-2 px-6 rounded"
                >
                    Registrate
                </a>
            </section>
        </LayoutComun>
    );
};
