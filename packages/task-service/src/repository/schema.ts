import { Model, model, models, Schema } from "mongoose";
import {ITask} from "model";

const taskSchema = new Schema<ITask>({
    taskId: { type: String, required: true },
    title: { type: String, required: true },
    assignedTo: { type: String, required: true },
    status: { type: String, required: true },
    createdDate: { type: Date, required: true },
    completedDate: { type: Date, required: false },
    dueDate: { type: Date, required: true },
});

export const Task = (models.Task as Model<ITask>) || model<ITask>("Task", taskSchema);