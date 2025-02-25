import { Footer } from './Footer/Footer.jsx';
import { Header } from './Header/Header.jsx';

export const LayoutComun = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};
