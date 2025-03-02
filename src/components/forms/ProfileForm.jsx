import { useState, useRef, useEffect } from 'react';
import { useUserHook } from '../../hooks/useUserHook.js';
import { useAuthHook } from '../../hooks/useAuthHook.js';
import { toast } from 'react-toastify';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import {
    UserCircleIcon,
    TrashIcon,
    PencilIcon,
} from '@heroicons/react/24/solid';

export const ProfileForm = () => {
    const { token } = useAuthHook();
    const fileInputRef = useRef(null);
    const {
        user,
        loading,
        error,
        updateUser,
        updateAvatar,
        deleteAvatar,
        setError,
    } = useUserHook(null, token); // Pasamos null como id y el token
    const [isEditing, setIsEditing] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        if (isEditing) {
            setFormData({
                username: user?.username || '',
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
            });
        }
        setIsEditing(!isEditing);
    };

    const handleAvatarClick = () => {
        console.log(
            '%c Click en editar avatar',
            'background: #222; color: #bada55'
        );
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            console.log(
                '%c No se seleccionó ningún archivo',
                'background: #222; color: #ff0000'
            );
            return;
        }

        console.log(
            '%c Archivo seleccionado:',
            'background: #222; color: #00ff00',
            file.name
        );
        try {
            const result = await updateAvatar(file);
            console.log(
                '%c Resultado updateAvatar:',
                'background: #222; color: #00ff00',
                result
            );
            if (result) {
                setAvatarError(false);
                toast.success('Avatar actualizado correctamente');
            }
        } catch (error) {
            console.error(
                '%c Error en handleAvatarChange:',
                'background: #222; color: #ff0000',
                error
            );
            toast.error('Error al actualizar el avatar');
        }
    };

    const handleDeleteClick = () => {
        console.log(
            '%c Click en eliminar avatar',
            'background: #222; color: #bada55'
        );
        // Por ahora solo confirmamos con un console.log
        if (window.confirm('¿Estás seguro de que deseas eliminar tu avatar?')) {
            handleDeleteAvatar();
        }
    };

    const handleDeleteAvatar = async () => {
        try {
            const result = await deleteAvatar();
            if (result.success) {
                setAvatarError(false);
                toast.success('Avatar eliminado correctamente');
            } else {
                toast.error(result.error || 'Error al eliminar el avatar');
            }
        } catch (error) {
            toast.error('Error al eliminar el avatar');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto

        if (!isEditing) {
            return;
        }

        try {
            const result = await updateUser({
                username: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            });

            if (result.success) {
                if (result.user) {
                    setFormData({
                        username: result.user.username || '',
                        firstName: result.user.firstName || '',
                        lastName: result.user.lastName || '',
                        email: result.user.email || '',
                    });
                }

                setIsEditing(false);
                toast.success('Perfil actualizado correctamente');
            } else {
                toast.error(result.error || 'Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error en submit:', error);
            toast.error('Error al actualizar el perfil');
        }
    };

    // Construir la URL del avatar
    const avatarUrl =
        !avatarError && user?.avatar
            ? `/uploads/${user.id}/avatars/${user.avatar}`
            : null;

    return (
        <Form
            handleSubmit={handleSubmit}
            className="flex flex-col items-center gap-2 p-3 bg-[#F7FBFC] rounded-lg w-full max-w-md mx-auto text-center mt-6"
        >
            <header>
                <h1 className="text-xl font-semibold mb-4">{user?.username}</h1>
            </header>

            <section
                className="flex flex-col items-center mb-6"
                aria-label="Gestión de avatar"
            >
                <figure className="relative group">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleAvatarChange}
                        accept="image/*"
                        aria-label="Seleccionar nuevo avatar"
                    />
                    {avatarUrl ? (
                        <div className="relative">
                            <img
                                src={avatarUrl}
                                alt={`Avatar de ${user?.username}`}
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                onClick={handleAvatarClick}
                                onError={(e) => {
                                    e.target.src = '/default-avatar.png';
                                    setAvatarError(true);
                                }}
                            />
                            <nav
                                className="absolute -bottom-2 right-0 flex gap-2"
                                aria-label="Opciones de avatar"
                            >
                                <Button
                                    type="button"
                                    handleClick={handleAvatarClick}
                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md"
                                    title="Cambiar avatar"
                                    aria-label="Cambiar avatar"
                                >
                                    <PencilIcon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                </Button>
                                {!avatarError && (
                                    <Button
                                        type="button"
                                        handleClick={handleDeleteClick}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
                                        title="Eliminar avatar"
                                        aria-label="Eliminar avatar"
                                    >
                                        <TrashIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    </Button>
                                )}
                            </nav>
                        </div>
                    ) : (
                        <div className="relative">
                            <UserCircleIcon
                                className="w-24 h-24 text-gray-400 cursor-pointer border-4 border-white rounded-full shadow-lg"
                                onClick={handleAvatarClick}
                                aria-label="Avatar por defecto"
                            />
                            <Button
                                type="button"
                                handleClick={handleAvatarClick}
                                className="absolute -bottom-2 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md"
                                title="Añadir avatar"
                                aria-label="Añadir avatar"
                            >
                                <PencilIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </Button>
                        </div>
                    )}
                </figure>
            </section>

            {error && (
                <p role="alert" className="text-red-500 text-sm mb-2">
                    {error}
                </p>
            )}

            <fieldset className="w-full space-y-4" disabled={!isEditing}>
                <legend className="sr-only">Información del perfil</legend>

                <Input
                    id="username"
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    handleChange={handleInputChange}
                    disabled={!isEditing}
                    errors={error}
                    required
                    aria-required="true"
                />
                <Input
                    id="firstName"
                    label="Nombre"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    handleChange={handleInputChange}
                    disabled={!isEditing}
                    errors={error}
                />
                <Input
                    id="lastName"
                    label="Apellido"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    handleChange={handleInputChange}
                    disabled={!isEditing}
                    errors={error}
                />
                <Input
                    id="email"
                    label="Correo Electrónico"
                    type="email"
                    name="email"
                    value={formData.email}
                    handleChange={handleInputChange}
                    disabled={!isEditing}
                    errors={error}
                    required
                    aria-required="true"
                />
            </fieldset>

            <footer className="flex gap-2 w-full mt-6">
                <Button
                    type="button"
                    handleClick={handleEdit}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-md transition-colors"
                    aria-label={
                        isEditing ? 'Cancelar edición' : 'Editar información'
                    }
                >
                    {isEditing ? 'Cancelar' : 'Editar Información'}
                </Button>

                {isEditing && (
                    <Button
                        type="submit"
                        className="flex-1 bg-[#00B4D8] hover:bg-[#0096B4] text-white font-semibold py-3 rounded-md transition-colors"
                        disabled={loading}
                        aria-label={
                            loading ? 'Guardando cambios' : 'Guardar cambios'
                        }
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                )}
            </footer>
        </Form>
    );
};
