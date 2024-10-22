import { ITaskService } from '../../contracts/ITaskService';
import { TaskRequestDTO } from '../../dtos/tasks/task-request-dto';
import { TaskResponseDTO } from '../../dtos/tasks/task-response-dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskService implements ITaskService {
    async createTask(taskData: TaskRequestDTO): Promise<TaskResponseDTO> {
        const task = await prisma.task.create({
            data: {
                user_id: taskData.user_id,
                task_description: taskData.task_description,
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
                task_description: taskData.task_description,
                due_date: taskData.due_date,
                attachment: taskData.attachment,
                priority: taskData.priority,
                archived: taskData.archived,
                status: taskData.status,
            },
        });

        return TaskResponseDTO.fromPrisma(updatedTask);
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

    async getAllTasks(userId: number): Promise<TaskResponseDTO[]> {
        const tasks = await prisma.task.findMany({
            where: { user_id: userId },
        });

        return tasks.map(TaskResponseDTO.fromPrisma);
    }
}
