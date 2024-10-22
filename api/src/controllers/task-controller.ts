import { Request, Response } from "express";
import { ITaskService } from '../contracts/ITaskService';
import { TaskRequestDTO } from '../dtos/tasks/task-request-dto';
import { TaskResponseDTO } from '../dtos/tasks/task-response-dto';
import { ResponseHelper } from '../../helpers/response-helper';
import { validateTask } from '../validations/task-validation'; 
import { container } from '../providers/container';
import { getUserInfo } from "../middleware/verify-token";

export class TaskController {
    private taskService: ITaskService;

    constructor() {
        this.taskService = container.get<ITaskService>('ITaskService');
    }

    async createTask(req: Request, res: Response): Promise<void> {
        const taskData: TaskRequestDTO = req.body;

        const { userId } = getUserInfo(req);

        if (userId === undefined) {
            res.status(401).json(ResponseHelper.error('Unauthorized access: User ID not found.'));
            return;
        }

        taskData.user_id = userId;

        const validation = await validateTask(taskData);

        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }

        try {
            const newTask: TaskResponseDTO = await this.taskService.createTask(taskData);
            res.status(201).json(ResponseHelper.success(newTask, 'Task created successfully'));
        } catch (error) {
            console.error('Error in createTask:', error);
            res.status(500).json(ResponseHelper.error('Unable to create task. Please try again later.'));
        }
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        const taskData: TaskRequestDTO = req.body;

        const { userId } = getUserInfo(req);

        if (userId === undefined) {
            res.status(401).json(ResponseHelper.error('Unauthorized access: User ID not found.'));
            return;
        }

        taskData.user_id = userId;
        
        const validation = await validateTask(taskData);

        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }

        try {
            const updatedTask: TaskResponseDTO = await this.taskService.updateTask(+req.params.id, taskData);
            res.status(200).json(ResponseHelper.success(updatedTask, 'Task updated successfully'));
        } catch (error) {
            console.error('Error in updateTask:', error);
            res.status(500).json(ResponseHelper.error('Unable to update task. Please try again later.'));
        }
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        const { userId } = getUserInfo(req);

        if (userId === undefined) {
            res.status(401).json(ResponseHelper.error('Unauthorized access: User ID not found.'));
            return;
        }

        try {
            const task = await this.taskService.getTaskById(+req.params.id);

            if (task.user_id !== userId) {
                res.status(403).json(ResponseHelper.error('Forbidden: You do not have permission to delete this task.'));
                return;
            }

            await this.taskService.deleteTask(+req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error('Error in deleteTask:', error);
            res.status(500).json(ResponseHelper.error('Unable to delete task. Please try again later.'));
        }
    }

    async getTaskById(req: Request, res: Response): Promise<void> {
        try {
            const task: TaskResponseDTO = await this.taskService.getTaskById(+req.params.id);
            res.status(200).json(ResponseHelper.success(task, 'Task retrieved successfully'));
        } catch (error) {
            console.error('Error in getTaskById:', error);
            res.status(404).json(ResponseHelper.error('Task not found.'));
        }
    }

    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = getUserInfo(req);

            if (userId === undefined) {
              res.status(401).json(ResponseHelper.error('Unauthorized access: User ID not found.'));
              return;
            }

            const tasks: TaskResponseDTO[] = await this.taskService.getAllTasks(userId as number);
            res.status(200).json(ResponseHelper.success(tasks, 'Tasks retrieved successfully'));
        } catch (error) {
            console.error('Error in getAllTasks:', error);
            res.status(500).json(ResponseHelper.error('Unable to fetch tasks. Please try again later.'));
        }
    }
}
