import React, { useRef, useState, useEffect } from 'react';
import nubelogo from '../assets/img/5390309.png';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { AssessmentPreview } from '../components/Assessments/AssessmentsPreview.jsx';
<<<<<<< Updated upstream
=======
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
>>>>>>> Stashed changes

export const LandingPage = () => {
    // Referencia para la sección de valoraciones y la sección principal
    const valoracionesRef = useRef(null);
    const heroRef = useRef(null);

    // Estado para controlar la dirección de la flecha y la posición
    const [isAtTop, setIsAtTop] = useState(true);

    // Función para desplazarse suavemente a la sección de valoraciones o al inicio
    const handleScroll = () => {
        if (isAtTop) {
            // Si estamos arriba, desplazarse a las valoraciones
            valoracionesRef.current.scrollIntoView({ behavior: 'smooth' });
            setIsAtTop(false); // Cambiar el estado inmediatamente
        } else {
            // Si estamos abajo, desplazarse al inicio
            heroRef.current.scrollIntoView({ behavior: 'smooth' });
            setIsAtTop(true); // Cambiar el estado inmediatamente
        }
    };

    // Detectar la posición de desplazamiento para cambiar la dirección de la flecha
    useEffect(() => {
        const handleScrollPosition = () => {
            if (valoracionesRef.current && heroRef.current) {
                const scrollPosition = window.scrollY;
                const valoracionesPosition = valoracionesRef.current.getBoundingClientRect().top + window.scrollY;
                
                // Determinar si estamos más cerca de la sección de valoraciones
                const nearValoraciones = scrollPosition >= (valoracionesPosition - 200);
                
                // Actualizar el estado solo si ha cambiado
                if (isAtTop === nearValoraciones) {
                    setIsAtTop(!nearValoraciones);
                }
            }
        };

        // Escuchar el evento de desplazamiento
        window.addEventListener('scroll', handleScrollPosition);
        
        // Verificar la posición inicial
        handleScrollPosition();

        // Limpiar el event listener al desmontar
        return () => window.removeEventListener('scroll', handleScrollPosition);
    }, [isAtTop]);

    return (
        <div className="max-w-6xl mx-auto px-4">
            {/* Hero section mejorado con más protagonismo */}
            <section
                ref={heroRef}
                className="flex flex-col items-center justify-center text-center py-16 md:py-24"
            >
                <img
                    className="w-28 md:w-36 mb-6 animate-float"
                    src={nubelogo}
                    alt="Nube Informática"
                />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#009EB5] mb-4">
                    Tu espacio digital sin límites
                </h2>
                <p className="mt-4 text-base max-w-2xl md:text-lg text-gray-700 mb-8">
                    Libera tu creatividad y productividad con almacenamiento
                    seguro e ilimitado. Accede a tus archivos desde cualquier
                    lugar y olvídate de las preocupaciones de espacio.
                </p>
                <Button className="mt-6 px-8 py-3 bg-[#009EB5] text-white text-base font-semibold rounded-md shadow-lg hover:bg-[#009ec3] transition-all transform hover:scale-105 hover:shadow-xl">
                    <Link to="/users/register">¡Empieza gratis ahora!</Link>
                </Button>
            </section>

            {/* Separador visual con interacción */}
            <div className="relative py-8 md:py-12">
                <button
                    onClick={handleScroll}
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#009EB5] focus:ring-opacity-50 hover:bg-gray-50 border border-gray-200 hover:border-[#009EB5]"
                    aria-label={
                        isAtTop ? 'Desplazarse a valoraciones' : 'Volver arriba'
                    }
                >
                    {isAtTop ? (
                        <ChevronDownIcon className="h-6 w-6 text-[#009EB5]" />
                    ) : (
                        <ChevronUpIcon className="h-6 w-6 text-[#009EB5]" />
                    )}
                </button>
                <hr className="border-gray-200" />
            </div>

            {/* Sección de valoraciones con menos protagonismo */}
            <section
                ref={valoracionesRef}
                className="py-6 px-4 text-center bg-gray-50 rounded-lg shadow-sm mb-16 opacity-90 hover:opacity-100 transition-opacity"
            >
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    <span className="text-[#009EB5]">♥</span> La voz de nuestra
                    comunidad
                </h3>
                <AssessmentPreview />
            </section>
        </div>
    );
};
