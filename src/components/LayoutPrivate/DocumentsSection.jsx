import { Archivo } from '../Storage/Archivo';

const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const DocumentsSection = ({ documents = [], loading, error }) => {
    if (loading) {
        return (
            <section className="flex items-center justify-center py-4 sm:py-6">
                <p className="animate-pulse text-gray-500" role="status">
                    Cargando documentos...
                </p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex items-center justify-center py-4 sm:py-6">
                <p className="text-red-500" role="alert">
                    Error al cargar los documentos: {error.message}
                </p>
            </section>
        );
    }

    return (
        <section className="bg-gray-50 rounded-lg py-4 sm:py-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 ml-1">
                Documentos
            </h2>

            {/* Lista de documentos */}
            {!documents.length ? (
                <section className="bg-gray-50 rounded-lg py-4 sm:py-6">
                    <p className="text-gray-500 text-center">
                        No hay documentos para mostrar
                    </p>
                </section>
            ) : (
                <ul className="space-y-2 sm:space-y-3 list-none p-0">
                    {documents.map((doc) => (
                        <li key={doc.id}>
                            <Archivo file={doc} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
