import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { DocumentsSection } from '../components/LayoutPrivate/DocumentsSection.jsx';
import { ActionButton } from '../components/LayoutPrivate/ActionButton.jsx';
import { ActionMenu } from '../components/LayoutPrivate/ActionMenu.jsx';

export const FolderPage = ({
    folderId,
    storage,
    loading,
    error,
    onBack,
    onUpload,
}) => {
    const [showActionMenu, setShowActionMenu] = useState(false);

    const folderContent = useMemo(() => {
        if (!storage) return { documents: [] };

        return {
            documents: storage.filter(
                (items) => items.type === 'file' && items.folderId === folderId
            ),
        };
    }, [storage, folderId]);

    return (
        <>
            <nav className="flex items-center m-4 justify-between">
                <button
                    onClick={onBack}
                    className=" flex items-center text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeftIcon className="size-6 mr-2" />
                    <span>Volver</span>
                </button>
                <h1 className="ml-4 text-3xl font-semibold">
                    {storage?.find((item) => item.id === folderId)?.name ||
                        'Carpeta'}
                </h1>
            </nav>
            <DocumentsSection
                documents={folderContent.documents}
                loading={loading}
                error={error}
            />
            <aside className="fixed bottom-16 sm:bottom-20 right-4 sm:right-8 z-40">
                <ActionButton
                    onClick={() => setShowActionMenu(!showActionMenu)}
                />
                <ActionMenu
                    show={showActionMenu}
                    onClose={() => setShowActionMenu(false)}
                    onUpload={onUpload}
                />
            </aside>
        </>
    );
};
