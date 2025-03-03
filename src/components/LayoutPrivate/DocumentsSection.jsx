import { Archivo } from '../Storage/Archivo';

export const DocumentsSection = ({ documents = [], loading, error }) => {
    if (loading) {
        return (
            <section className="flex items-center justify-center py-4 sm:py-6">
                <p className="animate-pulse text-gray-500" role="status">
                    Cargando archivos...
                </p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex items-center justify-center py-4 sm:py-6">
                <p className="text-red-500" role="alert">
                    Error al cargar los archivos: {error.message}
                </p>
            </section>
        );
    }

    return (
        <section className="bg-gray-50 rounded-lg px-4 sm:py-6">
            <h2 className="text-base sm:text-lg font-semibold mb-4">
                Archivos
            </h2>
            <div className="flex flex-col">
                {!documents.length ? (
                    <div className="flex flex-col">
                        <p className="text-gray-500">
                            No hay archivos para mostrar
                        </p>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                        {documents.map((doc) => (
                            <Archivo key={doc.id} file={doc} />
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};
