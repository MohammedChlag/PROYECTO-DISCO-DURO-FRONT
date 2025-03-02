import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

export const ActionButton = ({
    onClick,
    icon: Icon = CloudArrowUpIcon,
    label = 'Subir archivo',
    className = '',
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                p-3 sm:p-4 bg-cyan-400 text-white
                rounded-full shadow-lg
                hover:bg-[#0096b4]
                active:scale-95
                transition-all
                focus:outline-none focus:ring-2 focus:ring-[#67e8f9] focus:ring-offset-2
                z-90
                ${className}
            `}
            title={label}
        >
            <Icon className="h-6 sm:h-7 w-6 sm:w-7" />
        </button>
    );
};
