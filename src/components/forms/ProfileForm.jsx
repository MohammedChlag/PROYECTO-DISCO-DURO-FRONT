import { useState } from 'react';
import { useUserHook } from '../../hooks/useUserHook.js';
import { toast } from 'react-toastify';
import { profileUserSchema } from '../../schemas/users/ProfileUserSchema.js';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export const ProfileForm = () => {
    const { user, loading, error, updateUser, updateAvatar, deleteAvatar } =
        useUserHook();
    const [isEditing, setIsEditing] = useState(false);
    const handleEdit = () => setIsEditing(!isEditing);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const value = await validate(profileUserSchema);

            const message = await editUserService(value);

            toast.success(message);
            toast.info('Modifica tu contraseña');
        } catch (error) {
            toast.error(error.message || 'Error al modificar la contraseña');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <h3 className="text-3xl font-bold text-black text-center mb-2">
                {user?.username}
            </h3>
            <Form
                className="flex flex-col items-center gap-2 p-3 bg-[#F7FBFC] rounded-lg w-full max-w-md mx-auto text-center"
                handleSubmit={handleSubmit}
            >
                {!isEditing && (
                    <>
                        {user?.avatar ? (
                            <img
                                src={`${apiStaticPath}/avatars/${user?.id}/${user?.avatar}`}
                                alt="User Avatar"
                            />
                        ) : (
                            <UserCircleIcon
                                handleClick={handleEdit}
                                className="h-8 w-8 text-gray-400"
                            />
                        )}
                    </>
                )}
                <Button className="font-bold">Editar avatar</Button>
                <Input
                    id="username"
                    label="Username"
                    type="text"
                    name="username"
                    value={user?.username || 'Username'}
                    errors={error}
                    // handleChange={handleChange}
                />
                <Input
                    id="firstName"
                    label="Nombre"
                    type="text"
                    name="firstName"
                    value={user?.firstName || 'Nombre'}
                    errors={error}
                    // handleChange={handleChange}
                />
                <Input
                    id="lastName"
                    label="Apellido"
                    type="text"
                    name="lastName"
                    value={user?.lastName || 'Apellido'}
                    errors={error}
                    // handleChange={handleChange}
                />
                <Input
                    id="email"
                    label="Correo Electrónico"
                    type="email"
                    name="email"
                    value={user?.email || 'email'}
                    errors={error}
                    // handleChange={handleChange}
                />
                <Button
                    type="submit"
                    className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-semibold py-3 rounded-md transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </Form>
        </>
    );
};
