import { Link } from 'react-router-dom';

export const SidebarButton = ({ icon: Icon, label, onClick, isActive, to }) => {
    const ButtonContent = (
        <>
            <Icon className="h-5 w-5 mr-2" />
            <span>{label}</span>
        </>
    );

    const baseClasses = `
    flex items-center w-full px-4 py-3 text-left 
    rounded-lg transition-colors duration-200
    ${
        isActive
            ? 'bg-[#e6f7fa] text-[#00B4D8] font-medium'
            : 'text-gray-700 hover:bg-gray-100'
    }
  `;

    if (to) {
        return (
            <Link to={to} className={baseClasses}>
                {ButtonContent}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            {ButtonContent}
        </button>
    );
};
