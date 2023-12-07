import express, { Express, Request, Response, NextFunction } from "express";
import { logger } from "../../config/logger";

export const app: Express = express();

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(JSON.stringify(err));
  res.status(500).send({
    error: "Sorry, internal server error has occurred!",
    stack: err.stack,
  });
});
