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
    renameStorageItemService,
    deleteStorageItemService,
    shareStorageItemService,
} from '../services/fetchApi.js';
import { toast } from 'react-toastify';
import { Boundary } from '../services/ErrorBoundary.jsx';

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

    const handleRenameItem = async (itemId, newName) => {
        try {
            const message = await renameStorageItemService(
                itemId,
                newName,
                token
            );
            await refetchStorage();
            toast.success(message);
        } catch (error) {
            toast.error(error.message || 'Error al renombrar');
        }
    };

    const handleDeleteItem = async (itemId, type) => {
        try {
            await deleteStorageItemService(itemId, type, token);
            await refetchStorage();
            toast.success('Elemento eliminado correctamente');
        } catch (error) {
            toast.error(error.message || 'Error al eliminar');
        }
    };

    const handleShareItem = async (itemId) => {
        try {
            const response = await shareStorageItemService(itemId, token);
            await refetchStorage();

            if (response && (response.url || response.download)) {
                toast.success('Elemento compartido correctamente');
                return response;
            } else {
                throw new Error('No se recibieron los enlaces de compartir');
            }
        } catch (error) {
            toast.error(error.message || 'Error al compartir');
            return null;
        }
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
                        <div className="flex flex-col w-full min-w-0">
                            <Boundary>
                                <nav className="flex items-start gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-white shadow-sm animate-fade text-sm sm:text-base">
                                    <TabButton
                                        active={activeTab === 'principal'}
                                        onClick={() =>
                                            setActiveTab('principal')
                                        }
                                    >
                                        Principal
                                    </TabButton>
                                    <TabButton
                                        active={activeTab === 'documentos'}
                                        onClick={() =>
                                            setActiveTab('documentos')
                                        }
                                    >
                                        Archivos
                                    </TabButton>
                                    <TabButton
                                        active={activeTab === 'compartidos'}
                                        onClick={() =>
                                            setActiveTab('compartidos')
                                        }
                                    >
                                        Compartidos
                                    </TabButton>
                                </nav>
                            </Boundary>
                            <Boundary>
                                <div className="flex flex-col min-w-0 gap-4 py-3 mt-2 px-4 sm:px-6 lg:px-8">
                                    {activeTab !== 'documentos' && (
                                        <FolderSection
                                            folders={filteredContent.folders}
                                            loading={loading}
                                            onFolderClick={handleFolderClick}
                                            onRename={handleRenameItem}
                                            onDelete={handleDeleteItem}
                                            onShare={handleShareItem}
                                        />
                                    )}
                                    <DocumentsSection
                                        documents={filteredContent.documents}
                                        loading={loading}
                                        error={error}
                                        onRename={handleRenameItem}
                                        onDelete={handleDeleteItem}
                                        onShare={handleShareItem}
                                    />
                                </div>
                            </Boundary>
                        </div>
                    )}

                    {/* Contenido según el estado */}
                    {selectedFolderId && (
                        <FolderPage
                            folderId={selectedFolderId}
                            storage={storage}
                            loading={loading}
                            error={error}
                            onBack={handleBack}
                            onUpload={handleUpload}
                        />
                    )}
                </>
            )}

            {/* Botón de acción flotante */}
            <Boundary>
                <aside className="fixed bottom-16 right-4 sm:bottom-28 sm:right-8 z-50">
                    <ActionButton
                        onClick={() => setShowActionMenu(!showActionMenu)}
                    />
                    <ActionMenu
                        show={showActionMenu}
                        onClose={() => setShowActionMenu(false)}
                        onUpload={handleUpload}
                        onCreateFolder={handleCreateFolder}
                        className="absolute bottom-12 right-10 sm:bottom-14 sm:right-12"
                    />
                </aside>
            </Boundary>

            {/* Modales y elementos ocultos */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <Boundary>
                <CreateFolderModal
                    isOpen={showCreateFolderModal}
                    onClose={() => setShowCreateFolderModal(false)}
                    onCreateFolder={handleCreateFolderSubmit}
                />
            </Boundary>
        </>
    );
};
