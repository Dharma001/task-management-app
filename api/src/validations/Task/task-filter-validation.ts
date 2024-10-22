import Joi from 'joi';
import { TaskFilterRequestDTO } from '../../dtos/tasks/task-filter-request-dto';

const taskFilterSchema = Joi.object({
    fromDate: Joi.date().optional().messages({
        'date.base': '"fromDate" should be a valid date',
    }),
    toDate: Joi.date().min(Joi.ref('fromDate')).optional().messages({
        'date.base': '"toDate" should be a valid date',
        'date.min': '"toDate" must be greater than or equal to "fromDate"',
    }),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').optional().messages({
        'any.only': '"priority" must be one of the following values: LOW, MEDIUM, HIGH',
    }),
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED', 'INCOMPLETE').optional().messages({
        'any.only': '"status" must be one of the following values: PENDING, IN_PROGRESS, COMPLETED, INCOMPLETE',
    }),
});

/**
 * Validates the TaskFilterRequestDTO.
 * @param dto - The TaskFilterRequestDTO containing filter information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateTaskFilter = (dto: TaskFilterRequestDTO) => {
    const { error } = taskFilterSchema.validate(dto, { abortEarly: false });

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
