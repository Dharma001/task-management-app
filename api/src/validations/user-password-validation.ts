import Joi from 'joi';
import { IUserService } from '../contracts/IUserService';
import { UserPasswordRequestDTO } from '../dtos/users/auth/user-password-dto';

const userSchema = Joi.object({
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
        .min(6)
        .required()
        .messages({
            'string.base': '"password" should be a type of text',
            'string.empty': '"password" cannot be an empty field',
            'string.min': '"password" should be at least 6 characters long',
            'any.required': '"password" is a required field',
        }),
});

/**
 * Validates the user store/update request DTO.
 * @param dto - The UserRequestDTO containing create/update information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateUserPassword = async (dto: UserPasswordRequestDTO, userService: IUserService) => {
    const { error } = userSchema.validate(dto, { abortEarly: false });
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

    const existingUser = await userService.getUserByEmail(dto.email);
    if (!existingUser) {
        return {
            valid: false,
            errors: {
                email: ['Opps! something went wrong. please try again later.'],
            },
        };
    }

    return { valid: true };
};
