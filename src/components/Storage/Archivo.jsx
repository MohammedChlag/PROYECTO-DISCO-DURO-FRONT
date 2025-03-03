import {
    DocumentIcon,
    PencilIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    ShareIcon,
    UsersIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { RenameModal } from '../LayoutPrivate/Modals/RenameModal.jsx';
import { ShareModal } from '../LayoutPrivate/Modals/ShareModal';
import { DeleteConfirmModal } from '../LayoutPrivate/Modals/DeleteConfirmModal';
import { downloadFileService } from '../../services/fetchApi.js';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { useItemsHook } from '../../hooks/useItemsHook.js';
import { toast } from 'react-toastify';

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

export const Archivo = ({ file, onRename, onDelete, onShare }) => {
    const { token } = useAuthHook();
    const {
        showOptions,
        showRenameModal,
        showShareModal,
        showDeleteModal,
        shareUrls,
        handleOptionsClick,
        handleRename,
        handleShare,
        handleDelete,
        handleDeleteConfirm,
        closeOptions,
        setShowRenameModal,
        setShowShareModal,
        setShowDeleteModal,
    } = useItemsHook(file, 'file', { onDelete, onShare });

    console.log('Estado del modal en Archivo:', { showShareModal, shareUrls });

    const handleRenameSubmit = async (newName) => {
        await onRename(file.id, newName);
        setShowRenameModal(false);
    };

    const handleDownload = async () => {
        try {
            const message = await downloadFileService(file.id, token);
            closeOptions();
            toast.success(message);
        } catch (error) {
            toast.error(error.message || 'Error al descargar el archivo');
        }
    };

    return (
        <>
            <li className="relative group flex flex-col p-4 border rounded-lg hover:bg-gray-50">
                <article className="flex items-center mb-3">
                    <DocumentIcon className="h-6 w-6 text-gray-500 mr-3 flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                            {truncateFileName(file.name)}
                        </h3>
                        <div className="flex items-center mt-1">
                            <UsersIcon className="h-4 w-4 text-gray-400 mr-1 flex-shrink-0" />
                            <span className="text-xs text-gray-500 ml-4">
                                {formatFileSize(file.size)}
                            </span>
                        </div>
                    </div>
                </article>

                <div className="flex items-center justify-end space-x-1 mt-2">
                    <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Descargar"
                    >
                        <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
                    </button>
                    <button
                        onClick={handleOptionsClick}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    >
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                    </button>

                    {showOptions && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={closeOptions}
                            />
                            <div className="absolute right-0 top-full mt-2 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
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
                                    className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
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
                onSubmit={handleRenameSubmit}
                currentName={file.name}
                type="file"
            />

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                type="file"
            />

            <ShareModal
                isOpen={showShareModal}
                onClose={() => {
                    console.log('Cerrando modal');
                    setShowShareModal(false);
                }}
                urls={shareUrls}
                type="file"
                title={file.name}
            />
        </>
    );
};
