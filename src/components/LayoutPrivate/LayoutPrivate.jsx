import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer } from '../LayoutPublic/Footer.jsx';
import { Header } from './Header.jsx';

export const LayoutPrivate = () => {
    return (
        <>
            <Header />

            <main className="flex-1 relative">
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
