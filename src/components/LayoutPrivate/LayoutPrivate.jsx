import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer } from '../LayoutPublic/Footer.jsx';
import { Header } from './Header.jsx';

export const LayoutPrivate = () => {
    return (
        <>
            <Header />

            <main className="flex-1 px-2 sm:px-2 md:px-4 lg:px-6 py-2 sm:py-4 md:py-6">
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
