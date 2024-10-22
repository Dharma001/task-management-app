import Joi from 'joi';
import { TaskStatusRequestDTO } from '../../dtos/tasks/task-status-request';

const taskRequestSchema = Joi.object({
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED', 'INCOMPLETE').optional().messages({
        'any.only': '"status" must be one of the following values: PENDING, IN_PROGRESS, COMPLETED, INCOMPLETE',
    }),
});

/**
 * Validates the TaskRequestDTO.
 * @param dto - The TaskRequestDTO containing task information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateTaskStatus = (dto: TaskStatusRequestDTO) => {
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
