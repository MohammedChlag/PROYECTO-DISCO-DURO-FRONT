import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileOptions } from './ProfileOptions.jsx';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { Icon } from '../Icon.jsx';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export const ProfileMenu = () => {
    const navigate = useNavigate();
    const { onLogout, currentUser } = useAuthHook();
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

    useEffect(() => {
        console.log('Current User:', currentUser);
    }, [currentUser]);

    // Construir la URL completa del avatar
    const avatarUrl =
        !avatarError && currentUser?.avatar
            ? `/uploads/${currentUser.id}/avatars/${currentUser.avatar}`
            : null;

    useEffect(() => {
        console.log('Avatar URL:', avatarUrl);
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
        {
            label: 'Valorar Plataforma',
            onClick: () => {
                navigate('/assessments');
                setShowMenu(false);
            },
        },
        {
            label: 'Cerrar sesión',
            onClick: () => {
                navigate('/users/login');
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
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
            >
                {avatarUrl && !avatarError ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar del usuario"
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                        onError={(e) => {
                            console.log('Error loading avatar:', e);
                            setAvatarError(true);
                            e.target.src = '/default-avatar.png';
                        }}
                    />
                ) : (
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                )}
                <Icon name="expand_more" className="text-gray-600" />
            </button>

            {showMenu && (
                <ProfileOptions
                    items={menuItems}
                    userAvatar={avatarUrl}
                    userName={currentUser?.name || 'Usuario'}
                />
            )}
        </div>
    );
};
