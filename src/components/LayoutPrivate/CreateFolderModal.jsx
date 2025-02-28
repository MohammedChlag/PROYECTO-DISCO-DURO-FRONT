import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const CreateFolderModal = ({ isOpen, onClose, onCreateFolder }) => {
    const [folderName, setFolderName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar nombre de carpeta
        if (!folderName.trim()) {
            setError('El nombre de la carpeta es obligatorio');
            return;
        }

        onCreateFolder(folderName.trim());
        setFolderName('');
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay oscuro */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Botón cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>

                    {/* Título */}
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Crear nueva carpeta
                    </h3>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="folderName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nombre de la carpeta
                            </label>
                            <input
                                type="text"
                                id="folderName"
                                value={folderName}
                                onChange={(e) => {
                                    setFolderName(e.target.value);
                                    setError('');
                                }}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Mi carpeta"
                                autoFocus
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Botones */}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md border bg-[#fecaca] border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#f87171] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-[#00B4D8] hover:bg-[#0096B4] px-4 py-2 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Crear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
