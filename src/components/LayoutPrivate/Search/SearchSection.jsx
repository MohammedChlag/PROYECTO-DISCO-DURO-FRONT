import { Archivo } from '../../Storage/Archivo.jsx';
import { Carpeta } from '../../Storage/Carpeta.jsx';

export const SearchSection = ({ results, onFolderClick }) => {
    console.log('SearchSection recibió resultados:', results);

    if (!results || results.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No se encontraron resultados
            </div>
        );
    }

    // Filtrar por el type que viene del backend
    const folders = results.filter((item) => item.type === 'folder');
    const files = results.filter((item) => item.type === 'file');

    console.log('Carpetas encontradas:', folders);
    console.log('Archivos encontrados:', files);

    return (
        <div className="space-y-6 px-4">
            {folders.length > 0 && (
                <section>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
                        Carpetas ({folders.length})
                    </h2>
                    <div className="space-y-2">
                        {folders.map((folder) => (
                            <Carpeta
                                key={folder.id}
                                folder={folder}
                                onFolderClick={onFolderClick}
                            />
                        ))}
                    </div>
                </section>
            )}

            {files.length > 0 && (
                <section>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
                        Archivos ({files.length})
                    </h2>
                    <div className="space-y-2">
                        {files.map((file) => (
                            <Archivo key={file.id} file={file} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
