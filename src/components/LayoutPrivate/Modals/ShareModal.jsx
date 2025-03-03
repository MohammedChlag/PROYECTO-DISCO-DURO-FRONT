import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const ShareModal = ({ isOpen, onClose, urls, type }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [localIsOpen, setLocalIsOpen] = useState(isOpen);

    useEffect(() => {
        console.log('ShareModal useEffect isOpen:', {
            isOpen,
            prevIsOpen: localIsOpen,
        });
        setLocalIsOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        console.log('ShareModal useEffect urls:', { localIsOpen, urls, type });
        if (localIsOpen) {
            console.log('Modal abierto con props:', { urls, type });
            setIsLoading(true);
            const timer = setTimeout(() => {
                console.log('ShareModal timer completado:', { urls });
                console.log('Loading terminado, urls disponibles:', urls);
                setIsLoading(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [localIsOpen, urls]);

    console.log('ShareModal render:', {
        isOpen,
        localIsOpen,
        urls,
        type,
        isLoading,
    });

    if (!localIsOpen) {
        console.log('ShareModal no está abierto');
        return null;
    }

    const shareUrl = urls?.url || urls?.download;
    console.log('URL seleccionada:', { shareUrl, urls });

    const handleCopy = async (text) => {
        if (!text) {
            toast.error('URL no disponible');
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            toast.success('URL copiada al portapapeles');
        } catch (error) {
            toast.error('Error al copiar la URL');
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>

                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {type === 'folder'
                            ? 'Compartir carpeta'
                            : 'Compartir archivo'}
                    </h3>

                    <div className="mt-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B4D8]"></div>
                                <p className="ml-2 text-gray-500">
                                    Generando enlace...
                                </p>
                            </div>
                        ) : (
                            <>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {type === 'folder'
                                        ? 'Enlace para compartir'
                                        : 'Enlace de descarga'}
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={shareUrl || ''}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
                                    />
                                    <button
                                        onClick={() => handleCopy(shareUrl)}
                                        className="rounded-md bg-[#00B4D8] hover:bg-[#0096B4] px-4 py-2 text-sm font-medium text-white"
                                        disabled={!shareUrl}
                                    >
                                        Copiar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
