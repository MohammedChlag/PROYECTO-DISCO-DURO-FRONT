import { useEffect, useState, useCallback } from 'react';
import { getStorageService } from '../services/fetchApi.js';
import { useAuthHook } from './useAuthHook.js';

export const useStorageHook = () => {
    const [storage, setStorage] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useAuthHook();

    const refetchStorage = useCallback(async () => {
        if (!token) return;

        try {
            setLoading(true);
            const newStorage = await getStorageService(token);
            setStorage((prevStorage) =>
                Array.isArray(newStorage) ? [...newStorage] : []
            );
            setError(null);
            return newStorage;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        refetchStorage();
    }, [refetchStorage]);

    return { storage, error, loading, refetchStorage };
};
