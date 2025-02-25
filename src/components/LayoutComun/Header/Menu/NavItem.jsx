import React from 'react';
import { Button } from '../../../Button.jsx';
import { Icon } from '../../../Icon.jsx';

export const NavItem = ({ item }) => {
    return (
        <li>
            <a href={item.url}>
                <Button>
                    <Icon name={item.name} />
                    <span className="text">{item.text}</span>
                </Button>
            </a>
        </li>
    );
};
