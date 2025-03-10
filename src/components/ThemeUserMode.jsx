
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
        setIsChecked((prev) => !prev)
    };

    return (
        <div className="absolute top-2 right-6 z-50">
          <button
            onClick={handleChangeTheme}
            className={`relative inline-flex h-8 w-14 items-center rounded-full ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-[#009EB5]'
            } dark:bg-[#676767]`}
            role="switch"
            aria-checked={isChecked}
          >
            <span className="sr-only">Theme mode</span>
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition duration-200 ease-in-out ${
                theme === 'dark' ? 'translate-x-7 flex items-center justify-center' : 'translate-x-1 flex items-center justify-center'
              }`}
            >
              {theme === 'dark' ? (
                <SunIcon className="size-4 fill-yellow-500" aria-hidden="true" />
              ) : (
                <MoonSolid className="size-4" aria-hidden="true" />
              )}
            </span>
          </button>
        </div>
      );
    };