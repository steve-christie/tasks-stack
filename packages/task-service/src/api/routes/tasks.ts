import express, { Express, Request, Response, NextFunction } from "express";
import { mongoActions } from "../../repository/mongoActions";
import { ITask } from "model";
import { v4 as uuid } from "uuid";
import { logger } from "../../config/logger";
import { SortOrder } from "mongoose";

export const router: Express = express();

export const unpackSortBy = (sortStr: string) => {
  if (sortStr.includes("::")) {
    const parts = sortStr.split("::");
    const field = parts[0];
    const direction = parts[1] as SortOrder;
    return { field, direction };
  }
};

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Request received to list tasks");

    logger.info(typeof req.query.includeCompleted);
    const includeCompleted = req.query.includeCompleted === "true";
    const sortBy = req.query.sortBy as string;
    let sortField;
    let sortDir;

    if (sortBy) {
      const { field, direction } = unpackSortBy(sortBy);
      sortField = field;
      sortDir = direction;
    }

    const tasks = await mongoActions.fetchTasks(
      includeCompleted,
      sortField,
      sortDir
    );
    res.send(tasks);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Request received to create new task");

    const newTask: ITask = req.body;

    newTask.taskId = uuid();
    newTask.createdDate = new Date();
    newTask.status = "To Do";

    const createdTask = await mongoActions.createTask(newTask);

    res.send(createdTask);
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/:taskId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      logger.info(`Request received to delete task: ${taskId}`);

      const existingTask = await mongoActions.fetchTaskByTaskId(taskId);

      if (existingTask) {
        await mongoActions.deleteTask(taskId);
        res.status(204).send();
      } else {
        logger.warn("No task exists matching this task id");
        res.status(400).send({
          error: `No task exists matching ID: ${taskId}`,
        });
      }
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:taskId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const taskChanges: Partial<ITask> = req.body;

      if (taskChanges.status !== "Complete") {
        taskChanges.completedDate = null;
      }

      const updatedTask = await mongoActions.updateTask(taskId, taskChanges);
      res.send(updatedTask);
    } catch (e) {
      next(e);
    }
  }
);
