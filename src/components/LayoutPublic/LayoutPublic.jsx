import { ToastContainer } from 'react-toastify';
import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';
import { Outlet } from 'react-router-dom';

export const LayoutPublic = () => {
    return (
        <>
            <Header />
            <main className="flex-1 text-xs">
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
