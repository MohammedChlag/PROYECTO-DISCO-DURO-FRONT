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
                fixed bottom-20 left-4 sm:bottom-18 sm:left-6
                p-3 sm:p-4 bg-[#00b4d8] text-white
                rounded-full shadow-lg
                hover:bg-[#0096b4]
                active:scale-95
                transition-all
                focus:outline-none focus:ring-2 focus:ring-[#67e8f9] focus:ring-offset-2
                z-50
                ${className}
            `}
            title={label}
        >
            <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
        </button>
    );
};
