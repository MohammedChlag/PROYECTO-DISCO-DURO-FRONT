import { useEffect, useState } from 'react';
import {
    getUserService,
    getOwnUserService,
    updateUserService,
    updateAvatarService,
    deleteAvatarService,
} from '../services/fetchApi.js';

export const useUserHook = (id, token) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = id
                    ? await getUserService(id)
                    : await getOwnUserService(token);

                setUser(data);
            } catch (err) {
                setError(err.message || 'Error fetching user');
            }
        };

        fetchUser();
    }, [id, token]);

    const updateUser = async (info) => {
        try {
            setLoading(true);
            const data = await updateUserService(info, token);
            setUser(data);
        } catch (error) {
            setError(error.message || 'Error updating user');
        } finally {
            setLoading(false);
        }
    };
    const updateAvatar = async (info, token) => {
        try {
            setLoading;
            const data = await updateAvatarService(info, token);
            setUser(data);
        } catch (error) {
            setError(error.message || 'Error updating avatar');
        } finally {
            setLoading(false);
        }
    };
    const deleteAvatar = async () => {
        try {
            setLoading(true);
            const data = await deleteAvatarService(token);
            setUser(data);
        } catch (error) {
            setError(error.message || 'Error deleting avatar');
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, updateUser, updateAvatar, deleteAvatar };
};
