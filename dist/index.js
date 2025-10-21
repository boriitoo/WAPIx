"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const data_source_1 = require("./data-source");
const client_registery_1 = require("./client.registery");
const session_1 = require("./sessions/session");
const logger_1 = require("./logger");
data_source_1.AppDataSource.initialize()
  .then(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      tsyringe_1.container.registerInstance(
        "SessionRepository",
        data_source_1.AppDataSource.getRepository(session_1.Session),
      );
      const clientRegistry = tsyringe_1.container.resolve(
        client_registery_1.ClientRegistry,
      );
      yield clientRegistry.init();
      logger_1.logger.info("Database and DI initialized.");
    }),
  )
  .catch((err) => {
    logger_1.logger.error(err);
  });
app_1.default.listen(config_1.default.port, () => {
  logger_1.logger.info(`Server running on port ${config_1.default.port}`);
});
