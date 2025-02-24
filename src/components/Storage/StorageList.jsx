import { useEffect, useState } from 'react';
import { Carpeta } from './Carpeta.jsx';
import { Archivo } from './Archivo.jsx';

export const StorageList = ({ storage }) => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (storage && Array.isArray(storage)) {
            const folderList = storage.filter((item) => item.type === 'folder');
            const fileList = storage.filter((item) => item.type === 'file');
            setFolders(folderList);
            setFiles(fileList);
        }
    }, [storage]);

    return (
        <>
            <section>
                <h3>Carpetas</h3>
                <ul>
                    {folders.map((folder) => (
                        <Carpeta key={folder.id} folder={folder} />
                    ))}
                </ul>
            </section>
            <section>
                <h3>Archivos</h3>
                <ul>
                    {files.map((file) => (
                        <Archivo key={file.id} file={file} />
                    ))}
                </ul>
            </section>
        </>
    );
};
