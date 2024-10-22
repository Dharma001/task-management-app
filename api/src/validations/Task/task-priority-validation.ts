import Joi from 'joi';
import { TaskPriorityRequestDTO } from '../../dtos/tasks/task-priority-request';

const taskRequestSchema = Joi.object({
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').optional().messages({
        'any.only': '"priority" must be one of the following values: LOW, MEDIUM, HIGH',
    }),
});

/**
 * Validates the TaskRequestDTO.
 * @param dto - The TaskRequestDTO containing task information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validatePriorityTask = (dto: TaskPriorityRequestDTO) => {
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
