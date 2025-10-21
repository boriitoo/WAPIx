"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessions_routes_1 = __importDefault(
  require("./sessions/sessions.routes"),
);
const chats_routes_1 = __importDefault(require("./chats/chats.routes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const pino_http_1 = require("pino-http");
const logger_1 = require("./logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, pino_http_1.pinoHttp)({ logger: logger_1.apiLogger }));
app.use("/api/sessions", sessions_routes_1.default);
app.use("/api", chats_routes_1.default);
app.use(
  "/docs",
  swagger_ui_express_1.default.serve,
  swagger_ui_express_1.default.setup(
    (0, swagger_jsdoc_1.default)({
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "WAPIx",
          version: "1.0.0",
        },
        servers: [],
      },
      apis: ["./src/**/*.routes.ts"],
    }),
  ),
);
exports.default = app;
