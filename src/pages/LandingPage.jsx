import { LayoutComun } from '../components/LayoutComun/LayoutComun.jsx';
import { Button } from '../components/Button.jsx';

export const LandingPage = () => {
    return (
        <LayoutComun>
            <section>
                <h2>Guarda y comparte tus archivos</h2>
                <p>
                    Herramienta que te permite guardar tus documentos en la nube
                    y tener acceso a ellos en cualquier momento.
                </p>
            </section>
            <Button>Regístrate</Button>
            <section>
                <h3>Esto es lo que opinan nuestros usuarios:</h3>
                <article>Votación</article>
            </section>
        </LayoutComun>
    );
};
