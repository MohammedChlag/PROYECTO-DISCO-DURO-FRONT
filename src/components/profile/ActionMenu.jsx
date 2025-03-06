import { ArrowUpTrayIcon, FolderPlusIcon } from '@heroicons/react/24/solid';

export const ActionMenu = ({
    show,
    onClose,
    onUpload,
    onCreateFolder,
    className = '',
}) => {
    if (!show) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-25 z-40"
                onClick={onClose}
            />

            {/* Menu */}
            <div
                className={`bg-white rounded-lg shadow-xl overflow-hidden p-2 min-w-[200px] z-50 ${className}`}
            >
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
                {onCreateFolder && (
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
                )}
            </div>
        </>
    );
};
