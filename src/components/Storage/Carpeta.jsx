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
import { ShareModal } from '../LayoutPrivate/Modals/ShareModal';
import { DeleteConfirmModal } from '../LayoutPrivate/Modals/DeleteConfirmModal';

const truncateFolderName = (name, maxLength = 25) => {
    if (name.length <= maxLength) return name;
    return name.slice(0, maxLength - 3) + '...';
};

export const Carpeta = ({ folder, onFolderClick }) => {
    const {
        showOptions,
        showRenameModal,
        showShareModal,
        showDeleteModal,
        setShowDeleteModal,
        setShowShareModal,
        shareUrls,
        handleOptionsClick,
        closeOptions,
        handleRename,
        handleRenameSubmit,
        setShowRenameModal,
        handleShare,
        handleDelete,
        handleDeleteConfirm,
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
                className="relative group flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
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
                onSubmit={handleRenameSubmit}
                currentName={folder.name}
                type="folder"
            />
            {showShareModal && (
                <ShareModal
                    isOpen={showShareModal}
                    onClose={() => setShowShareModal(false)}
                    urls={shareUrls}
                    type="folder"
                />
            )}
            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                type="folder"
            />
        </>
    );
};
