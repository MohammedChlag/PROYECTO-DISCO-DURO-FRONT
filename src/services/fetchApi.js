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
    const response = await fetch(`${apiPath}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
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
