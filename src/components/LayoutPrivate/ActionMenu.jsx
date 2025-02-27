import { FolderPlusIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export const ActionMenu = ({ show, onClose, onUpload, onCreateFolder }) => {
    if (!show) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-25"
                onClick={onClose}
            />

            {/* Menu */}
            <div className="fixed bottom-24 right-10 bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-2">
                    <button
                        onClick={() => {
                            onUpload();
                            onClose();
                        }}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                    >
                        <ArrowUpTrayIcon className="h-5 w-5 mr-3" />
                        <span>Subir archivo</span>
                    </button>
                    <button
                        onClick={() => {
                            onCreateFolder();
                            onClose();
                        }}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                    >
                        <FolderPlusIcon className="h-5 w-5 mr-3" />
                        <span>Crear carpeta</span>
                    </button>
                </div>
            </div>
        </>
    );
};
