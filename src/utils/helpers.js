export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
};

export const setToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const validateSchemaUtil = (schema, data) => {
    return schema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
    });
};
