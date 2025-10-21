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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.createSession = void 0;
const client_registery_1 = require("../client.registery");
const sessions_service_1 = require("../sessions/sessions.service");
const tsyringe_1 = require("tsyringe");
const createSession = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { sessionName, webhookUrl } = req.body;
    if (!sessionName || !webhookUrl) {
      return res
        .status(400)
        .json({ error: "sessionName and webhookUrl are required" });
    }
    const clientRegistry = tsyringe_1.container.resolve(
      client_registery_1.ClientRegistry,
    );
    yield clientRegistry.startClient(sessionName, webhookUrl);
    res.json({
      message: "Session created successfully",
      sessionName,
      webhookUrl,
    });
  });
exports.createSession = createSession;
const getSession = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ error: "Session name is required" });
    }
    const service = tsyringe_1.container.resolve(
      sessions_service_1.SessionsService,
    );
    const session = yield service.getByName(name);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  });
exports.getSession = getSession;
