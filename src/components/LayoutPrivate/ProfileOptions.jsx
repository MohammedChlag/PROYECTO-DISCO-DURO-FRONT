import { UserCircleIcon } from '@heroicons/react/24/solid';

export const ProfileOptions = ({ items, userAvatar, userName }) => {
    return (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {/* Cabecera del usuario */}
            <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                    {userAvatar ? (
                        <img
                            src={userAvatar}
                            alt="Avatar del usuario"
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            onError={(e) => {
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                    ) : (
                        <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    )}
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            {userName}
                        </p>
                    </div>
                </div>
            </div>

            {/* Menú de opciones */}
            <div className="py-1">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.onClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
