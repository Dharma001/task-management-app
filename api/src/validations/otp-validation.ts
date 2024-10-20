import Joi from 'joi';
import { IUserService } from '../contracts/IUserService';
import { UserOtpRequestDTO } from '../dtos/users/auth/otp-request-dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userOtpSchema = Joi.object({
    otp: Joi.string().length(6).required().messages({
        'string.base': '"otp" should be a type of text',
        'string.empty': '"otp" cannot be an empty field',
        'string.length': '"otp" must be exactly 6 characters long',
        'any.required': '"otp" is a required field',
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
});

/**
 * Validates the user OTP request DTO.
 * @param dto - The UserOtpRequestDTO containing OTP and email information.
 * @param userService - The user service to check for existing users.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateUserOtp = async (dto: UserOtpRequestDTO, userService: IUserService) => {
    const { error } = userOtpSchema.validate(dto, { abortEarly: false });
    
    if (error) {
        const validationErrors: Record<string, string[]> = {};
        error.details.forEach((detail) => {
            const key = detail.path.join('.');
            validationErrors[key] = validationErrors[key] || [];
            validationErrors[key].push(detail.message);
        });

        return { valid: false, errors: validationErrors };
    }

    const existingUser = await userService.getUserByEmail(dto.email);
    if (!existingUser) {
        return {
            valid: false,
            errors: { email: ['Please enter a valid email address.'] },
        };
    }

    const otpRecord = await prisma.otp.findFirst({
        where: { email: dto.email },
        orderBy: { created_at: 'desc' },
    });

    if (!otpRecord || otpRecord.otp !== dto.otp) {
        return {
            valid: false,
            errors: { otp: ['Enter a valid otp!'] },
        };
    }

    return { valid: true };
};
