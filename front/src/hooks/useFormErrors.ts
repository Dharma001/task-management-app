import { FieldErrors, FieldValues } from 'react-hook-form';

export interface ServerError {
    [key: string]: string[];
}

export const useFormErrors = <T extends FieldValues>(
    errors: FieldErrors<T>, 
    serverError: ServerError | null
) => {
    const getErrorMessage = (fieldName: keyof T) => {
        if (errors[fieldName]) {
            return errors[fieldName].message || "An error occurred"; 
        }
        return serverError?.[fieldName as string]?.[0] || null; 
    };

    return { getErrorMessage };
};
