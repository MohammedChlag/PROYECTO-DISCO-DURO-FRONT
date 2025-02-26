import { Footer } from './Footer/Footer.jsx';
import { Header } from './Header/Header.jsx';

export const LayoutComun = ({ children }) => {
    return (
        <>
            <Header />
            <main className="flex flex-col flex-grow-1 items-center justify-center p-4">
                {children}
            </main>
            <Footer />
        </>
    );
};
