import Joi from 'joi';
import { IUserService } from '../contracts/IUserService';
import { UserRequestDTO } from '../dtos/users/user-request-dto';

const userSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': '"name" should be a type of text',
        'string.empty': '"name" cannot be an empty field',
        'any.required': '"name" is a required field',
    }),
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
    image: Joi.string().optional().allow(''),
    phone: Joi.string().optional().allow(''),
    isAdmin: Joi.number().integer().valid(0, 1).optional().default(0).messages({
        'number.base': '"isAdmin" should be a type of integer',
        'any.only': '"isAdmin" must be either 0 (not admin) or 1 (admin)',
    }),
    status: Joi.number().integer().valid(0, 1).optional().default(1).messages({
        'number.base': '"status" should be a type of integer',
        'any.only': '"status" must be either 0 (inactive) or 1 (active)',
    }),
    dob: Joi.date()
    .greater('1-1-1900')
    .less('now')
    .required()
    .messages({
        'date.base': '"dob" should be a valid date',
        'date.empty': '"dob" cannot be an empty field',
        'date.greater': '"dob" must be a date after January 1, 1900',
        'date.less': '"dob" must be a date in the past',
        'any.required': '"dob" is a required field',
    })
});

/**
 * Validates the user store/update request DTO.
 * @param dto - The UserRequestDTO containing create/update information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateUser = async (dto: UserRequestDTO, userService: IUserService) => {
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
    if (existingUser) {
        return {
            valid: false,
            errors: {
                email: ['The provided email address is already associated with another account. Please use a different email.'],
            },
        };
    }

    return { valid: true };
};
