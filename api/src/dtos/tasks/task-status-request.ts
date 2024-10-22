import { TaskStatusEnum } from '@prisma/client';

export class TaskStatusRequestDTO {
    status?: TaskStatusEnum;   

    constructor(
        status?: TaskStatusEnum
    ) {
        this.status = status;
    }
}
