export class TaskFilterRequestDTO {
  fromDate?: string;  
  toDate?: string;  
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';  
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'; 

  constructor(data: Partial<TaskFilterRequestDTO>) {
      this.fromDate = data.fromDate;
      this.toDate = data.toDate;
      this.priority = data.priority;
      this.status = data.status;
  }
}
