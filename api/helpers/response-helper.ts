export class ResponseHelper {
  static success(data: any, message = 'Success', statusCode = 200) {
      return {
          status: 'success',
          statusCode,
          message,
          data
      };
  }

  static error(message = 'Something went wrong', statusCode = 500, errors: any = null) {
      return {
          status: 'error',
          statusCode,
          message,
          errors
      };
  }

  static validationError(errors: Record<string, string[]>, message = 'Validation failed', statusCode = 400) {
        return {
            status: 'fail',
            statusCode,
            message,
            errors: errors || {},
        };
    }
}
