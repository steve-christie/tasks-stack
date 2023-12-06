export type TTaskStatus = "To Do" | "In Progress" | "Complete"

export interface ITask {
    taskId?: string;
    title: string;
    assignedTo: string
    createdDate: Date;
    dueDate?: Date;
    completedDate?: Date;
    status: TTaskStatus
}