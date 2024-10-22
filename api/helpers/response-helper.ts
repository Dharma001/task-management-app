export class ResponseHelper {
    /**
     * Returns a success response.
     * @param data - The data to be returned in the response.
     * @param message - Optional success message.
     * @param statusCode - HTTP status code (default is 200).
     */
    static success(data: any, message = 'Success', statusCode = 200) {
      return {
        status: 'success',
        statusCode,
        message,
        data,
      };
    }
  
    /**
     * Returns an error response.
     * @param message - Optional error message.
     * @param statusCode - HTTP status code (default is 500).
     * @param errors - Optional error details.
     */
    static error(message = 'Something went wrong', statusCode = 500, errors: any = null) {
      return {
        status: 'error',
        statusCode,
        message,
        errors,
      };
    }
  
    /**
     * Returns a validation error response.
     * @param errors - Validation error details.
     * @param message - Optional error message (default is "Validation failed").
     * @param statusCode - HTTP status code (default is 400).
     */
    static validationError(errors: Record<string, string[]>, message = 'Validation failed', statusCode = 400) {
      return {
        status: 'fail',
        statusCode,
        message,
        errors: errors || {},
      };
    }
  }
  