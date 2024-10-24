import axios, { AxiosRequestConfig } from 'axios';
import { API_AUTH_URL } from '../config';
import { TaskBaseResponse, TaskStatusEnum, TaskPriorityEnum, TaskListResponse } from '../interfaces/api/taskResponse';

const getAccessToken = (): string | null => {
  return localStorage.getItem('token');
};

const fetchWithAuth = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: T,
  params?: Record<string, unknown>
): Promise<T> => {
  let accessToken = getAccessToken();

  while (!accessToken) {
    await new Promise(resolve => setTimeout(resolve, 100));
    accessToken = getAccessToken();
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': method === 'DELETE' ? undefined : 'application/json',
  };

  const config: AxiosRequestConfig = {
    method,
    url: `${API_AUTH_URL}${url}`,
    headers,
    data,
    params,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Request failed');
  }  
};

export const createTask = async (
  title: string,
  description: string,
  dueDate: Date | null,
  priority: TaskPriorityEnum,
  attachment?: string,
  archived: boolean = false,
  status: TaskStatusEnum = TaskStatusEnum.PENDING
): Promise<TaskBaseResponse> => {
  const data = {
    title,
    description,
    due_date: dueDate ? dueDate.toISOString() : null,
    priority,
    attachment: attachment ? attachment : 'http://example.com/file.pdf',
    archived,
    status,
  };
  console.log('Data being sent to API:', data);
  return await fetchWithAuth<TaskBaseResponse>('POST', '/tasks', data);
};

export const fetchTasks = async (
  fromDate?: Date,
  toDate?: Date,
  status?: TaskStatusEnum,
  priority?: TaskPriorityEnum
): Promise<TaskListResponse> => {
  const params = {
    fromDate: fromDate ? fromDate.toISOString() : undefined,
    toDate: toDate ? toDate.toISOString() : undefined,
    status,
    priority,
  };
  return await fetchWithAuth<TaskListResponse>('GET', '/tasks', undefined, params);
};

export const fetchTaskById = async (taskId: number): Promise<TaskBaseResponse> => {
  return await fetchWithAuth<TaskBaseResponse>('GET', `/tasks/${taskId}`);
};

export const updateTask = async (
  taskId: number,
  title: string,
  description: string,
  dueDate: Date | null,
  priority: TaskPriorityEnum,
  attachment?: string,
  archived: boolean = false,
  status: TaskStatusEnum = TaskStatusEnum.PENDING
): Promise<TaskBaseResponse> => {
  const data = {
    title,
    description,
    due_date: dueDate ? dueDate.toISOString() : null,
    priority,
    attachment: attachment ? attachment : 'http://example.com/file.pdf',
    archived,
    status,
  };

  console.log('Data being sent to API:', data);
  return await fetchWithAuth<TaskBaseResponse>('PUT', `/tasks/${taskId}`, data);
};

export const deleteTask = async (taskId: number): Promise<TaskBaseResponse> => {
  return await fetchWithAuth<TaskBaseResponse>('DELETE', `/tasks/${taskId}`);
};
