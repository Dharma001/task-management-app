import Joi from 'joi';
import { UserLoginRequestDTO } from '../dtos/users/auth/login-request-dto';

const userLoginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.base': '"email" should be a type of text',
            'string.empty': '"email" cannot be an empty field',
            'string.email': '"email" must be a valid email',
            'any.required': '"email" is a required field',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': '"password" should be a type of text',
            'string.empty': '"password" cannot be an empty field',
            'any.required': '"password" is a required field',
        }),
});

/**
 * Validates the user login request DTO.
 * @param dto - The UserLoginRequestDTO containing login information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateUserLogin = async (dto: UserLoginRequestDTO) => {
    const { error } = userLoginSchema.validate(dto, { abortEarly: false });
    
    if (error) {
        const validationErrors: Record<string, string[]> = {};

        error.details.forEach((detail) => {
            const key = detail.path.join('.');
            if (!validationErrors[key]) {
                validationErrors[key] = [];
            }
            validationErrors[key].push(detail.message);
        });

        return { valid: false, errors: validationErrors };
    }

    return { valid: true };
};
