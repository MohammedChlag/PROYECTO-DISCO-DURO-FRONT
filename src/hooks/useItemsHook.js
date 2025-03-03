import { useState } from 'react';
import { toast } from 'react-toastify';
import { downloadFileService } from '../services/fetchApi.js';
import { useAuthHook } from './useAuthHook.js';

export const useItemsHook = (
    item,
    type = 'file',
    { onDelete, onShare } = {}
) => {
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

    const handleShare = async () => {
        try {
            console.log('1. Iniciando handleShare en hook para:', {
                id: item.id,
                type,
            });

            // Reiniciar estados
            setShareUrls(null);
            setShowShareModal(true);
            closeOptions();

            console.log('3. Estado inicial del modal:', { showShareModal });

            console.log('4. Llamando a onShare');
            const response = await onShare(item.id);
            console.log('5. Respuesta del servicio:', response);

            if (response?.status === 'ok') {
                const urls =
                    type === 'folder'
                        ? { url: response.url }
                        : { download: response.download };

                console.log('6. URLs transformadas:', urls);
                setShareUrls(urls);
                // Mantener el modal abierto
                setShowShareModal(true);

                console.log('7. Estado actualizado:', {
                    showShareModal: true,
                    shareUrls: urls,
                });
            } else {
                console.log('5.1 No hay respuesta válida del servicio');
                toast.error('Error al obtener el enlace de compartir');
                setShowShareModal(false);
            }
        } catch (error) {
            console.error('Error en handleShare:', error);
            toast.error(error.message || 'Error al compartir el elemento');
            setShowShareModal(false);
        }
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
        closeOptions();
    };

    const handleDeleteConfirm = async () => {
        try {
            await onDelete(item.id, type);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error al eliminar:', error);
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
        handleDownload,
    };
};
