import { useMemo, useState } from 'react';
import { useStorageHook } from '../hooks/useStorageHook.js';
import { TabButton } from '../components/LayoutPrivate/TabButton.jsx';
import { FolderSection } from '../components/LayoutPrivate/FolderSection.jsx';
import { DocumentsSection } from '../components/LayoutPrivate/DocumentsSection.jsx';
import { ActionButton } from '../components/LayoutPrivate/ActionButton.jsx';
import { ActionMenu } from '../components/LayoutPrivate/ActionMenu.jsx';

export const HomePage = () => {
    const { storage, error, loading } = useStorageHook();
    const [activeTab, setActiveTab] = useState('principal');
    const [showActionMenu, setShowActionMenu] = useState(false);

    const filteredContent = useMemo(() => {
        if (!storage) return { folders: [], documents: [] };

        const filterByTab = (items) => {
            switch (activeTab) {
                case 'compartidos':
                    return items.filter((item) => item.shareToken);
                case 'documentos':
                    return items.filter((item) => item.type === 'file');
                default:
                    return items;
            }
        };

        const folders = storage.filter((item) => item.type === 'folder');
        const documents = storage.filter((item) => item.type === 'file');

        return {
            folders: filterByTab(folders),
            documents: filterByTab(documents),
        };
    }, [storage, activeTab]);

    const handleUpload = () => {
        console.log('Subir Archivo');
    };

    const handleCreateFolder = () => {
        console.log('Crear Carpeta');
    };

    return (
        <>
            <nav>
                <ul className="flex space-x-2 sm:space-x-8 size-10 sm:px-0 whitespace-nowrap">
                    <li>
                        <TabButton
                            active={activeTab === 'principal'}
                            onClick={() => setActiveTab('principal')}
                        >
                            Principal
                        </TabButton>
                    </li>
                    <li>
                        <TabButton
                            active={activeTab === 'documentos'}
                            onClick={() => setActiveTab('documentos')}
                        >
                            Documentos
                        </TabButton>
                    </li>
                    <li>
                        <TabButton
                            active={activeTab === 'compartidos'}
                            onClick={() => setActiveTab('compartidos')}
                        >
                            Compartidos
                        </TabButton>
                    </li>
                </ul>
            </nav>

            <FolderSection
                folders={filteredContent.folders}
                loading={loading}
            />
            <DocumentsSection
                documents={filteredContent.documents}
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
                    onUpload={handleUpload}
                    onCreateFolder={handleCreateFolder}
                />
            </aside>
        </>
    );
};
