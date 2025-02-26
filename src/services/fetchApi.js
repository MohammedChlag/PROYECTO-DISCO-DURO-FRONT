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
    const response = await fetch(`${apiPath}/storage`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const { data } = await response.json();

    if (!response.ok) throw new Error('Error getting storage');

    return data;
};
