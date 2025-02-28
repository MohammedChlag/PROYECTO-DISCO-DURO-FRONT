import { useAuthHook } from '../hooks/useAuthHook.js';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    const { currentUser } = useAuthHook();
    const redirectPath = currentUser ? '/storage' : '/';
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
                <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-4">
                    <div className="text-8xl font-bold text-cyan-400 mb-4">
                        404
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Oops! Página no encontrada
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Esta página está más perdida que el One Piece... Pero no
                        te preocupes, te devolvemos de vuelta en un click!.
                    </p>
                    <Link
                        to={redirectPath}
                        className="inline-block bg-cyan-400 text-white font-semibold px-6 py-3 rounded-md hover:bg-cyan-600 transition-colors duration-300"
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </>
    );
};
