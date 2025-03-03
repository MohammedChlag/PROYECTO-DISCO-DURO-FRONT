import { useMemo, useRef, useState } from 'react';
import { useStorageHook } from '../hooks/useStorageHook.js';
import { TabButton } from '../components/LayoutPrivate/TabButton.jsx';
import { FolderSection } from '../components/LayoutPrivate/FolderSection.jsx';
import { DocumentsSection } from '../components/LayoutPrivate/DocumentsSection.jsx';
import { ActionButton } from '../components/LayoutPrivate/ActionButton.jsx';
import { ActionMenu } from '../components/LayoutPrivate/ActionMenu.jsx';
import { CreateFolderModal } from '../components/LayoutPrivate/Modals/CreateFolderModal.jsx';
import { SearchBar } from '../components/LayoutPrivate/Search/SearchBar.jsx';
import { SearchSection } from '../components/LayoutPrivate/Search/SearchSection.jsx';
import { FolderPage } from './FolderPage.jsx';
import { useAuthHook } from '../hooks/useAuthHook.js';
import {
    uploadFileService,
    createFolderService,
    searchStorageService,
} from '../services/fetchApi.js';
import { toast } from 'react-toastify';

export const HomePage = () => {
    const { storage, error, loading, refetchStorage } = useStorageHook();
    const { token } = useAuthHook();
    const [activeTab, setActiveTab] = useState('principal');
    const [showActionMenu, setShowActionMenu] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const fileInputRef = useRef(null);

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

    const handleSearch = async ({ query }) => {
        setIsSearching(true);
        try {
            const response = await searchStorageService({
                query,
                token,
            });
            setSearchResults(response);
        } catch (error) {
            console.error('Error searching:', error);
            toast.error('Error al buscar archivos');
        } finally {
            setIsSearching(false);
        }
    };

    const handleClearSearch = () => {
        setSearchResults(null);
    };

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

            await uploadFileService(file, token, folderName);

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
        setSearchResults(null); // Limpiar los resultados de búsqueda
        setIsSearching(false); // Salir del modo búsqueda
    };

    const handleBack = () => {
        setSelectedFolderId(null);
    };

    return (
        <>
            <SearchBar
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
            />

            {/* Contenido principal */}
            {isSearching ? (
                // Spinner de carga durante la búsqueda
                <div className="flex items-center justify-center p-4 md:p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : searchResults ? (
                // Vista de búsqueda
                <div className="mt-4 mb-4">
                    <SearchSection
                        results={searchResults}
                        onFolderClick={handleFolderClick}
                    />
                </div>
            ) : (
                // Vista normal (solo se muestra si no hay búsqueda)
                <>
                    {/* Mostrar el navbar solo si no hay una carpeta seleccionada */}
                    {!selectedFolderId && (
                        <nav className="flex gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 bg-white shadow-sm animate-fade text-sm sm:text-base">
                            <TabButton
                                active={activeTab === 'principal'}
                                onClick={() => setActiveTab('principal')}
                            >
                                Principal
                            </TabButton>
                            <TabButton
                                active={activeTab === 'documentos'}
                                onClick={() => setActiveTab('documentos')}
                            >
                                Archivos
                            </TabButton>
                            <TabButton
                                active={activeTab === 'compartidos'}
                                onClick={() => setActiveTab('compartidos')}
                            >
                                Compartidos
                            </TabButton>
                        </nav>
                    )}

                    {/* Contenido según el estado */}
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
                            <div className="flex flex-col gap-4 mt-2 w-[90vw] px-4 sm:px-6 lg:px-8">
                                {activeTab !== 'documentos' && (
                                    <FolderSection
                                        folders={filteredContent.folders}
                                        loading={loading}
                                        onFolderClick={handleFolderClick}
                                    />
                                )}
                                <DocumentsSection
                                    documents={filteredContent.documents}
                                    loading={loading}
                                    error={error}
                                />
                            </div>

                            {/* Botón de acción flotante */}
                            <aside className="fixed bottom-16 right-4 sm:bottom-28 sm:right-8 z-50">
                                <ActionButton
                                    onClick={() =>
                                        setShowActionMenu(!showActionMenu)
                                    }
                                />
                                <ActionMenu
                                    show={showActionMenu}
                                    onClose={() => setShowActionMenu(false)}
                                    onUpload={handleUpload}
                                    onCreateFolder={handleCreateFolder}
                                    className="absolute bottom-12 right-10 sm:bottom-14 sm:right-12"
                                />
                            </aside>
                        </>
                    )}
                </>
            )}

            {/* Modales y elementos ocultos */}
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
        </>
    );
};
