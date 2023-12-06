import {all, call, put, takeLatest} from "redux-saga/effects";
import {CREATE_TASK, DELETE_TASK, GET_TASKS, taskActions, UPDATE_TASK} from "./TaskActions";
import {IAction, REQUEST} from "../ReducerUtil";
import { ITask } from "model";
import {taskService} from "../../services/TaskService";


export function* createNewTaskSaga(action: IAction<Partial<ITask>>) {
    try {
        const createdTask: ITask = yield call(taskService.createTask, action.payload)
        yield put(taskActions.createTask.success(createdTask))
    } catch (e) {
        yield put(taskActions.createTask.failure("An error occurred creating task"))
    }
}

export function* deleteTaskSaga(action: IAction<string>) {
    try {
        yield call(taskService.deleteTask, action.payload)
        yield put(taskActions.deleteTask.success(action.payload))
    } catch (e) {
        yield put(taskActions.deleteTask.failure("An error occurred deleting task"))
    }
}

export function* fetchTasksSaga() {
    try {
        const taskResults: ITask[] = yield call(taskService.fetchTasks)
        yield put(taskActions.getTasks.success(taskResults))
    } catch (e) {
        yield put(taskActions.getTasks.failure("An error occurred fetching tasks"))
    }
}

export function* updateTaskSaga(action: IAction<Partial<ITask>>) {
    try {
        const updatedTask: ITask = yield call(taskService.updateTask, action.payload)
        yield put(taskActions.updateTask.success(updatedTask))
    } catch (e) {
        yield put(taskActions.updateTask.failure("An error occurred updating task"))
    }
}

export function* taskSaga() {
    yield all([takeLatest(CREATE_TASK[REQUEST], createNewTaskSaga)]);
    yield all([takeLatest(DELETE_TASK[REQUEST], deleteTaskSaga)]);
    yield all([takeLatest(GET_TASKS[REQUEST], fetchTasksSaga)]);
    yield all([takeLatest(UPDATE_TASK[REQUEST], updateTaskSaga)]);
}