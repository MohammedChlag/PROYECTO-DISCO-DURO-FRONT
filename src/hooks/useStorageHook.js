import { useEffect, useState } from 'react';
import { getStorageService } from '../services/fetchApi.js';
import { useAuthHook } from './useAuthHook.js';

export const useStorageHook = () => {
    const [storage, setStorage] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useAuthHook();

    useEffect(() => {
        const getAllStorage = async () => {
            try {
                setLoading(true);
                const storage = await getStorageService(token);
                setStorage(storage);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getAllStorage();
    }, []);

    return { storage, error, loading };
};
