import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ITask } from "../state/tasks/TaskReducer";
import { IFetchTasksFilters } from "../state/tasks/TaskActions";

const options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_TASK_SERVICE_URL || "http://localhost:9056/api",
};

const fetchTasks = async (opts: IFetchTasksFilters): Promise<ITask[]> => {
  const response: AxiosResponse<ITask[]> = await axios.get("/tasks", {
    params: opts,
    ...options,
  });

  return response.data;
};

const createTask = async (newTask: Partial<ITask>): Promise<ITask> => {
  const response: AxiosResponse<ITask> = await axios.post("/tasks", newTask, {
    ...options,
  });

  return response.data;
};

const deleteTask = async (taskId: string): Promise<void> => {
  await axios.delete(`/tasks/${taskId}`, {
    ...options,
  });

  return Promise.resolve();
};

const updateTask = async (task: Partial<ITask>): Promise<ITask> => {
  const response: AxiosResponse<ITask> = await axios.put(
    `/tasks/${task.taskId}`,
    task,
    {
      ...options,
    }
  );

  return response.data;
};

export const taskService = {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
};
