import joi, { boolean } from 'joi';

export const registerUserShema = joi.object({
    firstName: joi.string().max(40).allow('', null).messages(joiErrorMessages),
    lastName: joi.string().max(40).allow('', null).messages(joiErrorMessages),
    birthday: joi.date().iso().required().messages(joiErrorMessages),
    email: joi
        .string()
        .required()
        .email({ tlds: { allow: false } })
        .messages(joiErrorMessages),
    username: joi.string().min(3).max(25).required().messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[¡!@$%^&()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!@$%^&()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    terms: joi
        .boolean()
        .valid(true)
        .required()
        .messages({ 'any.only': ' Debes aceptar los términos y condiciones' }),
});
