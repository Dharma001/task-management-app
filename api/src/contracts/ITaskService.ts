import { TaskFilterRequestDTO } from '../dtos/tasks/task-filter-request-dto';
import { TaskPriorityRequestDTO } from '../dtos/tasks/task-priority-request';
import { TaskRequestDTO } from '../dtos/tasks/task-request-dto';
import { TaskResponseDTO } from '../dtos/tasks/task-response-dto';
import { TaskStatusRequestDTO } from '../dtos/tasks/task-status-request';

export interface ITaskService {
    createTask(taskData: TaskRequestDTO): Promise<TaskResponseDTO>;
    updateTask(id: number, taskData: TaskRequestDTO): Promise<TaskResponseDTO>;
    deleteTask(id: number): Promise<void>;
    getTaskById(id: number): Promise<TaskResponseDTO>;
    updateTaskStatus(id:number, statusData: TaskStatusRequestDTO ): Promise<TaskResponseDTO>;
    updateTaskPriority(id:number, priorityData: TaskPriorityRequestDTO ): Promise<TaskResponseDTO>;
    getAllTasks(userId: number, filters: TaskFilterRequestDTO): Promise<TaskResponseDTO[]>;
    getAllTasks(userId: number): Promise<TaskResponseDTO[]>;
}
