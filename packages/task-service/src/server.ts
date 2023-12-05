import express from "express";
import {api} from "./api";


const PORT = process.env.APP_PORT || 9056;
const HOST = "0.0.0.0";

const app = express();

const startTime = new Date().toISOString();

app.use("/api", api);

const server = app.listen(PORT as number, HOST);

console.log(`Running on the ${process.env.NODE_ENV} environment`);
console.log(`Running on http://${HOST}:${PORT}`);

console.log(`version: 1.0.0 time: ${startTime}`);

export default server;