import {action, createRequestTypes, FAILURE, REQUEST, SUCCESS} from "../ReducerUtil";
import {ITask} from "model";

export const GET_TASKS: { [id: string]: string } = createRequestTypes("GET_TASKS");

const getTasks = {
    request: () => action(GET_TASKS[REQUEST], {}),
    success: (tasks: ITask[]) => action(GET_TASKS[SUCCESS], tasks),
    failure: (error: string) => action(GET_TASKS[FAILURE], error)
};

export const taskActions = {
    getTasks
}