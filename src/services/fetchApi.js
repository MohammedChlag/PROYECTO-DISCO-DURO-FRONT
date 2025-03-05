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

export const getUserService = async (userId) => {
    const response = await fetch(`${apiPath}/users/${userId}`);

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

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
    try {
        const response = await fetch(`${apiPath}/storage/share/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        console.log('RESPUESTA DEL SERVICIO SHARE:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Error al compartir el elemento');
        }

        // Verificar que la respuesta tenga el formato esperado
        if (data.status !== 'ok') {
            throw new Error('No se pudo compartir el archivo');
        }

        // Devolver un objeto consistente con las URLs disponibles
        return {
            status: data.status,
            url: data.url || null,
            download: data.download || null,
        };
    } catch (error) {
        console.error('Error en shareStorageItemService:', error);
        throw error;
    }
};

export const updateUserService = async (info, token) => {
    console.log('updateUserService - Info a enviar:', info);
    console.log('updateUserService - Token:', token);

    const response = await fetch(`${apiPath}/users/own`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(info),
    });

    const responseData = await response.json();
    console.log('updateUserService - Respuesta completa:', responseData);

    if (!response.ok) {
        console.error('updateUserService - Error:', responseData.message);
        throw new Error(responseData.message);
    }

    return responseData.data.user;
};

export const updatePasswordService = async (passwords, token) => {
    console.log('updatePasswordService - Actualizando contraseña');

    const response = await fetch(`${apiPath}/users/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmNewPassword: passwords.confirmNewPassword,
        }),
    });

    const responseData = await response.json();
    console.log('updatePasswordService - Respuesta:', responseData);

    if (!response.ok) {
        console.error('updatePasswordService - Error:', responseData.message);
        throw new Error(responseData.message);
    }

    return responseData;
};

export const updateAvatarService = async (file, token) => {
    console.log('Token', token);
    if (!file) {
        throw new Error('Debes enviar un archivo.');
    }

    const formData = new FormData();
    formData.append('avatar', file);

    console.log('FormData enviado:', formData); // Para debug

    const response = await fetch(`${apiPath}/users/avatar`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const { message } = await response.json();

    if (!response.ok) {
        throw new Error(message || 'Error al actualizar el avatar');
    }

    return message;
};

export const deleteAvatarService = async (token) => {
    const response = await fetch(`${apiPath}/users/avatar`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { message } = await response.json();

    if (!response.ok) throw new Error(message);

    return message;
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

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar el elemento');
    }

    return message || 'Elemento eliminado correctamente';
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

export const downloadSharedFileService = async (shareToken) => {
    try {
        const response = await fetch(
            `${apiPath}/storage/share/download/${shareToken}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.message || 'Error al descargar el archivo compartido'
            );
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
            : 'archivo_compartido';

        link.setAttribute('download', fileName);

        // Simular clic y limpiar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return 'Archivo compartido descargado correctamente';
    } catch (error) {
        console.error('Error en downloadSharedFileService:', error);
        throw error;
    }
};

export const searchStorageService = async ({ query, token }) => {
    if (!token) throw new Error('Token inválido');

    try {
        const response = await fetch(
            `${apiPath}/storage/search?name=${encodeURIComponent(query)}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Error en la búsqueda');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en searchStorage:', error);
        throw error;
    }
};

export const getAllUsersService = async (token) => {
    console.log('getAllUsersService - Obteniendo lista de usuarios');

    const response = await fetch(`${apiPath}/users/list`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error('getAllUsersService - Error:', responseData.message);
        throw new Error(responseData.message || 'Error al obtener usuarios');
    }

    return responseData.data.users;
};

export const toggleUserActiveService = async (userId, currentActive, token) => {
    console.log(
        'toggleUserActiveService - Cambiando estado del usuario:',
        userId
    );

    const response = await fetch(`${apiPath}/users/status/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active: !currentActive }), // Enviamos el opuesto del estado actual
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error('toggleUserActiveService - Error:', responseData.message);
        throw new Error(
            responseData.message || 'Error al cambiar estado del usuario'
        );
    }

    return responseData.data.user;
};

export const deleteUserService = async (userId, token) => {
    console.log('deleteUserService - Eliminando usuario:', userId);

    const response = await fetch(`${apiPath}/admin/user/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error('deleteUserService - Error:', responseData.message);
        throw new Error(responseData.message || 'Error al eliminar usuario');
    }

    return responseData;
};
// Service que envia el email del usuario al backend
export const recoveryPasswordService = async (email) => {
    //Envia codigo al correo del usuario
    try {
        const response = await fetch(`${apiPath}/users/password/recover`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log('Respuesta del backend:', data);

        if (!response.ok) {
            throw new Error(data.message || 'No se pudo enviar el código');
        }
        return true; //Èxito
    } catch (error) {
        console.error('Error en recoveryPasswordService:', error);
        return false; //falló
    }
};

export const resetPasswordService = async (recoveryPassCode, newPassword) => {
    //Usa el código para cambiar contraseña

    const response = await fetch(`${apiPath}/users/password/recover`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recoveryPassCode, newPassword }),
    });
    const responseData = await response.json();
    console.log('Respuesta del backend:', responseData);

    if (!response.ok) {
        throw new Error(
            responseData.message || 'No se pudo restablecer la contraseña'
        );
    }
    return true; // Éxito
};

export const getSharedLinkService = async (shareToken) => {
    try {
        const response = await fetch(
            `${apiPath}/storage/share/link/${shareToken}`
        );

        const responseData = await response.json();
        console.log(
            'Respuesta completa de getSharedLinkService:',
            responseData
        );

        if (!response.ok) {
            const { message } = responseData;
            throw new Error(message);
        }

        // Devolver la respuesta completa en lugar de solo data
        return responseData;
    } catch (error) {
        console.error('Error en getSharedLinkService:', error);
        throw error;
    }
};

export const getAssessmentsService = async () => {
    try {
        console.log('getAssessmentsService - Obteniendo valoraciones');

        const response = await fetch(`${apiPath}/assessments`);

        const responseData = await response.json();
        console.log(
            'getAssessmentsService - Respuesta completa:',
            responseData
        );

        const { status, message, data } = responseData;

        // Verificar si el status es "ok" o "Ok" (aceptar ambos)
        if (!response.ok || (status !== 'ok' && status !== 'Ok')) {
            console.error(
                'getAssessmentsService - Error en la respuesta:',
                responseData
            );
            throw new Error(message || 'Error al obtener las valoraciones');
        }

        console.log('getAssessmentsService - Datos obtenidos:', data);

        // Devolver un objeto con la estructura esperada por la página
        return {
            message,
            count: responseData.count || 0,
            result: data || [], // Mantener la propiedad 'result' para compatibilidad
        };
    } catch (error) {
        console.error('Error en getAssessmentsService:', error);
        throw error;
    }
};

export const createAssessmentService = async (assessmentData, token) => {
    try {
        console.log(
            'createAssessmentService - Datos a enviar:',
            assessmentData
        );
        console.log(
            'createAssessmentService - Token:',
            token ? token.substring(0, 10) + '...' : 'No token'
        );

        const response = await fetch(`${apiPath}/assessments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(assessmentData),
        });

        const responseData = await response.json();
        console.log(
            'createAssessmentService - Respuesta completa:',
            responseData
        );

        // Extraer status y message/messages (puede venir en singular o plural)
        const { status, message, messages } = responseData;
        const responseMessage = messages || message || 'Operación completada';

        // Verificar si el status es "ok" o "Ok" (aceptar ambos)
        if (!response.ok || (status !== 'ok' && status !== 'Ok')) {
            console.error(
                'createAssessmentService - Error en la respuesta:',
                responseData
            );
            throw new Error(responseMessage || 'Error al enviar la valoración');
        }

        return { success: true, message: responseMessage };
    } catch (error) {
        console.error('Error en createAssessmentService:', error);
        throw error;
    }
};

export const getUserByIdService = async (userId) => {
    try {
        console.log(
            'getUserByIdService - Obteniendo información del usuario:',
            userId
        );

        if (!userId) {
            throw new Error('ID de usuario no proporcionado');
        }

        const response = await fetch(`${apiPath}/users/${userId}`);
        const responseData = await response.json();

        console.log('getUserByIdService - Respuesta completa:', responseData);

        const { status, data } = responseData;

        // Verificar si el status es "ok" o "Ok" (aceptar ambos)
        if (!response.ok || (status !== 'ok' && status !== 'Ok')) {
            console.error(
                'getUserByIdService - Error en la respuesta:',
                responseData
            );
            throw new Error(
                responseData.message ||
                    'Error al obtener la información del usuario'
            );
        }

        console.log('getUserByIdService - Datos del usuario obtenidos:', data);

        if (data && data.avatar && !data.avatar.startsWith('http')) {
            // La ruta correcta es /uploads/userId/avatars/avatarName
            data.avatarUrl = `${apiPath}/uploads/${data.id}/avatars/${data.avatar}`;
        } else if (data && data.avatar) {
            data.avatarUrl = data.avatar;
        }

        return {
            user: data, // Devolver los datos del usuario
        };
    } catch (error) {
        console.error('Error en getUserByIdService:', error);
        throw error;
    }
};

export const deleteAssessmentService = async (assessmentId, token) => {
    try {
        const response = await fetch(`${apiPath}/assessments/${assessmentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(
                responseData.message || 'Error al eliminar la valoración'
            );
        }

        return responseData.message || 'Valoración eliminada correctamente';
    } catch (error) {
        console.error('Error en deleteAssessmentService:', error);
        throw error;
    }
};
// Service que envia el email del usuario al backend
export const recoveryPasswordService = async (email) => {
    //Envia codigo al correo del usuario
    try {
        const response = await fetch(`${apiPath}/users/password/recover`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log('Respuesta del backend:', data);

        if (!response.ok) {
            throw new Error(data.message || 'No se pudo enviar el código');
        }
        return true; //Èxito
    } catch (error) {
        console.error('Error en recoveryPasswordService:', error);
        return false; //falló
    }
};

export const resetPasswordService = async (recoveryPassCode, newPassword) => {
    //Usa el código para cambiar contraseña

    const response = await fetch(`${apiPath}/users/password/recover`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recoveryPassCode, newPassword }),
    });
    const responseData = await response.json();
    console.log('Respuesta del backend:', responseData);

    if (!response.ok) {
        throw new Error(
            responseData.message || 'No se pudo restablecer la contraseña'
        );
    }
    return true; // Éxito
};
