import { TaskPriorityEnum } from '@prisma/client';

export class TaskPriorityRequestDTO {
    priority?: TaskPriorityEnum;   

    constructor(
        priority?: TaskPriorityEnum
    ) {
        this.priority = priority;
    }
}
