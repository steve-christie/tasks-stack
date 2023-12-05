import express, {Express} from 'express';
import { router as tasks } from "./routes/tasks";

const app: Express = express();

app.use("/tasks", tasks);

export { app as api }