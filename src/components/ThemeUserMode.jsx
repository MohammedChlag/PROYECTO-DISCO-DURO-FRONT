import { MoonIcon as MoonSolid, SunIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

export const ThemeUserMode = () => {
    const [theme, setTheme] = useState('light');
    const [isChecked, setIsChecked] = useState(theme === 'dark');

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
        setIsChecked((prev) => !prev);
    };

    return (
        <div className="absolute top-3 left-[30vw] sm:top-4 z-50">
            <button
                onClick={handleChangeTheme}
                className={`relative inline-flex h-6 w-12 items-center rounded-full ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-[#009EB5]'
                } dark:bg-[#676767]`}
                role="switch"
                aria-checked={isChecked}
            >
                <span className="sr-only">Theme mode</span>
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        theme === 'dark'
                            ? 'translate-x-7 flex items-center justify-center'
                            : 'translate-x-1 flex items-center justify-center'
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
