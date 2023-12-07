import mongoose from "mongoose";
import { logger } from "../config/logger";
import { Task } from "./schema";

let connection: typeof mongoose = null;

export const connect = async (connectionString?: string) => {
  if (connection) {
    logger.info("Using existing database connection");
    return Promise.resolve(connection);
  }
  logger.info("Creating new database connection");
  logger.debug(`Creating Mongoose client with url: ${connectionString}`);

  connection = await mongoose.connect(connectionString, {
    autoIndex: true,
  });

  connection.connection
    .on("connecting", () => {
      logger.debug("Mongo Event -> Connecting to mongo");
    })
    .on("connected", () => {
      logger.debug("Mongo Event -> Connected to mongo");
    })
    .on("error", (err) => {
      logger.error("Mongo Event -> Connection error occurred");
      logger.error(err);
      Promise.reject();
    })
    .on("reconnected", () => {
      logger.debug("Mongo Event -> Reconnected to mongo");
    })
    .on("disconnecting", () => {
      logger.debug("Mongo Event -> Disconnecting from mongo");
    })
    .on("disconnected", async () => {
      logger.debug("Mongo Event -> Disconnected from mongo");
    })
    .on("close", () => {
      logger.debug("Mongo Event -> Closed mongo connection");
    })
    .once("open", () => {
      logger.debug("Mongo Event -> Connection open");
    });

  Task.ensureIndexes({}, (error) => {
    if (error) {
      logger.error("Error while ensuring the indexes");
      logger.error(error);
    }
  });

  return Promise.resolve(connection);
};
