import { useMemo, useRef, useState, useEffect } from 'react';
import { useStorageHook } from '../hooks/useStorageHook.js';
import { TabButton } from '../components/LayoutPrivate/TabButton.jsx';
import { FolderSection } from '../components/LayoutPrivate/FolderSection.jsx';
import { DocumentsSection } from '../components/LayoutPrivate/DocumentsSection.jsx';
import { ActionButton } from '../components/LayoutPrivate/ActionButton.jsx';
import { ActionMenu } from '../components/LayoutPrivate/ActionMenu.jsx';
import { CreateFolderModal } from '../components/LayoutPrivate/CreateFolderModal.jsx';
import { FolderPage } from './FolderPage.jsx';
import { useAuthHook } from '../hooks/useAuthHook.js';
import {
    uploadFileService,
    createFolderService,
} from '../services/fetchApi.js';
import { toast } from 'react-toastify';

export const HomePage = () => {
    const { storage, error, loading, refetchStorage } = useStorageHook();
    const [activeTab, setActiveTab] = useState('principal');
    const [showActionMenu, setShowActionMenu] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const fileInputRef = useRef(null);
    const { token } = useAuthHook();

    useEffect(() => {}, [storage]);

    const filteredContent = useMemo(() => {
        if (!storage || !Array.isArray(storage)) {
            return { folders: [], documents: [] };
        }

        const { folders, documents } = storage.reduce(
            (acc, item) => {
                if (item.type === 'folder') {
                    acc.folders.push({ ...item });
                } else if (item.type === 'file') {
                    acc.documents.push({ ...item });
                }
                return acc;
            },
            { folders: [], documents: [] }
        );

        switch (activeTab) {
            case 'compartidos':
                return {
                    folders: folders.filter((item) => item.shareToken),
                    documents: documents.filter((item) => item.shareToken),
                };
            case 'documentos':
                return {
                    folders: [],
                    documents,
                };
            case 'principal':
                return {
                    folders,
                    documents: documents.filter((doc) => !doc.folderId),
                };
            default:
                return { folders, documents };
        }
    }, [storage, activeTab]);

    const handleUpload = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const folderName = selectedFolderId
                ? storage.find((item) => {
                      return item.id === selectedFolderId;
                  })?.name
                : null;

            const uploadedFile = await uploadFileService(
                file,
                token,
                folderName
            );

            await refetchStorage();

            setShowActionMenu(false);
            toast.success('Archivo subido correctamente');
        } catch (error) {
            toast.error(error.message || 'Error al subir archivo');
        }
        e.target.value = '';
    };

    const handleCreateFolder = () => {
        setShowCreateFolderModal(true);
        setShowActionMenu(false);
    };

    const handleCreateFolderSubmit = async (folderName) => {
        try {
            await createFolderService(folderName, token);
            await refetchStorage();
            setShowCreateFolderModal(false);
            toast.success('Carpeta creada correctamente');
        } catch (error) {
            toast.error(error.message || 'Error al crear la carpeta');
        }
    };

    const handleFolderClick = (folderId) => {
        setSelectedFolderId(folderId);
    };

    const handleBack = () => {
        setSelectedFolderId(null);
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <CreateFolderModal
                isOpen={showCreateFolderModal}
                onClose={() => setShowCreateFolderModal(false)}
                onCreateFolder={handleCreateFolderSubmit}
            />

            {selectedFolderId ? (
                <FolderPage
                    folderId={selectedFolderId}
                    storage={storage}
                    loading={loading}
                    error={error}
                    onBack={handleBack}
                    onUpload={handleUpload}
                />
            ) : (
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

                    {activeTab === 'principal' && (
                        <>
                            <FolderSection
                                folders={filteredContent.folders}
                                loading={loading}
                                onFolderClick={handleFolderClick}
                            />
                            <DocumentsSection
                                documents={filteredContent.documents}
                                loading={loading}
                                error={error}
                            />
                        </>
                    )}
                    {activeTab === 'documentos' && (
                        <DocumentsSection
                            documents={filteredContent.documents}
                            loading={loading}
                            error={error}
                        />
                    )}
                    {activeTab === 'compartidos' && (
                        <>
                            <FolderSection
                                folders={filteredContent.folders}
                                loading={loading}
                                onFolderClick={handleFolderClick}
                            />
                            <DocumentsSection
                                documents={filteredContent.documents}
                                loading={loading}
                                error={error}
                            />
                        </>
                    )}

                    {activeTab !== 'compartidos' && (
                        <aside className="fixed bottom-16 sm:bottom-20 right-4 sm:right-8 z-40">
                            <ActionButton
                                onClick={() =>
                                    setShowActionMenu(!showActionMenu)
                                }
                            />
                            <ActionMenu
                                show={showActionMenu}
                                onClose={() => setShowActionMenu(false)}
                                onUpload={handleUpload}
                                onCreateFolder={
                                    activeTab === 'principal'
                                        ? handleCreateFolder
                                        : undefined
                                }
                            />
                        </aside>
                    )}
                </>
            )}
        </>
    );
};
