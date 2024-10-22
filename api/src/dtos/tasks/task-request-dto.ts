import { TaskPriorityEnum, TaskStatusEnum } from '@prisma/client';

export class TaskRequestDTO {
    user_id: number;
    title: string;
    description: string;
    due_date?: Date;
    attachment?: string;
    archived?: boolean;
    priority?: TaskPriorityEnum;        
    status?: TaskStatusEnum;   

    constructor(
        user_id: number,
        title: string,
        description: string,
        due_date?: Date,
        attachment?: string,
        priority?: TaskPriorityEnum, 
        archived: boolean = false,
        status?: TaskStatusEnum
    ) {
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.attachment = attachment;
        this.priority = priority;
        this.archived = archived;
        this.status = status;
    }
}
