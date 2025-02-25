import React from 'react';
import { Menu } from './Menu/Menu.jsx';

import './header.css';
export const Header = () => {
    return (
        <nav>
            <ul>
                <li>
                    <h2>Hackloud</h2>
                </li>
                <li>
                    <Menu />
                </li>
            </ul>
        </nav>
    );
};
