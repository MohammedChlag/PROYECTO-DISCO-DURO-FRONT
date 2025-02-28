import { Logo } from '../Logo.jsx';
import { ProfileMenu } from './ProfileMenu.jsx';

export const Header = () => {
    return (
        <header className="flex items-center justify-between w-[90vw] mx-auto gap-3 border-b-2 border-black py-4 h-15">
            <Logo />
            <ProfileMenu />
        </header>
    );
};
