import { NavItem } from './NavItem.jsx';

export const NavList = ({ className, list }) => {
    return (
        <nav className={className}>
            <ul>
                {list.map((item, index) => (
                    <NavItem key={index} item={item} />
                ))}
            </ul>
        </nav>
    );
};
