import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { PreloadedState } from "redux";
import { all, fork } from "redux-saga/effects";
import logger from "redux-logger";
import { taskReducer } from "./tasks/TaskReducer";
import { taskSaga } from "./tasks/TaskSaga";

export type ApplicationState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([fork(taskSaga)]);
}

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export const setupStore = (
  preloadedState?: PreloadedState<ApplicationState>
) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({ immutableCheck: false }).concat(
        sagaMiddleware
      );

      if (process.env.NODE_ENV != "production") {
        middleware.concat(logger);
      }

      return middleware;
    },
    preloadedState,
  });
};

const sagaMiddleware = createSagaMiddleware();

const store = setupStore();
export default store;

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
