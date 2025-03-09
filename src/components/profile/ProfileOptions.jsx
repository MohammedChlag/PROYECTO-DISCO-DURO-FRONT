import { UserCircleIcon } from '@heroicons/react/24/solid';

export const ProfileOptions = ({ items, userAvatar, userName, isAdmin }) => {
    return (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-[#000000] ring-1 ring-black ring-opacity-5 dark:ring-gray-600">
            {/* Cabecera del usuario */}
            <div className="p-4 border-b dark:border-gray-600">
                <div className="flex items-center space-x-3">
                    {userAvatar ? (
                        <img
                            src={userAvatar}
                            alt="Avatar del usuario"
                            className={`h-10 w-10 rounded-full object-cover ring-2 ${
                                isAdmin ? 'ring-red-500' : 'ring-white'
                            }`}
                            onError={(e) => {
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                    ) : (
                        <UserCircleIcon
                            className={`h-10 w-10 ${
                                isAdmin ? 'text-red-500' : 'text-gray-400'
                            }`}
                        />
                    )}
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {userName}
                        </p>
                        {isAdmin && (
                            <p className="text-xs font-semibold text-red-500">
                                Administrador
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Menú de opciones */}
            <div className="py-1">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.onClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#323232] hover:text-gray-900"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
