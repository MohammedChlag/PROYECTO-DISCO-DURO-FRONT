import { useState } from 'react';
import { toast } from 'react-toastify';
import { useStorageHook } from './useStorageHook.js';
import {
    renameStorageItemService,
    shareStorageItemService,
    deleteStorageItemService,
    downloadFileService,
} from '../services/fetchApi.js';
import { useAuthHook } from './useAuthHook.js';

export const useItemsHook = (item, type = 'file') => {
    const { refetchStorage } = useStorageHook();
    const { token } = useAuthHook();
    const [showOptions, setShowOptions] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [shareUrls, setShareUrls] = useState(null);

    const handleOptionsClick = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setShowOptions(!showOptions);
    };

    const closeOptions = () => {
        setShowOptions(false);
    };

    const handleRename = () => {
        setShowRenameModal(true);
        closeOptions();
    };

    const handleRenameSubmit = async (newName) => {
        try {
            const message = await renameStorageItemService(
                item.id,
                newName,
                token
            );

            await refetchStorage();
            setShowRenameModal(false);
            toast.success(message);
        } catch (error) {
            toast.error(error.message || 'Error al renombrar el elemento');
        }
    };

    const handleShare = async () => {
        try {
            const response = await shareStorageItemService(item.id, token);

            const urls =
                type === 'folder'
                    ? { share: response.url }
                    : { share: response.download }; // Para archivos, usamos la URL de descarga

            setShareUrls(urls);
            setShowShareModal(true);
            closeOptions();
        } catch (error) {
            toast.error(error.message || 'Error al compartir el elemento');
        }
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
        closeOptions();
    };

    const handleDeleteConfirm = async () => {
        try {
            const message = await deleteStorageItemService(
                item.id,
                type,
                token
            );
            await refetchStorage();
            setShowDeleteModal(false);
            toast.success(message);
        } catch (error) {
            toast.error(error.message || 'Error al eliminar el elemento');
        }
    };

    const handleDownload = async () => {
        if (type === 'file') {
            try {
                const message = await downloadFileService(item.id, token);
                closeOptions();
                toast.success(message);
            } catch (error) {
                toast.error(error.message || 'Error al descargar el archivo');
            }
        }
    };

    return {
        showOptions,
        showRenameModal,
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
        showShareModal,
        setShowShareModal,
        shareUrls,
    };
};
