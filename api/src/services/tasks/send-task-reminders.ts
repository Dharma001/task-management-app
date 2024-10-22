import { sendMail } from '../email-service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TaskWithUser {
    id: number;
    user_id: number;
    title: string;
    description: string;
    due_date: Date | null;
    user: {
        id: number;
        email: string;
    };
}

class TaskReminderService {
    async sendTaskReminders() {
        const now = new Date();
        const upcomingTasks = await this.fetchUpcomingTasks(now);

        if (upcomingTasks.length === 0) {
            console.log("No upcoming tasks found.");
            return;
        }

        for (const task of upcomingTasks) {
            const reminderMessages = this.getReminderMessages(task.due_date, task.title);
            for (const message of reminderMessages) {
                await this.sendReminderEmail(task, message);
            }
        }
    }

    private async sendReminderEmail(task: TaskWithUser, message: string) {
        console.log(`Sending reminder for task ID ${task.id} to ${task.user.email}: ${message}`);

        await sendMail(task.user.email, 'Task Reminder', 'reminder_mail', { message, title: task.title , description: task.description});

        await prisma.notification.create({
            data: {
                user_id: task.user.id,
                task_id: task.id,
                message,
                is_read: false,
            },
        });

        console.log(`Email sent and notification stored for task ID ${task.id}.`);
    }

    private getReminderMessages(dueDate: Date | null, title: string): string[] {
        if (!dueDate) return [];

        const messages: string[] = [];
        const now = new Date();
        const timeDiff = dueDate.getTime() - now.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        const hoursDiff = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));

        if (daysDiff === 7) {
            messages.push(`Your task "${title}" is due in 7 days: ${dueDate.toLocaleDateString()}.`);
        } else if (daysDiff === 3) {
            messages.push(`Your task "${title}" is due in 3 days: ${dueDate.toLocaleDateString()}.`);
        } else if (hoursDiff < 24 && hoursDiff >= 0) {
            messages.push(`Your task "${title}" is due in less than 24 hours: ${dueDate.toLocaleDateString()}.`);
        }

        return messages;
    }

    private async fetchUpcomingTasks(now: Date): Promise<TaskWithUser[]> {
        return await prisma.task.findMany({
            where: {
                due_date: {
                    gte: now,
                    lte: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
                },
                archived: false,
            },
            include: {
                user: true,
            },
        });
    }
}

export default TaskReminderService;
