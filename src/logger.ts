import pino from "pino";

const transport =
  process.env.NODE_ENV !== "production"
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined;

export const logger = pino({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV !== "production" ? "debug" : "info"),
  transport: transport,
});

export const apiLogger = pino({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV !== "production" ? "debug" : "info"),
  transport: transport,
  base: {
    name: "api-requests",
  },
});
