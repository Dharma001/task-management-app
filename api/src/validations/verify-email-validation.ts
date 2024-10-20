import Joi from 'joi';
import { IUserService } from '../contracts/IUserService';
import { VerifyUserEmail } from '../dtos/users/auth/auth-verify-email';

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
});

/**
 * Validates the user store/update request DTO.
 * @param dto - The UserRequestDTO containing create/update information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateUserEmail = async (dto: VerifyUserEmail, userService: IUserService) => {
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
                email: ['Sorry, we could not find your account.'],
            },
        };
    }

    return { valid: true };
};
