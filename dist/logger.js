"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLogger = exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
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
exports.logger = (0, pino_1.default)({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV !== "production" ? "debug" : "info"),
  transport: transport,
});
exports.apiLogger = (0, pino_1.default)({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV !== "production" ? "debug" : "info"),
  transport: transport,
  base: {
    name: "api-requests",
  },
});
