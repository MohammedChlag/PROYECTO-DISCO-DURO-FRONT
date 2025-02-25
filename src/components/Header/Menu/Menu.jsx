import { Button } from '../../Button.jsx';
import { Icon } from '../../Icon.jsx';
import { NavList } from './NavList.jsx';

import menuList from '../../../mocks/menu.json';

export const Menu = () => {
    return (
        <>
            <Button>
                <Icon name="menu" />
            </Button>
            <NavList className="menu hidden" list={menuList} />
        </>
    );
};
