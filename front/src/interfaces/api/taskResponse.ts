export interface ApiResponse {
  status: string;
  statusCode: number;
  message: string;
  errors?: { [key: string]: string[] };
}

export enum TaskStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  INCOMPLETE = "INCOMPLETE",
}

export enum TaskPriorityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface TaskBase {
  id: number;
  title: string;
  description: string;
  due_date: Date | null;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  created_at: string;
  updated_at: string;
  attachment?: string | null;
  archived: boolean;
}

export interface TaskBaseResponse extends ApiResponse {
  data: TaskBase;
}

export interface TaskListResponse extends ApiResponse {
  data: TaskBase[];
}