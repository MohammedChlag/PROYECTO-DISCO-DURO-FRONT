import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer } from '../LayoutPublic/Footer.jsx';
import { Header } from './Header.jsx';

export const LayoutPrivate = () => {
    return (
        <>
            <Header />
            <main className="flex-1 text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <Outlet />
                    </div>
                </div>
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
