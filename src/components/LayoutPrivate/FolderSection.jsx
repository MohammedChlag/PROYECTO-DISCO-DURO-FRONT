import { Carpeta } from '../Storage/Carpeta';

export const FolderSection = ({ folders = [], loading, onFolderClick }) => {
    if (loading) {
        return (
            <section className="flex items-center justify-center py-4 sm:py-6">
                <p className="animate-pulse text-gray-500" role="status">
                    Cargando carpetas...
                </p>
            </section>
        );
    }

    if (!folders.length) {
        return (
            <section className="bg-gray-50 rounded-lg py-4 sm:py-6 ml-1">
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
                    Carpetas
                </h2>
                <p className="text-center text-gray-500">
                    No hay carpetas para mostrar
                </p>
            </section>
        );
    }

    return (
        <section className="bg-gray-50 rounded-lg px-4 mb-2 sm:py-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
                Carpetas
            </h2>
            <ul className="space-y-2 sm:space-y-3 list-none p-0">
                {folders.map((folder) => (
                    <Carpeta
                        key={folder.id}
                        folder={folder}
                        onFolderClick={onFolderClick}
                    />
                ))}
            </ul>
        </section>
    );
};
