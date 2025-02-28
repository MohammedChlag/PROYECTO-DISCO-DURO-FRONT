import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-red-500">
                404 - Página no encontrada
            </h1>
            <p className="text-gray-600 mt-2">
                Lo sentimos, la página que buscas no existe.
            </p>
            <Link
                to="/"
                className="mt-4 px-4 py-2 bg-cyan-400 text-white rounded"
            >
                Volver al inicio
            </Link>
        </div>
    );
};
