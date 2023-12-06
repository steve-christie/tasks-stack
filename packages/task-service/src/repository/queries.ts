import {Task} from "./schema";
import {ITask} from "model";
import {logger} from "../config/logger";


export const createTask = async (task: ITask) => {
    const newTask = new Task({...task})
    logger.info(`Saving ${JSON.stringify(newTask)} to mongo`)
    return newTask.save();
}

export const fetchTasks = async () => {
    return Task.find({}).lean().exec();
}