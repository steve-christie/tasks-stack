import express, { Express, Request, Response } from 'express';

export const router: Express = express();

router.get("/", (req: Request, res: Response) => {

    res.send([
        {
            title: "Task title 1!",
            content: ""
        }, {
            title: "Task title 2!",
            content: "foo",
        }, {
            title: "Task title 3!",
            content: "bar",
        }
    ])
})

