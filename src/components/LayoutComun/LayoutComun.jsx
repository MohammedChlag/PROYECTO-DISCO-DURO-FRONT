import { Header } from '../Header/Header.jsx';
import { Footer } from './Footer.jsx';

export const LayoutComun = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <Footer />
        </div>
    );
};
