import {ITask} from "model";
import {FAILURE, IAction, REQUEST, SUCCESS} from "../ReducerUtil";
import {GET_TASKS} from "./TaskActions";


export interface ITaskState {

    fetchingTasks: boolean;
    fetchingTasksError?: string;
    tasks?: ITask[]
}

const initialState: ITaskState = {
    fetchingTasks: false
}

export const taskReducer = (state: ITaskState = initialState, action: IAction<boolean| string| ITask | ITask[]>) => {
    switch(action.type) {
        case GET_TASKS[REQUEST]: return {
            ...state,
            fetchingTasks: true
        }
        case GET_TASKS[SUCCESS]: return {
            ...state,
            fetchingTasks: false,
            tasks: action.payload as ITask[]
        }
        case GET_TASKS[FAILURE]: return {
            ...state,
            fetchingTasks: false,
            tasks: [],
            fetchingTasksError: "An error has occurred fetching tasks"
        }
        default: return state
    }
}