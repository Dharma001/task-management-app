export enum TaskStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export class TaskResponseDTO {
    id: number;
    user_id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    due_date?: Date;
    attachment?: string;
    priority?: string;
    archived: boolean;
    status: TaskStatusEnum = TaskStatusEnum.PENDING

    constructor(
        id: number,
        user_id: number,
        title: string,
        description: string,
        created_at: Date,
        updated_at: Date,
        due_date?: Date,
        attachment?: string,
        priority?: string,
        archived: boolean = false,
        status?: TaskStatusEnum,
    ) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.due_date = due_date;
        this.attachment = attachment;
        this.priority = priority;
        this.archived = archived;
        this.status = status || TaskStatusEnum.PENDING;
    }

    static fromPrisma(task: any): TaskResponseDTO {
        return new TaskResponseDTO(
            task.id,
            task.user_id,
            task.title,
            task.description,
            task.created_at,
            task.updated_at,
            task.due_date,
            task.attachment,
            task.priority,
            task.archived,
            task.status
        );
    }
}
