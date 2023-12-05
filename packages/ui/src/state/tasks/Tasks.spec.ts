import {taskActions} from "./TaskActions";
import {ITask} from "model";

describe("TaskActions.ts Unit Tests", () => {
    const actions = taskActions;

    test("getTasks generates expected actions", () => {
        const request = actions.getTasks.request();
        expect(request.type).toBe("GET_TASKS_REQUEST");
        expect(request.payload).toStrictEqual({});

        const tasks: ITask[] = [{title: "foo"}];
        const success = actions.getTasks.success(tasks);
        expect(success.type).toBe("GET_TASKS_SUCCESS");
        expect(success.payload).toStrictEqual(tasks);

        const failure = actions.getTasks.failure("foo");
        expect(failure.type).toBe("GET_TASKS_FAILURE");
        expect(failure.payload).toBe("foo");
    });


});