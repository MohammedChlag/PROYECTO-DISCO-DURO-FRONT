import { Footer } from './Footer/Footer.jsx';
import { Header } from './Header/Header.jsx';

export const LayoutComun = ({ children }) => {
    return (
        <div clasName="flex-grow">
            <Header />
            <main className="flex flex-col items-center justify-center p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};
