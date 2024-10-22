import { TaskRequestDTO } from '../dtos/tasks/task-request-dto';
import { TaskResponseDTO } from '../dtos/tasks/task-response-dto';

export interface ITaskService {
    createTask(taskData: TaskRequestDTO): Promise<TaskResponseDTO>;
    updateTask(id: number, taskData: TaskRequestDTO): Promise<TaskResponseDTO>;
    deleteTask(id: number): Promise<void>;
    getTaskById(id: number): Promise<TaskResponseDTO>;
    getAllTasks(userId: number): Promise<TaskResponseDTO[]>;
}
