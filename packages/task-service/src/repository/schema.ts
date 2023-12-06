import { Model, model, models, Schema } from "mongoose";
import {ITask} from "model";

const taskSchema = new Schema<ITask>({
    taskId: { type: String, required: true },
    title: { type: String, required: true },
});

export const Task = (models.Task as Model<ITask>) || model<ITask>("Task", taskSchema);