// Estados, hooks y referencias
import { useMemo, useRef, useState } from 'react';
import { useAuthHook } from '../hooks/useAuthHook.js';
import { useStorageHook } from '../hooks/useStorageHook.js';
// Nav, sections y modals
import { TabButton } from '../components/LayoutPrivate/TabButton.jsx';
import { SearchBar } from '../components/LayoutPrivate/Search/SearchBar.jsx';
import { FolderSection } from '../components/LayoutPrivate/FolderSection.jsx';
import { DocumentsSection } from '../components/LayoutPrivate/DocumentsSection.jsx';
import { SearchSection } from '../components/LayoutPrivate/Search/SearchSection.jsx';
import { CreateFolderModal } from '../components/LayoutPrivate/Modals/CreateFolderModal.jsx';
// Botón acción
import { ActionButton } from '../components/LayoutPrivate/ActionButton.jsx';
import { ActionMenu } from '../components/LayoutPrivate/ActionMenu.jsx';
// Folderpage
import { FolderPage } from './FolderPage.jsx';
import { toast } from 'react-toastify';
// Services
import {
    uploadFileService,
    createFolderService,
    searchStorageService,
    renameStorageItemService,
    deleteStorageItemService,
} from '../services/fetchApi.js';
import { Boundary } from '../services/ErrorBoundary.jsx';

// Bienvenidos a la homepage :D
export const HomePage = () => {
    // llegados aquí significa que estas logueado al fin..
    const { token } = useAuthHook();
    // veamos que llevas de equipaje
    const { storage, error, loading, refetchStorage } = useStorageHook();
    // de todas manera te enseñare el layout
    const [activeTab, setActiveTab] = useState('principal');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [currentSearchQuery, setCurrentSearchQuery] = useState('');
    const [showActionMenu, setShowActionMenu] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const fileInputRef = useRef(null);
    // filtramos el storage con useMemo
    const filteredContent = useMemo(() => {
        // primer condicial, sencillo para coger ritmo
        if (!storage || !Array.isArray(storage)) {
            return { folders: [], documents: [] };
        }

        // supongamos que llevas algo, .reduce acc folder e items de una
        const { folders, documents } = storage.reduce(
            (acc, item) => {
                if (item.type === 'folder') {
                    acc.folders.push({ ...item });
                } else if (item.type === 'file') {
                    acc.documents.push({ ...item });
                }
                return acc;
            },
            // aquí ya habre dividio el sotarage en dos :P
            { folders: [], documents: [] }
        );

        // no me gustan los elsif infinitos, swithc es más elegante
        switch (activeTab) {
            // no debería explicarlo pero bueno
            case 'compartidos':
                // aquí se filtran las carpetas o archivos compartidos
                return {
                    folders: folders.filter((item) => item.shareToken),
                    documents: documents.filter((item) => item.shareToken),
                };
            // en caso de documents 'pestaña archivos'
            case 'documentos':
                // returno de documents
                return {
                    folders: [],
                    documents,
                };
            // en caso de la principal
            case 'principal':
                // se listan las carpetas y archivos en raíz !.folderId
                return {
                    folders,
                    documents: documents.filter((doc) => !doc.folderId),
                };
            default:
                return { folders, documents };
        }
        // aqui termina el memo, por si no sabían useMemo cachea,
        // si storage no cambia no ejecuta la función de nuevo
    }, [storage, activeTab]);

    // Ahora veamos este bonito handler
    const handleSearch = async ({ query }) => {
        // seteamos el estado
        setIsSearching(true);
        // Guardamos la query actual para poder reutilizarla
        setCurrentSearchQuery(query);
        // bloque try por si las moscas
        try {
            // esperamos la respuesta, mandamos query y token al srvs
            const response = await searchStorageService({
                query,
                token,
            });
            // seteamos con la respuesta
            setSearchResults(response);
        } catch (error) {
            // un poquito de debuguin XDDD
            console.error('Error searching:', error);
            toast.error('Error al buscar archivos');
        } finally {
            // me gusta el finaly
            setIsSearching(false);
        }
    };

    // este para la limpieza
    const handleClearSearch = () => {
        setSearchResults(null);
        setCurrentSearchQuery('');
    };

    // Función para actualizar los resultados de búsqueda
    const refreshSearchResults = async () => {
        if (searchResults && currentSearchQuery) {
            // Pequeña pausa para asegurar que el backend se ha actualizado
            setTimeout(async () => {
                setIsSearching(true);
                try {
                    const response = await searchStorageService({
                        query: currentSearchQuery,
                        token,
                    });
                    setSearchResults(response);
                } catch (error) {
                    console.error('Error al actualizar búsqueda:', error);
                } finally {
                    setIsSearching(false);
                }
            }, 300);
        }
    };

    // usamos la referencia del intup oculto
    // para simpular un click y se abra el selector
    const handleUpload = () => {
        fileInputRef.current.click();
    };

    // aqui se dispara el onChange
    const handleFileChange = async (e) => {
        // siempre assertive chicos
        const file = e.target.files[0];
        if (!file) return;

        // try catch para no morir
        try {
            // buscamos el nombre de la carpeta si esque tiene
            // aquí selectedFolderId es un estado, mas abajo su handler
            const folderName = selectedFolderId
                ? storage.find((item) => {
                      return item.id === selectedFolderId;
                  })?.name
                : null;

            // aqui service de subida
            await uploadFileService(file, token, folderName);
            // ahora un atajo del hook jeje
            await refetchStorage();
            // y un toast para que se sienta bien
            setShowActionMenu(false);
            toast.success('Archivo subido correctamente');
        } catch (error) {
            toast.error(error.message || 'Error al subir archivo');
        }
        // sin olvidarse de limpiar el input
        e.target.value = '';
    };

    // este handler se dispara desde el ActionMenu
    const handleCreateFolder = () => {
        // aqui se abre el modal y se cierra el menu
        setShowCreateFolderModal(true);
        setShowActionMenu(false);
    };

    // este submit de aqui completa el trabajo del modal desplegado arriba
    const handleCreateFolderSubmit = async (folderName) => {
        // puede recibir folder o no, (vease tambíen el modal)
        try {
            // aqui se crea el folder
            await createFolderService(folderName, token);
            await refetchStorage();
            // cerramos el modal y toast
            setShowCreateFolderModal(false);
            toast.success('Carpeta creada correctamente');
        } catch (error) {
            toast.error(error.message || 'Error al crear la carpeta');
        }
    };

    // este su nombre también lo dice todo
    const handleFolderClick = (folderId) => {
        // seteamos con la id que recibe
        setSelectedFolderId(folderId);
        // por si estaba buscando, setear y que acceda a la carpeta
        setSearchResults(null); // Limpiar los resultados de búsqueda
        setIsSearching(false); // Salir del modo búsqueda
    };

    // uno facilito, para volver al home desde carpeta
    const handleBack = () => {
        setSelectedFolderId(null);
    };

    // penultimo, se dispara desde la carpeta o archivo
    const handleRenameItem = async (itemId, newName) => {
        // el modal de renombrado se maneja desde el componente hijo (vease también)
        // recibe la id y el nuevo nombre
        try {
            // token id, y nombre al service
            const message = await renameStorageItemService(
                itemId,
                newName,
                token
            );
            await refetchStorage();

            // Actualizar resultados de búsqueda si es necesario
            await refreshSearchResults();

            // toast y listo
            toast.success(message);
        } catch (error) {
            toast.error(error.message || 'Error al renombrar');
        }
    };

    // a la hora de borrar, pasadas las comprobaciones del hijo
    const handleDeleteItem = async (itemId, type) => {
        // recibimos los params
        try {
            // token, id y tipo al service
            await deleteStorageItemService(itemId, type, token);
            await refetchStorage();

            // Actualizar resultados de búsqueda si es necesario
            await refreshSearchResults();

            // toast y listo
            toast.success('Elemento eliminado correctamente');
        } catch (error) {
            toast.error(error.details || 'Error al eliminar');
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
                        onDelete={handleDeleteItem}
                        onRename={handleRenameItem}
                        onRefetchStorage={refetchStorage}
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
                                            onRefetchStorage={refetchStorage}
                                        />
                                    )}
                                    <DocumentsSection
                                        documents={filteredContent.documents}
                                        loading={loading}
                                        error={error}
                                        onRename={handleRenameItem}
                                        onDelete={handleDeleteItem}
                                        onRefetchStorage={refetchStorage}
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
                            onRename={handleRenameItem}
                            onDelete={handleDeleteItem}
                            onRefetchStorage={refetchStorage}
                        />
                    )}
                </>
            )}

            {/* Botón de acción flotante - Solo visible cuando no hay carpeta seleccionada */}
            {!selectedFolderId && (
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
            )}

            {/* Botón de acción flotante - Solo visible cuando hay carpeta seleccionada */}
            {selectedFolderId && (
                <aside className="fixed bottom-16 right-4 sm:bottom-28 sm:right-8 z-50">
                    <ActionButton onClick={handleUpload} />
                </aside>
            )}

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
