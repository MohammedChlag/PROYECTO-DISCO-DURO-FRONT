import React from 'react';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';
import { Link } from 'react-router-dom';

export const NavItem = ({ item }) => {
    return (
        <li>
            <Link to={item.url}>
                <Button>
                    <Icon name={item.name} />
                    <span className="text">{item.text}</span>
                </Button>
            </Link>
        </li>
    );
};
