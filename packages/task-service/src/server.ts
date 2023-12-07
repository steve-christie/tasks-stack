import express from "express";
import { api } from "./api";
import { connect } from "./repository/connection";
import { configureLogger } from "./config/logger";

const PORT = process.env.APP_PORT || 9056;
const HOST = "0.0.0.0";

const app = express();

const startTime = new Date().toISOString();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api", api);

configureLogger();

connect();

const server = app.listen(PORT as number, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
console.log(`version: 1.0.0 time: ${startTime}`);

export default server;
