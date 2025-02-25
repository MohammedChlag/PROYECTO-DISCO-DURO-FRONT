import React from 'react';
import { StorageList } from '../components/Storage/StorageList.jsx';
import { useStorageHook } from '../hooks/useStorageHook.js';

export const HomePage = () => {
    const { storage, error, loading } = useStorageHook();
    return (
        <>
            <h2>HomePage</h2>
            <StorageList storage={storage} />
            {loading && <p>Loading...</p>}
            {error && <p>error: {error.message}</p>}
        </>
    );
};
