import { ITaskService } from '../../contracts/ITaskService';
import { TaskRequestDTO } from '../../dtos/tasks/task-request-dto';
import { TaskResponseDTO } from '../../dtos/tasks/task-response-dto';
import { PrismaClient } from '@prisma/client';
import { TaskStatusRequestDTO } from '../../dtos/tasks/task-status-request';
import { TaskPriorityRequestDTO } from '../../dtos/tasks/task-priority-request';
import { TaskFilterRequestDTO } from '../../dtos/tasks/task-filter-request-dto';

const prisma = new PrismaClient();

export class TaskService implements ITaskService {
    async createTask(taskData: TaskRequestDTO): Promise<TaskResponseDTO> {
        const task = await prisma.task.create({
            data: {
                title: taskData.title,
                user_id: taskData.user_id,
                description: taskData.description,
                due_date: taskData.due_date,
                attachment: taskData.attachment,
                priority: taskData.priority,
                archived: taskData.archived,
                status: taskData.status,
            },
        });

        return TaskResponseDTO.fromPrisma(task);
    }

    async updateTask(id: number, taskData: TaskRequestDTO): Promise<TaskResponseDTO> {
        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                title: taskData.title,
                description: taskData.description,
                due_date: taskData.due_date,
                attachment: taskData.attachment,
                priority: taskData.priority,
                archived: taskData.archived,
                status: taskData.status,
            },
        });

        return TaskResponseDTO.fromPrisma(updatedTask);
    }

    async updateTaskStatus(id:number, statusData: TaskStatusRequestDTO ): Promise<TaskResponseDTO> {
        const updatedStausTask = await prisma.task.update({
            where: { id },
            data: {
                status: statusData.status,
            },
        });

        return TaskResponseDTO.fromPrisma(updatedStausTask);
    }

    async updateTaskPriority(id:number, priorityData: TaskPriorityRequestDTO ): Promise<TaskResponseDTO> {
        const updatedPriorityTask = await prisma.task.update({
            where: { id },
            data: {
                priority: priorityData.priority,
            },
        });

        return TaskResponseDTO.fromPrisma(updatedPriorityTask);
    }
    
    async deleteTask(id: number): Promise<void> {
        await prisma.task.delete({
            where: { id },
        });
    }

    async getTaskById(id: number): Promise<TaskResponseDTO> {
        const task = await prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            throw new Error('Task not found');
        }

        return TaskResponseDTO.fromPrisma(task);
    }

    async getAllTasks(userId: number, filters?: TaskFilterRequestDTO): Promise<TaskResponseDTO[]> {
        const where: any = {
            user_id: userId, 
        };
    
        if (filters) {
            const { fromDate, toDate, priority, status } = filters;
    
            const trimmedFromDate = fromDate?.trim();
            const trimmedToDate = toDate?.trim();
    
            if (trimmedFromDate || trimmedToDate) {
                where.due_date = {};
    
                if (trimmedFromDate) {
                    where.due_date.gte = new Date(trimmedFromDate); 
                }
    
                if (trimmedToDate) {
                    where.due_date.lte = new Date(new Date(trimmedToDate).setHours(23, 59, 59, 999));
                }
            }
    
            if (priority) {
                where.priority = priority;
            }
    
            if (status) {
                where.status = status;
            }
        }
    
        const tasks = await prisma.task.findMany({ where });
    
        return tasks.map(TaskResponseDTO.fromPrisma);
    }    
}
