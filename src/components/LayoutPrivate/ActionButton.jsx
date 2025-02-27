import { PlusIcon } from '@heroicons/react/24/solid';

export const ActionButton = ({
    onClick,
    icon: Icon = PlusIcon,
    label = 'Agregar nuevo',
    className = '',
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                fixed bottom-20 right-4 sm:bottom-8 sm:right-8
                p-3 sm:p-4 bg-[#00b4d8] text-white
                rounded-full shadow-lg
                hover:bg-[#0096b4]
                active:scale-95
                transition-all
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                z-50
                ${className}
            `}
            title={label}
        >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
    );
};
