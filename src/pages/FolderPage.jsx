import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { DocumentsSection } from '../components/LayoutPrivate/DocumentsSection.jsx';
import { ActionButton } from '../components/LayoutPrivate/ActionButton.jsx';

export const FolderPage = ({
    folderId,
    storage,
    loading,
    error,
    onBack,
    onUpload,
}) => {
    const folderContent = useMemo(() => {
        if (!storage) return { documents: [] };

        return {
            documents: storage.filter(
                (item) => item.type === 'file' && item.folderId === folderId
            ),
        };
    }, [storage, folderId]);

    return (
        <section className="w-[90vw] px-4 sm:px-6 lg:px-8">
            {/* Navegación */}
            <nav className="flex items-center gap-4 my-4">
                <button
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeftIcon className="size-6" />
                </button>
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    {storage?.find((item) => item.id === folderId)?.name ||
                        'Carpeta'}
                </h1>
            </nav>

            {/* Sección de Documentos */}
            <DocumentsSection
                documents={folderContent.documents}
                loading={loading}
                error={error}
            />

            {/* Botón flotante para subir archivos */}
            <ActionButton
                onClick={onUpload}
                className="fixed bottom-20 right-4 sm:right-8 z-50"
            />
        </section>
    );
};
