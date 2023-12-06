import express, {Express} from 'express';
import { router as tasks } from "./routes/tasks";
import { app as exceptionMiddleware } from "./middleware/exceptionMiddleware"

const app: Express = express();

// app.use(exceptionMiddleware);

app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
})

app.use("/tasks", tasks);

app.use(exceptionMiddleware);

export { app as api }