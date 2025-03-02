import {
    DocumentIcon,
    PencilIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    ShareIcon,
    UsersIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { useItemsHook } from '../../hooks/useItemsHook.js';
import { RenameModal } from '../LayoutPrivate/Modals/RenameModal.jsx';
import { ShareModal } from '../LayoutPrivate/Modals/ShareModal';
import { DeleteConfirmModal } from '../LayoutPrivate/Modals/DeleteConfirmModal';

const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = Math.round(bytes / Math.pow(k, i));
    return `${size} ${sizes[i]}`;
};

const truncateFileName = (name, maxLength = 25) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.slice(0, -(extension.length + 1));
    const truncatedName = nameWithoutExt.slice(0, maxLength - 3) + '...';
    return `${truncatedName}.${extension}`;
};

export const Archivo = ({ file }) => {
    const {
        showOptions,
        showRenameModal,
        showShareModal,
        showDeleteModal,
        setShowDeleteModal,
        handleOptionsClick,
        closeOptions,
        handleRename,
        handleRenameSubmit,
        setShowRenameModal,
        handleShare,
        handleDelete,
        handleDeleteConfirm,
        handleDownload,
        shareUrls,
        setShowShareModal,
    } = useItemsHook(file, 'file');

    return (
        <>
            <li className="relative group flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <article className="flex items-center m-1 p-1">
                    <DocumentIcon className="h-6 w-6 text-gray-500 mr-3" />
                    <div className="flex flex-col">
                        <h3 className="text-sm font-medium text-gray-900">
                            {truncateFileName(file.name)}
                        </h3>
                        <div className="flex items-center mt-1">
                            <UsersIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                                {file.shareToken ? 'Compartido' : 'Privado'}
                            </span>
                            <span className="text-xs text-gray-500 ml-4">
                                {formatFileSize(file.size)}
                            </span>
                        </div>
                    </div>
                </article>

                <div className="file-options flex items-center space-x-1">
                    <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Descargar"
                    >
                        <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
                    </button>
                    <button
                        onClick={handleOptionsClick}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                    </button>

                    {showOptions && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={closeOptions}
                            />
                            <div className="absolute right-0 top-12 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                <button
                                    onClick={handleRename}
                                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                >
                                    <PencilIcon className="h-4 w-4 mr-2" />
                                    <span>Renombrar</span>
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                >
                                    <ShareIcon className="h-4 w-4 mr-2" />
                                    <span>Compartir</span>
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 text-red-600"
                                >
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </li>

            <RenameModal
                isOpen={showRenameModal}
                onClose={() => setShowRenameModal(false)}
                onRename={handleRenameSubmit}
                currentName={file.name}
                type="file"
            />

            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                urls={shareUrls}
                type="file"
                title={`Compartir "${file.name}"`}
            />

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                itemName={file.name}
                type="file"
            />
        </>
    );
};
