import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './Header.jsx';
import { Boundary } from '../../services/ErrorBoundary.jsx';
import { Footer } from './Footer.jsx';

export const Layout = () => {
    const location = useLocation();

    // Determinar si estamos en una ruta privada
    const isPrivateRoute = [
        '/storage',
        '/profile',
        '/aboutUs',
        '/assessments',
        '/admin/users',
    ].some((route) => location.pathname.startsWith(route));

    // Determinar las clases CSS para el main según la ruta
    const mainClasses = isPrivateRoute
        ? 'flex-1 relative w-full max-w-screen-lg mx-auto px-2 sm:px-4 py-6'
        : '';

    return (
        <>
            <Header />
            <Boundary>
                <main className={mainClasses}>
                    <Outlet />
                </main>
            </Boundary>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};
