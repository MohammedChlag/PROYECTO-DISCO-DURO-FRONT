import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { downloadSharedFileService } from '../services/fetchApi';
import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export const DownloadPage = () => {
    const { shareToken } = useParams();
    const [downloading, setDownloading] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Iniciar la descarga automáticamente cuando se carga la página
        const startDownload = async () => {
            if (!shareToken) return;

            try {
                setDownloading(true);
                // Mostrar toast de inicio de descarga
                toast.info('Iniciando descarga...', { autoClose: 3000 });

                // Pequeño retraso para que el usuario vea la página antes de la descarga
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Llamar al servicio de descarga
                await downloadSharedFileService(shareToken);

                setDownloadComplete(true);
                toast.success('Descarga completada con éxito');
            } catch (err) {
                console.error('Error al descargar el archivo:', err);
                setError(err.message || 'Error al descargar el archivo');
                toast.error('No se pudo descargar el archivo');
            } finally {
                setDownloading(false);
            }
        };

        // Pequeño retraso antes de iniciar la descarga para que la página se renderice
        const timer = setTimeout(() => {
            startDownload();
        }, 1000);

        return () => clearTimeout(timer);
    }, [shareToken]);

    const handleManualDownload = async () => {
        if (downloading) return;

        try {
            setDownloading(true);
            toast.info('Reiniciando descarga...', { autoClose: 3000 });
            await downloadSharedFileService(shareToken);
            setDownloadComplete(true);
            toast.success('Descarga completada con éxito');
        } catch (err) {
            console.error('Error al descargar el archivo:', err);
            setError(err.message || 'Error al descargar el archivo');
            toast.error('No se pudo descargar el archivo');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <section className="container mx-auto py-12 px-4">
            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Cabecera con estado de descarga */}
                    <div className="bg-gradient-to-r from-cyan-400 to-[#0096b4] p-6 text-white">
                        <h1 className="text-2xl font-bold mb-2">
                            {downloadComplete
                                ? '¡Descarga completada!'
                                : error
                                ? 'Error en la descarga'
                                : 'Descargando archivo'}
                        </h1>
                        <p className="opacity-90">
                            {downloadComplete
                                ? 'Tu archivo ha sido descargado correctamente.'
                                : error
                                ? error
                                : 'Estamos preparando tu archivo para descargar...'}
                        </p>
                    </div>

                    {/* Contenido principal */}
                    <div className="p-6">
                        {/* Botón de descarga manual */}
                        {(downloadComplete || error) && (
                            <button
                                onClick={handleManualDownload}
                                disabled={downloading}
                                className="flex items-center justify-center gap-2 bg-cyan-400 hover:bg-[#0096b4] text-white font-medium py-3 px-4 rounded-lg w-full mb-6 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                <ArrowDownTrayIcon className="h-5 w-5" />
                                {downloading
                                    ? 'Descargando...'
                                    : 'Descargar de nuevo'}
                            </button>
                        )}

                        {/* Mensaje promocional */}
                        <div className="mt-4 p-5 bg-cyan-50 rounded-lg border border-cyan-100">
                            <h2 className="text-lg font-semibold text-cyan-800 mb-2">
                                ¿Necesitas compartir tus propios archivos?
                            </h2>
                            <p className="text-cyan-600 mb-4">
                                Únete a Hackloud y disfruta de almacenamiento
                                seguro, compartición de archivos y mucho más.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    to="/users/register"
                                    className="bg-cyan-400 hover:bg-[#0096b4] text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm flex-1 text-center"
                                >
                                    Registrarse gratis
                                </Link>
                                <Link
                                    to="/users/login"
                                    className="bg-white border border-cyan-400 hover:bg-cyan-50 text-cyan-600 font-medium py-2 px-4 rounded-lg transition-colors flex-1 text-center"
                                >
                                    Iniciar sesión
                                </Link>
                            </div>
                        </div>

                        {/* Enlace para volver */}
                        <div className="mt-6 text-center">
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center gap-1 text-gray-600 hover:text-cyan-700 transition-colors"
                            >
                                <ArrowLeftIcon className="h-4 w-4" />
                                Volver a la página principal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
