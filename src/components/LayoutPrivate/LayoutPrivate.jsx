import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer } from '../LayoutPublic/Footer.jsx';
import { Header } from '../LayoutPublic/Header.jsx';

export const LayoutPrivate = () => {
    return (
        <>
            <Header />

            <main className="flex-1 relative max-w-screen-lg mx-auto px-2 sm:px-4 py-6">
                <Outlet />
            </main>
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
