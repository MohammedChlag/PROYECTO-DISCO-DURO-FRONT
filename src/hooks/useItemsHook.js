import { useState } from 'react';
import { toast } from 'react-toastify';
import { useStorageHook } from './useStorageHook.js';
import { renameStorageItemService } from '../services/fetchApi.js';
import { useAuthHook } from './useAuthHook.js';

export const useItemsHook = (item, type = 'file') => {
    const { refetchStorage } = useStorageHook();
    const { token } = useAuthHook();
    const [showOptions, setShowOptions] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);

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

            const newStorage = await refetchStorage();
            setShowRenameModal(false);
            toast.success(message);
        } catch (error) {
            toast.error(error.message || 'Error al renombrar el elemento');
        }
    };

    const handleShare = () => {
        console.log('Compartir', item.name);
        closeOptions();
    };

    const handleDelete = () => {
        console.log('Eliminar', item.name);
        closeOptions();
    };

    const handleDownload = () => {
        if (type === 'file') {
            console.log('Descargar', item.name);
            closeOptions();
        }
    };

    return {
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
    };
};
