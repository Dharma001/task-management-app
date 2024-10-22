// hooks/useFormErrors.ts
import { FieldErrors, FieldValues } from 'react-hook-form';

// Define the interface for server errors
export interface ServerError {
    [key: string]: string[]; // Structure for server errors
}

export const useFormErrors = <T extends FieldValues>(
    errors: FieldErrors<T>, 
    serverError: ServerError | null
) => {
    // Function to get error messages for a specific field
    const getErrorMessage = (fieldName: keyof T) => {
        // Check for client-side validation errors
        if (errors[fieldName]) {
            return errors[fieldName].message || "An error occurred"; // Default message if none provided
        }
        // Use a type assertion for server error
        return serverError?.[fieldName as string]?.[0] || null; 
    };

    return { getErrorMessage };
};
