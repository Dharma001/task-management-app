import { TaskPriorityEnum, TaskStatusEnum } from '@prisma/client';

export class TaskRequestDTO {
    user_id: number;
    task_description: string;
    due_date?: Date;
    attachment?: string;
    archived?: boolean;
    priority?: TaskPriorityEnum;        
    status?: TaskStatusEnum;   

    constructor(
        user_id: number,
        task_description: string,
        due_date?: Date,
        attachment?: string,
        priority?: TaskPriorityEnum, // Ensure this matches the enum type
        archived: boolean = false,
        status?: TaskStatusEnum // Include status in the constructor if needed
    ) {
        this.user_id = user_id;
        this.task_description = task_description;
        this.due_date = due_date;
        this.attachment = attachment;
        this.priority = priority; // Type now matches TaskPriorityEnum
        this.archived = archived;
        this.status = status; // Ensure you set status if provided
    }
}
