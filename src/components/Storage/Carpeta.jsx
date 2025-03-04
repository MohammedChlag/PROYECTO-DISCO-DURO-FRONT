// iconos
import {
    FolderIcon,
    PencilIcon,
    ShareIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
// hook y estado
import { useItemsHook } from '../../hooks/useItemsHook.js';
// modales algún día serán uno...
import { RenameModal } from '../LayoutPrivate/Modals/RenameModal.jsx';
import { DeleteConfirmModal } from '../LayoutPrivate/Modals/DeleteConfirmModal.jsx';
import { ShareModal } from '../LayoutPrivate/Modals/ShareModal.jsx';

// Esta te la sabes?
const truncateFolderName = (name, maxLength = 25) => {
    if (name.length <= maxLength) return name;
    return name.slice(0, maxLength - 3) + '...';
};

// Componenete carpeta recibe funciones y se maneja con el hook
export const Carpeta = ({
    folder,
    onFolderClick,
    onRename,
    onDelete,
    onRefetchStorage,
}) => {
    console.log(`CARPETA `, folder);
    // maravilla de customHook
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
    } = useItemsHook(folder, 'folder', { onDelete, onRefetchStorage });

    const handleRenameSubmit = async (newName) => {
        await onRename(folder.id, newName);
        setShowRenameModal(false);
    };

    const handleFolderClick = (e) => {
        if (e.target.closest('.folder-options')) {
            return;
        }
        onFolderClick(folder.id);
    };

    return (
        <>
            <li
                onClick={handleFolderClick}
                className="relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 group"
            >
                <div className="flex items-center flex-1 min-w-0">
                    <div className="flex-shrink-0 mr-2">
                        {folder.shareToken ? (
                            <div className="relative">
                                <FolderIcon className="h-8 w-8 text-blue-500" />
                                <UsersIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
                            </div>
                        ) : (
                            <FolderIcon className="h-8 w-8 text-blue-500" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {truncateFolderName(folder.name)}
                        </p>
                    </div>
                </div>

                <div className="folder-options relative ml-2">
                    <button
                        onClick={handleOptionsClick}
                        className="p-1 rounded-full hover:bg-gray-200"
                    >
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                    </button>

                    {showOptions && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={closeOptions}
                            ></div>
                            <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg z-20 py-1">
                                <button
                                    onClick={handleRename}
                                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                >
                                    <PencilIcon className="h-4 w-4 mr-2" />
                                    <span>Renombrar</span>
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left px-3 py-2 rounded-md"
                                >
                                    <ShareIcon className="h-4 w-4" />
                                    Compartir
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
                currentName={folder.name}
                type="folder"
            />

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                type="folder"
            />

            <ShareModal
                isOpen={showShareModal}
                onClose={() => {
                    setShowShareModal(false);
                    // Actualizar el almacenamiento cuando se cierra el modal
                    if (onRefetchStorage) {
                        console.log(
                            'Actualizando almacenamiento después de cerrar modal de compartir'
                        );
                        onRefetchStorage();
                    }
                }}
                urls={shareUrls}
                type="folder"
                title={folder.name}
            />
        </>
    );
};
