import express, {Express} from 'express';
import { router as tasks } from "./routes/tasks";
import { app as exceptionMiddleware } from "./middleware/exceptionMiddleware"

const app: Express = express();

app.use(exceptionMiddleware);

app.use("/tasks", tasks);

export { app as api }