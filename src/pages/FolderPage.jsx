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
            <nav className="m-4">
                <div className="flex items-center gap-4 relative">
                    <button
                        onClick={onBack}
                        className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeftIcon className="size-6" />
                    </button>
                    <h1 className="text-3xl font-semibold">
                        {storage?.find((item) => item.id === folderId)?.name ||
                            'Carpeta'}
                    </h1>
                    <div className="relative">
                        <ActionButton
                            onClick={() => setShowActionMenu(!showActionMenu)}
                        />
                        <ActionMenu
                            show={showActionMenu}
                            onClose={() => setShowActionMenu(false)}
                            onUpload={onUpload}
                            className="absolute top-full right-0 mt-2 shadow-xl"
                        />
                    </div>
                </div>
            </nav>
            <DocumentsSection
                documents={folderContent.documents}
                loading={loading}
                error={error}
            />
        </>
    );
};
