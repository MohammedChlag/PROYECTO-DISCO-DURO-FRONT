import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

export const ThemeUserMode = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }

        return () => {
            if (theme === 'dark') {
                document.querySelector('html').classList.add('dark');
            } else {
                document.querySelector('html').classList.remove('dark');
            }
        };
    }, [theme]);

    const handleChangeTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="absolute top-2 right-6 size-1 z-50">
            <button
                onClick={handleChangeTheme}
                className="p-1 bg-[#009EB5] dark:bg-[#080808] hover:bg-[#009ec3] dark:hover:bg-[#4d4d4d] text-white rounded"
            >
                {theme === 'light' ? (
                    <MoonIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <SunIcon className="h-4 w-4" aria-hidden="true" />
                )}
            </button>
        </div>
    );
};

/* import React, { useEffect, useState } from 'react';

export const ThemeUserMode = () => {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html').classList.add('dark')
        } else {
            document.querySelector('html').classList.remove('dark')
        }
    }, [theme])

    const handleChangeTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <button
            onClick={handleChangeTheme}
            className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        >
            Modo
        </button>
    );
}; */
