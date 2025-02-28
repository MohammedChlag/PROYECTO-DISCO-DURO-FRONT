import { useState } from 'react';
import {
    FolderIcon,
    EllipsisVerticalIcon,
    PencilSquareIcon,
    ShareIcon,
    TrashIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { useItemsHook } from '../../hooks/useItemsHook.js';
import { RenameModal } from '../LayoutPrivate/RenameModal';

const truncateFolderName = (name, maxLength = 25) => {
    if (name.length <= maxLength) return name;
    return name.slice(0, maxLength - 3) + '...';
};

export const Carpeta = ({ folder, onFolderClick }) => {
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
    } = useItemsHook(folder, 'folder');

    const handleFolderClick = (e) => {
        if (e.target.closest('.folder-options')) {
            return;
        }
        onFolderClick(folder.id);
    };

    return (
        <>
            <li
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                onClick={handleFolderClick}
            >
                <article className="flex items-center m-1 p-1">
                    <FolderIcon className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="font-medium" title={folder.name}>
                        {truncateFolderName(folder.name)}
                    </h3>
                    {folder.shareToken && (
                        <div className="flex items-center text-sm text-gray-500">
                            <UsersIcon className="h-4 w-4 mr-1" />
                            <span>Compartido</span>
                        </div>
                    )}
                </article>

                <div className="relative folder-options">
                    <button
                        onClick={handleOptionsClick}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Opciones"
                    >
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                    </button>

                    {showOptions && (
                        <>
                            {/* Overlay para cerrar el menú */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={closeOptions}
                            />

                            {/* Menú de opciones */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
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
            </li>
            <RenameModal
                isOpen={showRenameModal}
                onClose={() => setShowRenameModal(false)}
                onSubmit={handleRenameSubmit}
                itemName={folder.name}
            />
        </>
    );
};
