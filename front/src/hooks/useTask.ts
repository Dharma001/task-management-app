import { useState } from 'react';
import {
  createTask,
  updateTask,
} from '../api/taskApi';
import {
  TaskBaseResponse,
  TaskStatusEnum,
  TaskPriorityEnum,
} from '../interfaces/api/taskResponse';
import { toast } from 'react-toastify';
import { ApiResponse } from '../interfaces/api/authResponse';

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

export const useTasks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ServerError | null>(null);

  const handleResponse = <T extends ApiResponse>(response: T): T => {
    if (response.message) {
      toast.success(response.message);
    }
    setError(null);
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

      if (errorData?.status === 'fail') {
        handleValidationError(errorData.errors || {});
      } else {
        handleGeneralError(err as ErrorResponse);
      }
    } finally {
      setLoading(false);
    }
  };

  const taskCreate = (
    title: string,
    description: string,
    dueDate: Date | null,
    priority: TaskPriorityEnum,
    attachment?: string,
    archived?: boolean,
    status?: TaskStatusEnum
  ): Promise<TaskBaseResponse | void> => {
    return apiCall(createTask, title, description, dueDate, priority, attachment, archived, status);
  };

  const taskUpdate = (
    taskId: number,
    title: string,
    description: string,
    dueDate: Date | null,
    priority: TaskPriorityEnum,
    status: TaskStatusEnum,
    attachment?: string,
    archived: boolean = false
  ): Promise<TaskBaseResponse | void> => {
    return apiCall(updateTask, taskId, title, description, dueDate, priority, status, attachment, archived);
  };

  return {
    taskCreate,
    taskUpdate,
    loading,
    error,
  };
};
