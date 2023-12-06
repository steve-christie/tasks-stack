import express, { Express, Request, Response } from 'express';
import {createTask, fetchTasks} from "../../repository/queries";
import {ITask} from "model";
import { v4 as uuid } from "uuid";
import {logger} from "../../config/logger";

export const router: Express = express();

router.get("/", async (req: Request, res: Response) => {
    logger.info("Request received to list tasks")

    const tasks = await fetchTasks();
    res.send(tasks)
})

router.post("/", async (req: Request, res: Response) => {
    logger.info("Request received to create new task")

    const newTask: ITask = req.body

    newTask.taskId = uuid()
    const createdTask = await createTask(newTask)

    res.send(createdTask)
})

