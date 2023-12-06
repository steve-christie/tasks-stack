import {action, createRequestTypes, FAILURE, REQUEST, SUCCESS} from "../ReducerUtil";
import {ITask} from "./TaskReducer";

export const CREATE_TASK: { [id: string]: string } = createRequestTypes("CREATE_TASK");
export const DELETE_TASK: { [id: string]: string } = createRequestTypes("DELETE_TASK");
export const GET_TASKS: { [id: string]: string } = createRequestTypes("GET_TASKS");
export const UPDATE_TASK: { [id: string]: string } = createRequestTypes("UPDATE_TASK");

export interface IFetchTasksFilters {
    includeCompleted: boolean,
    sortBy?: string
}

const createTask = {
    request: (task: Partial<ITask>) => action(CREATE_TASK[REQUEST], task),
    success: (createdTask: ITask) => action(CREATE_TASK[SUCCESS], createdTask),
    failure: (error: string) => action(CREATE_TASK[FAILURE], error)
};

const deleteTask = {
    request: (taskId: string) => action(DELETE_TASK[REQUEST], taskId),
    success: (taskId: string) => action(DELETE_TASK[SUCCESS], taskId),
    failure: (error: string) => action(DELETE_TASK[FAILURE], error)
};

const getTasks = {
    request: (opts: IFetchTasksFilters) => action(GET_TASKS[REQUEST], opts),
    success: (tasks: ITask[]) => action(GET_TASKS[SUCCESS], tasks),
    failure: (error: string) => action(GET_TASKS[FAILURE], error)
};

const updateTask = {
    request: (task: Partial<ITask>) => action(UPDATE_TASK[REQUEST], task),
    success: (updateTask: ITask) => action(UPDATE_TASK[SUCCESS], updateTask),
    failure: (error: string) => action(UPDATE_TASK[FAILURE], error)
};

export const taskActions = {
    createTask,
    deleteTask,
    getTasks,
    updateTask
}