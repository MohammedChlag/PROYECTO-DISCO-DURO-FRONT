import {
    FolderIcon,
    PencilIcon,
    ShareIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { useItemsHook } from '../../hooks/useItemsHook.js';
import { RenameModal } from '../LayoutPrivate/Modals/RenameModal.jsx';
import { DeleteConfirmModal } from '../LayoutPrivate/Modals/DeleteConfirmModal.jsx';
import { ShareModal } from '../LayoutPrivate/Modals/ShareModal.jsx';

const truncateFolderName = (name, maxLength = 25) => {
    if (name.length <= maxLength) return name;
    return name.slice(0, maxLength - 3) + '...';
};

export const Carpeta = ({
    folder,
    onFolderClick,
    onRename,
    onDelete,
    onShare,
}) => {
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
    } = useItemsHook(folder, 'folder', { onDelete, onShare });

    console.log('Estado del modal en Carpeta:', { showShareModal, shareUrls });

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
    console.log();

    return (
        <>
            <li
                className="relative group flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                onClick={handleFolderClick}
            >
                <article className="flex items-center m-1 p-1">
                    <FolderIcon className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="font-medium mr-4" title={folder.name}>
                        {truncateFolderName(folder.name)}
                    </h3>
                    {folder.shareToken && (
                        <div className="flex items-center text-sm text-gray-500">
                            <UsersIcon className="h-4 w-4 mr-1" />
                        </div>
                    )}
                </article>

                <div className="folder-options">
                    <button
                        onClick={handleOptionsClick}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Opciones"
                    >
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                    </button>

                    {showOptions && (
                        <>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
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
                onClose={() => setShowShareModal(false)}
                urls={shareUrls}
                type="folder"
                title={folder.name}
            />
        </>
    );
};
