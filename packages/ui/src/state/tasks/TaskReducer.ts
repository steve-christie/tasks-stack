import { ITask as ITaskModel } from "model";
import { FAILURE, IAction, REQUEST, SUCCESS } from "../ReducerUtil";
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK,
} from "./TaskActions";

export interface ITask
  extends Omit<ITaskModel, "createdDate" | "completedDate" | "dueDate"> {
  createdDate: string;
  completedDate: string;
  dueDate: string;
}

export interface ITaskState {
  deletingTask: boolean;
  updatingTask: boolean;
  task: ITask;
}

export interface ITasksState {
  creatingTask: boolean;
  fetchingTasks: boolean;
  creatingTaskError?: string;
  fetchingTasksError?: string;
  taskStates: ITaskState[];
}

const initialState: ITasksState = {
  fetchingTasks: false,
  creatingTask: false,
  taskStates: [],
};

export const taskReducer = (
  state: ITasksState = initialState,
  action: IAction<boolean | string | ITask | ITask[]>
) => {
  switch (action.type) {
    case GET_TASKS[REQUEST]:
      return {
        ...state,
        fetchingTasks: true,
        fetchingTasksError: undefined,
      };
    case GET_TASKS[SUCCESS]:
      return {
        ...state,
        fetchingTasks: false,
        taskStates: (action.payload as ITask[]).map((task) => ({
          task,
          deletingTask: false,
          updatingTask: false,
        })),
      };
    case GET_TASKS[FAILURE]:
      return {
        ...state,
        fetchingTasks: false,
        taskStates: [],
        fetchingTasksError: action.payload,
      };
    case CREATE_TASK[REQUEST]:
      return {
        ...state,
        creatingTask: true,
      };
    case CREATE_TASK[SUCCESS]: {
      const newTask = action.payload as ITask;

      state.taskStates.push({
        task: newTask,
        deletingTask: false,
        updatingTask: false,
      });

      return {
        ...state,
        creatingTask: false,
      };
    }
    case CREATE_TASK[FAILURE]:
      return {
        ...state,
        creatingTask: false,
        creatingTaskError: action.payload,
      };
    case DELETE_TASK[REQUEST]: {
      // const taskIndex = state.tasks.findIndex(t => t.taskId === action.payload)
      const taskToDelete = state.taskStates.find(
        (ts) => ts.task.taskId === action.payload
      );

      if (taskToDelete) {
        taskToDelete.deletingTask = true;
      }

      return { ...state };
    }
    case DELETE_TASK[SUCCESS]: {
      const taskIndex = state.taskStates.findIndex(
        (ts) => ts.task.taskId === action.payload
      );

      if (taskIndex !== -1) {
        state.taskStates.splice(taskIndex, 1);
      }

      return { ...state };
    }
    case UPDATE_TASK[REQUEST]: {
      // const taskIndex = state.tasks.findIndex(t => t.taskId === action.payload)
      const taskUpdatePayload = action.payload as Partial<ITask>;
      const taskToUpdate = state.taskStates.find(
        (ts) => ts.task.taskId === taskUpdatePayload.taskId
      );

      if (taskToUpdate) {
        taskToUpdate.updatingTask = true;
      }

      return { ...state };
    }
    case UPDATE_TASK[SUCCESS]: {
      const updatedTask = action.payload as ITask;
      const updatedTaskIndex = state.taskStates.findIndex(
        (ts) => ts.task.taskId === updatedTask.taskId
      );

      if (updatedTaskIndex !== -1) {
        state.taskStates[updatedTaskIndex].task = updatedTask;
        state.taskStates[updatedTaskIndex].updatingTask = false;
      }

      return { ...state };
    }
    default:
      return state;
  }
};
