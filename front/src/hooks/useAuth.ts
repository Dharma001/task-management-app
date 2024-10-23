import { useState } from 'react';
import { loginUser, registerUser, verifyOtp, verifyUserExits, createPassword } from '../api/authApi';
import {
  ApiResponse,
  LoginResponse,
  RegisterResponse,
  OtpResponse,
  PasswordResponse,
  VerifyUserEmailResponse,
} from '../interfaces/api/authResponse';
import { toast } from 'react-toastify';

export interface ServerError {
  [key: string]: string[]; 
}

export interface ErrorResponse {
  response?: {
    data?: {
      status?: 'error' | 'fail';
      errors?: ServerError;
      message?: string;
    };
  };
}

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<ServerError | null>(null); 

  const handleResponse = <T extends ApiResponse>(response: T): T => {
    if (response.message) {
      toast.success(response.message);
    }
    return response; 
  };

  const handleValidationError = (validationErrors: ServerError) => {
    setError(validationErrors); 
    const firstFieldWithError = Object.keys(validationErrors)[0]; 
    const generalMessage = validationErrors[firstFieldWithError][0];
    toast.error(generalMessage); 
  };

  const handleGeneralError = (err: ErrorResponse) => {
    const errorData = err.response?.data;
    const generalMessage = errorData?.message || 'An error occurred. Please try again.';
    setError({ general: [generalMessage] });
    toast.error(generalMessage); 
  };

  const apiCall = async <T extends ApiResponse, Args extends unknown[]>(
    apiFunc: (...args: Args) => Promise<T>,
    ...args: Args 
  ): Promise<T | void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFunc(...args);
      return handleResponse(response);
    } catch (err) {
      const errorData = (err as ErrorResponse).response?.data;

      if (errorData) {
        if (errorData.status === "fail") {
          handleValidationError(errorData.errors || {});
        } else if (errorData.status === "error") {
          handleGeneralError(err as ErrorResponse);
        } else {
          handleGeneralError(err as ErrorResponse);
        }
      } else {
        handleGeneralError(err as ErrorResponse);
      }

      return; 
    } finally {
      setLoading(false);
    }
  };

  const authLogin = (email: string, password: string): Promise<LoginResponse | void> => {
    return apiCall<LoginResponse, [string, string]>(loginUser, email, password);
  };

  const authRegister = (
    name: string,
    email: string,
    dob: Date,
    password: string,
    confirmPassword: string
  ): Promise<RegisterResponse | void> => {
    return apiCall<RegisterResponse, [string, string, Date, string, string]>(
      registerUser,
      name,
      email,
      dob,
      password,
      confirmPassword
    );
  };

  const verifyOtpCode = (otp: string, email: string): Promise<OtpResponse | void> => {
    return apiCall<OtpResponse, [string, string]>(verifyOtp, otp, email);
  };

  const passwordCreate = (email: string, password: string): Promise<PasswordResponse | void> => {
    return apiCall<PasswordResponse, [string, string]>(createPassword, email, password);
  };

  const verifyUserEmailExists = (email: string): Promise<VerifyUserEmailResponse | void> => {
    return apiCall<VerifyUserEmailResponse, [string]>(verifyUserExits, email);
  };

  return {
    authLogin,
    authRegister,
    verifyOtpCode,
    passwordCreate,
    verifyUserEmailExists,
    loading,
    error,
  };
};
