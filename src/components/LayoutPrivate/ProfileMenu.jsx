import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { Icon } from '../Icon.jsx';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { ProfileOptions } from './ProfileOptions.jsx';

export const ProfileMenu = () => {
    const navigate = useNavigate();
    const { onLogout, currentUser, isAdmin } = useAuthHook();
    const [showMenu, setShowMenu] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {}, [currentUser]);

    // Construir la URL completa del avatar
    const avatarUrl =
        !avatarError && currentUser?.avatar
            ? `/uploads/${currentUser.id}/avatars/${currentUser.avatar}`
            : null;

    useEffect(() => {
        // Resetear el error cuando cambia la URL
        setAvatarError(false);
    }, [avatarUrl]);

    const menuItems = [
        {
            label: 'Editar perfil',
            onClick: () => {
                navigate('/profile');
                setShowMenu(false);
            },
        },
        // Opción solo visible para administradores
        ...(isAdmin
            ? [
                  {
                      label: 'Listar Usuarios',
                      onClick: () => {
                          navigate('/admin/users');
                          setShowMenu(false);
                      },
                  },
              ]
            : []),
        {
            label: 'Valoraciones',
            onClick: () => {
                navigate('/assessments');
                setShowMenu(false);
            },
        },
        {
            label: 'About',
            onClick: () => {
                navigate('/About');
                setShowMenu(false);
            },
        },
        {
            label: 'Cerrar sesión',
            onClick: () => {
                navigate('/');
                onLogout();
                setShowMenu(false);
            },
        },
    ];

    // Si no hay usuario, mostrar el icono por defecto
    if (!currentUser) {
        return (
            <div className="relative z-40">
                <div className="flex items-center space-x-2">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-40" ref={menuRef}>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className={`flex items-center space-x-2 focus:outline-none focus:ring-2 ${
                    isAdmin ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } focus:ring-offset-2 rounded-full`}
            >
                {avatarUrl && !avatarError ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar del usuario"
                        className={`h-8 w-8 rounded-full object-cover ${
                            isAdmin
                                ? 'ring-2 ring-red-500'
                                : 'ring-2 ring-white'
                        }`}
                        onError={(e) => {
                            setAvatarError(true);
                        }}
                    />
                ) : (
                    <UserCircleIcon
                        className={`h-8 w-8 ${
                            isAdmin ? 'text-red-500' : 'text-gray-400'
                        }`}
                    />
                )}
                {isAdmin && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
                <Icon name="expand_more" className="text-gray-600" />
            </button>

            {showMenu && (
                <ProfileOptions
                    items={menuItems}
                    userAvatar={avatarUrl}
                    userName={currentUser?.username || 'Usuario'}
                />
            )}
        </div>
    );
};
