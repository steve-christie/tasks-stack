import winston, {
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";

export let logger: winston.Logger;

export const configureLogger = () => {
  logger = createWinstonLogger({
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSS" }),
      format.json()
    ),
    level: "debug",
    defaultMeta: {},
    transports: [new transports.Console({})],
  });

  return logger;
};
