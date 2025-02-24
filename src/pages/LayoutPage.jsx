import React from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutPage = () => {
    return (
        <>
            <h1>LayoutPage</h1>
            <Outlet />
        </>
    );
};
