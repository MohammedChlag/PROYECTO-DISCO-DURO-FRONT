import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthHook } from '../hooks/useAuthHook';
import {
    getAllUsersService,
    toggleUserActiveService,
    deleteUserService,
} from '../services/fetchApi';
import { toast } from 'react-toastify';
import {
    ArrowPathIcon,
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { DeleteUserModal } from '../components/LayoutPrivate/Modals/DeleteUserModal';

export const UsersListPage = () => {
    const navigate = useNavigate();
    const { token, isAdmin } = useAuthHook();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRefs = useRef({});
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        userId: null,
        username: '',
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                openMenuId &&
                !menuRefs.current[openMenuId]?.contains(event.target)
            ) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuId]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllUsersService(token);
            setUsers(data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setError(error.message);
            toast.error('Error al cargar la lista de usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAdmin) {
            navigate('/storage');
            return;
        }
        loadUsers();
    }, [token, isAdmin, navigate]);

    const handleToggleActive = async (userId, currentActive) => {
        try {
            await toggleUserActiveService(userId, currentActive, token);
            await loadUsers(); // Recargar la lista de usuarios
            toast.success(
                `Usuario ${
                    currentActive ? 'deshabilitado' : 'habilitado'
                } correctamente`
            );
        } catch (error) {
            console.error('Error al cambiar estado del usuario:', error);
            toast.error('Error al cambiar el estado del usuario');
        }
        setOpenMenuId(null); // Cerrar el menú
    };

    const handleDeleteUser = async (userId, username) => {
        setDeleteModal({ isOpen: true, userId, username });
        setOpenMenuId(null); // Cerrar el menú
    };

    const confirmDelete = async () => {
        try {
            await deleteUserService(deleteModal.userId, token);
            await loadUsers(); // Recargar la lista de usuarios
            toast.success('Usuario eliminado correctamente');
            setDeleteModal({ isOpen: false, userId: null, username: '' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            toast.error('Error al eliminar el usuario');
        }
    };

    if (!isAdmin) return null;

    if (loading) {
        return (
            <main className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </main>
        );
    }

    if (error) {
        return (
            <section className="text-center text-red-500 p-4" role="alert">
                Error: {error}
            </section>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Usuarios</h1>
                <button
                    onClick={loadUsers}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Actualizar lista de usuarios"
                >
                    <ArrowPathIcon className="h-5 w-5" />
                </button>
            </header>

            <section className="grid grid-cols-1 gap-4">
                {users
                    .filter((user) => user.role !== 'admin')
                    .map((user) => (
                        <article
                            key={user.id}
                            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
                        >
                            <figure className="flex items-center space-x-4">
                                {user.avatar ? (
                                    <img
                                        className="h-12 w-12 rounded-full"
                                        src={`/uploads/${user.id}/avatars/${user.avatar}`}
                                        alt={`Avatar de ${user.username}`}
                                    />
                                ) : (
                                    <span
                                        className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center"
                                        aria-label="Avatar por defecto"
                                    >
                                        <span className="text-gray-500">
                                            {user.username
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </span>
                                )}
                                <figcaption>
                                    <p className="font-medium text-gray-900">
                                        {user.username}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                    <p
                                        className={`text-sm ${
                                            user.active
                                                ? 'text-cyan-500'
                                                : 'text-red-500'
                                        }`}
                                    >
                                        {user.active
                                            ? 'Habilitado'
                                            : 'Deshabilitado'}
                                    </p>
                                </figcaption>
                            </figure>

                            <nav
                                className="relative"
                                ref={(el) => (menuRefs.current[user.id] = el)}
                            >
                                <button
                                    className="text-gray-400 hover:text-gray-600"
                                    onClick={() =>
                                        setOpenMenuId(
                                            openMenuId === user.id
                                                ? null
                                                : user.id
                                        )
                                    }
                                    aria-label="Menú de opciones"
                                    aria-expanded={openMenuId === user.id}
                                >
                                    <EllipsisVerticalIcon className="h-5 w-5" />
                                </button>

                                {openMenuId === user.id && (
                                    <menu className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                        <li className="py-1">
                                            <button
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleToggleActive(
                                                        user.id,
                                                        user.active
                                                    )
                                                }
                                            >
                                                {user.active
                                                    ? 'Deshabilitar'
                                                    : 'Habilitar'}
                                            </button>
                                            <button
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleDeleteUser(
                                                        user.id,
                                                        user.username
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    </menu>
                                )}
                            </nav>
                        </article>
                    ))}
            </section>
            <DeleteUserModal
                isOpen={deleteModal.isOpen}
                onClose={() =>
                    setDeleteModal({
                        isOpen: false,
                        userId: null,
                        username: '',
                    })
                }
                onConfirm={confirmDelete}
                username={deleteModal.username}
            />
        </main>
    );
};
