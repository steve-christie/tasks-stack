import { GET_TASKS, taskActions } from "./TaskActions";
import { ITask } from "./TaskReducer";
import { describe } from "vitest";
import * as sinon from "sinon";
import { expectSaga } from "redux-saga-test-plan";
import { taskService } from "../../services/TaskService";
import { taskSaga } from "./TaskSaga";
import { FAILURE, REQUEST, SUCCESS } from "../ReducerUtil";

describe("Task State Unit Tests", () => {
  describe("TaskActions Tests", () => {
    const actions = taskActions;

    test("getTasks generates expected actions", () => {
      const request = actions.getTasks.request({ includeCompleted: false });
      expect(request.type).toBe("GET_TASKS_REQUEST");
      expect(request.payload).toStrictEqual({ includeCompleted: false });

      const tasks: ITask[] = [
        {
          title: "foo",
          createdDate: "",
          completedDate: "",
          dueDate: "",
          status: "To Do",
          assignedTo: "",
        },
      ];
      const success = actions.getTasks.success(tasks);
      expect(success.type).toBe("GET_TASKS_SUCCESS");
      expect(success.payload).toStrictEqual(tasks);

      const failure = actions.getTasks.failure("foo");
      expect(failure.type).toBe("GET_TASKS_FAILURE");
      expect(failure.payload).toBe("foo");
    });
  });

  describe("TaskSaga Tests", () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    test("When fetching tasks returns good response with data, on SUCCESS put result in state", async () => {
      const tasks: ITask[] = [
        {
          title: "foo",
          createdDate: "2023-04-05",
          dueDate: "2023-05-05",
          completedDate: "2023-04-08",
          assignedTo: "bar",
          status: "To Do",
        },
      ];

      sandbox.stub(taskService, "fetchTasks").resolves(tasks);

      await expectSaga(taskSaga)
        .put({
          type: GET_TASKS[SUCCESS],
          payload: tasks,
        })
        .dispatch({
          type: GET_TASKS[REQUEST],
          payload: {},
        })
        .silentRun(25);
    });

    test("When fetching tasks returns bad response, on FAILURE put result in state", async () => {
      sandbox.stub(taskService, "fetchTasks").rejects();

      await expectSaga(taskSaga)
        .put({
          type: GET_TASKS[FAILURE],
          payload: "An error occurred fetching tasks",
        })
        .dispatch({
          type: GET_TASKS[REQUEST],
          payload: {},
        })
        .silentRun(25);
    });
  });
});
