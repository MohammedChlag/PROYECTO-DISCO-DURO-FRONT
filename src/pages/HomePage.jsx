import { useMemo, useRef, useState, useEffect } from 'react';
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
    const [activeTab, setActiveTab] = useState('principal');
    const [showActionMenu, setShowActionMenu] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
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

    const handleSearch = async (searchParams) => {
        console.log('handleSearch called with:', searchParams);

        // Si no hay query, limpiar resultados y mostrar todo
        if (!searchParams?.query?.trim()) {
            console.log('Empty query, showing all content');
            setSearchResults(null);
            setIsSearching(false);
            return;
        }

        try {
            setIsSearching(true);
            console.log('Calling searchStorageService...');

            // Extraer solo los parámetros válidos
            const validParams = {
                query: searchParams.query.trim(),
                token,
            };

            // Añadir parámetros opcionales solo si tienen valor
            if (searchParams.minSize)
                validParams.minSize = searchParams.minSize;
            if (searchParams.maxSize)
                validParams.maxSize = searchParams.maxSize;
            if (searchParams.orderBy)
                validParams.orderBy = searchParams.orderBy;
            if (searchParams.orderDirection)
                validParams.orderDirection = searchParams.orderDirection;

            console.log('Searching with params:', validParams);
            const results = await searchStorageService(validParams);

            console.log('Search results received:', results);
            setSearchResults(Array.isArray(results) ? results : []);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            toast.error('Error al realizar la búsqueda');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
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
            <SearchBar onSearch={handleSearch} />

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
                    {/* Navbar con tabs */}
                    <nav className="flex space-x-4 px-4 py-3 overflow-x-auto bg-white shadow-sm">
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
                        </>
                    )}

                    {/* Botón de acción flotante */}
                    <aside className="fixed bottom-16 right-4 sm:right-8 z-50">
                        <div className="relative">
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
                                className="absolute bottom-12 right-0"
                            />
                        </div>
                    </aside>
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
