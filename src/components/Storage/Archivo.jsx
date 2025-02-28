import { useState } from 'react';
import {
    DocumentIcon,
    EllipsisVerticalIcon,
    PencilSquareIcon,
    ShareIcon,
    TrashIcon,
    UsersIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { useItemsHook } from '../../hooks/useItemsHook.js';
import { RenameModal } from '../LayoutPrivate/RenameModal';

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
        handleOptionsClick,
        closeOptions,
        handleRename,
        handleRenameSubmit,
        setShowRenameModal,
        handleShare,
        handleDelete,
        handleDownload,
    } = useItemsHook(file, 'file');

    return (
        <>
            <li className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 w-[95vw]">
                <article className="flex items-center">
                    <DocumentIcon className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="font-medium" title={file.name}>
                        {truncateFileName(file.name)}
                    </h3>
                    {file.shareToken && (
                        <UsersIcon
                            className="h-4 w-4 text-gray-500 ml-2"
                            title="Compartido"
                        />
                    )}
                </article>

                <article className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                        {formatFileSize(file.size)}
                    </span>
                    <div className="relative">
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
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                    >
                                        <ArrowDownTrayIcon className="h-4 w-4 mr-3" />
                                        <span>Descargar</span>
                                    </button>
                                    <button
                                        onClick={handleRename}
                                        className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                    >
                                        <PencilSquareIcon className="h-4 w-4 mr-3" />
                                        <span>Renombrar</span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                    >
                                        <ShareIcon className="h-4 w-4 mr-3" />
                                        <span>Compartir</span>
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 text-red-600"
                                    >
                                        <TrashIcon className="h-4 w-4 mr-3" />
                                        <span>Eliminar</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </li>
            <RenameModal
                isOpen={showRenameModal}
                onClose={() => setShowRenameModal(false)}
                onSubmit={handleRenameSubmit}
                itemName={file.name}
            />
        </>
    );
};
