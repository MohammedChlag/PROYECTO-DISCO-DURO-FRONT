import { ToastContainer } from 'react-toastify';
import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';
import { Outlet } from 'react-router-dom';
import { Boundary } from '../../services/ErrorBoundary.jsx';

export const LayoutPublic = () => {
    return (
        <>
            <Header />
            <Boundary>
                <main>
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
