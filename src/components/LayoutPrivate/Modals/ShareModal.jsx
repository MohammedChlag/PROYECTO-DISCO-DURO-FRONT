import { toast } from 'react-toastify';

export const ShareModal = ({ isOpen, onClose, urls, type, title }) => {
    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('URL copiada al portapapeles');
            onClose(); // Cerrar el modal después de copiar
        } catch (error) {
            toast.error('Error al copiar la URL');
        }
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
                <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                    {/* Título */}
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {title ||
                            (type === 'folder'
                                ? 'Compartir carpeta'
                                : 'Enlace de descarga')}
                    </h3>

                    {/* Contenido */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {type === 'folder'
                                    ? 'URL para compartir'
                                    : 'URL de descarga'}
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={urls.share}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={() => handleCopy(urls.share)}
                                    className="rounded-md bg-[#00B4D8] hover:bg-[#0096B4] px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Copiar
                                </button>
                            </div>
                        </div>

                        {type === 'file' && urls.download && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL de descarga
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={urls.download}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={() =>
                                            handleCopy(urls.download)
                                        }
                                        className="rounded-md bg-[#00B4D8] hover:bg-[#0096B4] px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Copiar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
