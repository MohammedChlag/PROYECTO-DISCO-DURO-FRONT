import React from 'react';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, type }) => {
    if (!isOpen) return null;

    // Función para determinar el mensaje según el tipo
    const getMessage = () => {
        switch (type) {
            case 'folder':
                return 'esta carpeta';
            case 'file':
                return 'este archivo';
            case 'avatar':
                return 'tu avatar';
            case 'assessment':
                return 'esta valoración';
            default:
                return 'este elemento';
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay oscuro */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                    {/* Título */}
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Confirmar eliminación
                    </h3>

                    {/* Contenido */}
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            ¿Estás seguro de que deseas eliminar {getMessage()}?
                            Esta acción no se puede deshacer.
                        </p>
                    </div>

                    {/* Botones */}
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="bg-white px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
