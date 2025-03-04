import React from 'react';
import nubelogo from '../assets/img/5390309.png';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { AssessmentPreview } from '../components/Assessments/AssessmentsPreview';

export const LandingPage = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Hero section más compacto */}
            <section className="flex flex-col items-center justify-center text-center mb-8">
                <img
                    className="w-24 md:w-32"
                    src={nubelogo}
                    alt="Nube Informática"
                />
                <h2 className="text-2xl font-bold mt-3 md:text-3xl text-[#009EB5]">
                    Tu espacio digital sin límites
                </h2>
                <p className="mt-2 text-sm max-w-2xl md:text-base">
                    Libera tu creatividad y productividad con almacenamiento
                    seguro e ilimitado. Accede a tus archivos desde cualquier
                    lugar y olvídate de las preocupaciones de espacio.
                </p>
                <Button className="mt-4 px-6 py-2 bg-[#009EB5] text-white text-sm font-semibold rounded-md shadow-md hover:bg-[#009ec3] transition-all transform hover:scale-105">
                    <Link to="/users/register">¡Empieza gratis ahora!</Link>
                </Button>
            </section>

            {/* Sección de valoraciones más compacta */}
            <section className="py-6 px-4 text-center bg-gray-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    <span className="text-[#009EB5]">♥</span> La voz de nuestra
                    comunidad
                </h3>

                <AssessmentPreview />
            </section>
        </div>
    );
};
