import {Task} from "./schema";
import {ITask} from "model";
import {logger} from "../config/logger";
import {FilterQuery, SortOrder} from "mongoose";


const createTask = async (task: ITask) => {
    const newTask = new Task({...task})
    logger.info(`Saving ${JSON.stringify(newTask)} to mongo`)
    return newTask.save();
}

const fetchTasks = async (includeCompleted?: boolean, sortField?: string, sortDir?: SortOrder) => {

    const filter: FilterQuery<ITask> = {}

    if (includeCompleted) {
        filter.status = {
            $in: ["To Do", "In Progress", "Complete"]
        }
    } else {
        filter.status = {
            $in: ["To Do", "In Progress"]
        }
    }

    logger.info(`Using filter ${JSON.stringify(filter)}`)
    const q = Task.find(filter)

    if (sortField && sortDir) {
        q.sort([[sortField, sortDir]])
        logger.info(`Using sort ${JSON.stringify([[sortField, sortDir]])}`)
    }

    return q.lean().exec();
}

const fetchTaskByTaskId = async(taskId: string) => {
    logger.info(`Looking up task ${taskId} in mongo`)
    return Task.findOne({taskId}).exec();
}

const deleteTask = async (taskId: string) => {
    const deleteResult = await Task.deleteOne({taskId}).exec()
    logger.info(`Delete result: ${JSON.stringify(deleteResult)}`)
}

const updateTask = async (taskId: string, taskChanges: Partial<ITask>) => {
    logger.info(`Performing mongo findOneAndUpdate for task ${taskId} with update payload: ${JSON.stringify(taskChanges)}`);
    return Task.findOneAndUpdate({ taskId }, taskChanges, { new: true });
}


export const mongoActions = {
    createTask,
    deleteTask,
    fetchTaskByTaskId,
    fetchTasks,
    updateTask
}