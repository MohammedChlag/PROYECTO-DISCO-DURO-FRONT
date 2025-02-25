import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';

export const LayoutComun = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 items-center justify-center p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};
