const apiPath = import.meta.env.VITE_BACKEND_HOST;

export const getOwnUserService = async (token) => {
    const response = await fetch(`${apiPath}/users/own`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message || 'Error getting user');

    return data.user;
};

export const loginUserService = async (value) => {
    const response = await fetch(`${apiPath}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    });

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return { message, token: data.token };
};

export const registerUserService = async (value) => {
    // Formatear la fecha antes de enviar
    const formattedData = {
        ...value,
        birthday:
            value.birthday instanceof Date
                ? value.birthday.toISOString().split('T')[0]
                : typeof value.birthday === 'string'
                ? value.birthday.split('T')[0]
                : value.birthday,
    };

    console.log('Datos formateados a enviar:', formattedData);

    const response = await fetch(`${apiPath}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
    });

    const { message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return message;
};

export const getStorageService = async (token) => {
    try {
        const response = await fetch(`${apiPath}/storage`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Error getting storage');
        }

        return responseData.data;
    } catch (error) {
        console.error('Error en getStorageService:', error);
        throw error;
    }
};

export const uploadFileService = async (file, token, folderName = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folderName) formData.append('folderName', folderName);

    const response = await fetch(`${apiPath}/uploads/files`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message || 'Error uploading file');
    }

    return data;
};

export const createFolderService = async (folderName, token) => {
    const response = await fetch(`${apiPath}/storage/folder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ folderName }),
    });

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message || 'Error al crear la carpeta');
    }

    return data;
};

export const renameStorageItemService = async (id, newName, token) => {
    try {
        const response = await fetch(`${apiPath}/storage/rename/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newName }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al renombrar el elemento');
        }
        const { message } = await response.json();

        return message;
    } catch (error) {
        console.error('Error en renameStorageItem:', error);
        throw error;
    }
};

export const shareStorageItemService = async (id, token) => {
    const response = await fetch(`${apiPath}/storage/share/${id}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al compartir el elemento');
    }

    return data;
};

export const deleteStorageItemService = async (id, type, token) => {
    const endpoint =
        type === 'file' ? `/uploads/files/${id}` : `/storage/folder/${id}`;

    const response = await fetch(`${apiPath}${endpoint}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar el elemento');
    }

    return data.message || 'Elemento eliminado correctamente';
};

export const downloadFileService = async (id, token) => {
    const response = await fetch(`${apiPath}/download/files/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al descargar el archivo');
    }

    // Convertir la respuesta a blob
    const blob = await response.blob();

    // Crear URL del blob
    const url = window.URL.createObjectURL(blob);

    // Crear enlace temporal
    const link = document.createElement('a');
    link.href = url;

    // Obtener nombre del archivo del header si existe
    const contentDisposition = response.headers.get('content-disposition');
    const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
        : 'archivo';

    link.setAttribute('download', fileName);

    // Simular clic y limpiar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return 'Archivo descargado correctamente';
};

export const searchStorageService = async ({
    query,
    minSize = '',
    maxSize = '',
    orderBy = 'name',
    orderDirection = 'asc',
    token,
}) => {
    if (!token) throw new Error('Token inválido');

    // Solo incluir parámetros que acepta el backend
    const params = {};

    if (query?.trim()) {
        params.name = query.trim();
    }

    // Manejar filtros de tamaño
    const hasActiveFilters =
        (minSize && minSize !== '0') || (maxSize && maxSize !== '0');

    if (minSize && minSize !== '0') params.minSize = minSize;
    if (maxSize && maxSize !== '0') params.maxSize = maxSize;

    // Ordenación
    if (orderBy) params.orderBy = orderBy;
    if (orderDirection) params.orderDirection = orderDirection;

    const searchParams = new URLSearchParams(params);
    console.log('Enviando búsqueda:', Object.fromEntries(searchParams));

    try {
        const response = await fetch(
            `${apiPath}/storage/search?${searchParams.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);

        if (!response.ok) {
            throw new Error(responseData.message || 'Error en la búsqueda');
        }

        const results = Array.isArray(responseData.data)
            ? responseData.data
            : [];

        // Solo filtrar si hay filtros activos de tamaño
        if (hasActiveFilters) {
            return results.filter(
                (item) =>
                    item.type === 'folder' || // Siempre incluir carpetas
                    (item.type === 'file' && // Para archivos, verificar tamaño
                        (!minSize ||
                            minSize === '0' ||
                            item.size >= parseInt(minSize)) &&
                        (!maxSize ||
                            maxSize === '0' ||
                            item.size <= parseInt(maxSize)))
            );
        }

        // Si no hay filtros activos, devolver todos los resultados
        return results;
    } catch (error) {
        console.error('Error en búsqueda:', error);
        throw error;
    }
};
