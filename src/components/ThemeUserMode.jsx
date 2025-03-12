import { MoonIcon as MoonSolid, SunIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../utils/helpers.js';

export const ThemeUserMode = () => {
    const [theme, setTheme] = useState(
        getFromLocalStorage('DbTheme') || 'light'
    );
    const [isChecked, setIsChecked] = useState(theme === 'dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }

        setToLocalStorage('DbTheme', theme);

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
        setIsChecked((prev) => !prev);
    };

    return (
        <div>
            <button
                onClick={handleChangeTheme}
                className={`relative inline-flex h-6 w-12 items-center rounded-full ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-[#009EB5]'
                } dark:bg-[#676767] absolute top-7 md:top-8 border-black border-2 dark:border-white`}
                role="switch"
                aria-checked={isChecked}
            >
                <span className="sr-only">Theme mode</span>
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        theme === 'dark'
                            ? 'translate-x-6 flex items-center justify-center'
                            : 'translate-x-0 flex items-center justify-center'
                    }`}
                >
                    {theme === 'dark' ? (
                        <MoonSolid
                            className="size-4 fill-black"
                            aria-hidden="true"
                        />
                    ) : (
                        <SunIcon
                            className="size-4 fill-yellow-500"
                            aria-hidden="true"
                        />
                    )}
                </span>
            </button>
        </div>
    );
};

// {theme === 'dark' ? (
//     <MoonSolid
//         className="size-4 fill-yellow-500"
//         aria-hidden="true"
//     />
// ) : (
//     <SunIcon className="size-4" aria-hidden="true" />
// )}
// </span>
