import {all, call, put, takeLatest} from "redux-saga/effects";
import {GET_TASKS, taskActions} from "./TaskActions";
import {REQUEST} from "../ReducerUtil";
import { ITask } from "model";
import {taskService} from "../../services/TaskService";

export function* fetchTasksSaga() {
    try {
        const taskResults: ITask[] = yield call(taskService.fetchTasks)
        yield put(taskActions.getTasks.success(taskResults))
    } catch (e) {
        yield put(taskActions.getTasks.failure("An error occurred fetching tasks"))
    }
}

export function* taskSaga() {
    yield all([takeLatest(GET_TASKS[REQUEST], fetchTasksSaga)]);
}