import Joi from 'joi';
import { TaskRequestDTO } from '../../dtos/tasks/task-request-dto';

const taskRequestSchema = Joi.object({
    user_id: Joi.number().required().messages({
        'number.base': '"user_id" should be a type of number',
        'any.required': '"user_id" is a required field',
    }),
    title: Joi.string().required().messages({
        'string.base': '"title" should be a type of text',
        'string.empty': '"title" cannot be an empty field',
        'any.required': '"title" is a required field',
    }),
    description: Joi.string().required().messages({
        'string.base': '"description" should be a type of text',
        'string.empty': '"description" cannot be an empty field',
        'any.required': '"description" is a required field',
    }),
    due_date: Joi.date().greater('now').optional().messages({
        'date.base': '"due_date" should be a valid date',
        'date.greater': '"due_date" must be a future date',
    }),
    attachment: Joi.string().uri().optional().messages({
        'string.base': '"attachment" should be a type of text',
        'string.uri': '"attachment" must be a valid URL',
    }),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').optional().messages({
        'any.only': '"priority" must be one of the following values: LOW, MEDIUM, HIGH',
    }),
    archived: Joi.boolean().optional().messages({
        'boolean.base': '"archived" should be a type of boolean',
    }),
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED', 'INCOMPLETE').optional().messages({
        'any.only': '"status" must be one of the following values: PENDING, IN_PROGRESS, COMPLETED, INCOMPLETE',
    }),
});

/**
 * Validates the TaskRequestDTO.
 * @param dto - The TaskRequestDTO containing task information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateTask = (dto: TaskRequestDTO) => {
    const { error } = taskRequestSchema.validate(dto, { abortEarly: false });

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

    return { valid: true, errors: null };
};
