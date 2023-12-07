import { agent as request } from "supertest";
import { router } from "./tasks";
import { expect } from "chai";
import * as sinon from "sinon";
import { mongoActions } from "../../repository/mongoActions";
import { ITask } from "tasks-ui/src/state/tasks/TaskReducer";
import { configureLogger } from "../../config/logger";
describe("Tasks Route Tests", () => {
  configureLogger();

  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("When GET tasks with no query params is requested, then default options are passed to mongo", async () => {
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

    sandbox
      .mock(mongoActions)
      .expects("fetchTasks")
      .withArgs(false, undefined, undefined)
      .returns(tasks);

    const result = await request(router).get("/").send();

    expect(result.body).to.eqls(tasks);
  });

  it("When GET tasks with includeCompleted as false is requested, then includeCompleted false is passed to mongo", async () => {
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

    sandbox
      .mock(mongoActions)
      .expects("fetchTasks")
      .withArgs(false, undefined, undefined)
      .returns(tasks);

    const result = await request(router)
      .get("/")
      .query({
        includeCompleted: "false",
      })
      .send();

    expect(result.body).to.eqls(tasks);
  });

  it("When GET tasks with includeCompleted as true is requested, then includeCompleted true is passed to mongo", async () => {
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

    sandbox
      .mock(mongoActions)
      .expects("fetchTasks")
      .withArgs(true, undefined, undefined)
      .returns(tasks);

    const result = await request(router)
      .get("/")
      .query({
        includeCompleted: "true",
      })
      .send();

    expect(result.body).to.eqls(tasks);
  });

  it("When GET tasks with sort options is requested, then sort is passed to mongo", async () => {
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

    sandbox
      .mock(mongoActions)
      .expects("fetchTasks")
      .withArgs(false, "assignedTo", "desc")
      .returns(tasks);

    const result = await request(router)
      .get("/")
      .query({
        sortBy: "assignedTo::desc",
      })
      .send();

    expect(result.body).to.eqls(tasks);
  });
});
