import { Button } from '../../../Button.jsx';
import { Icon } from '../../../Icon.jsx';
import { NavList } from './NavList.jsx';

import menuList from '../../../../mocks/menu.json';

export const Menu = () => {
    const handleClick = () => {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('hidden');
    };
    return (
        <>
            <Button id="menu" handleClick={handleClick}>
                <Icon name="menu" />
            </Button>
            <NavList className="menu hidden" list={menuList} />
        </>
    );
};
