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
exports.createSession = void 0;
const client_registery_1 = require("../client.registery");
const createSession = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { sessionName, webhookUrl } = req.body;
    if (!sessionName || !webhookUrl) {
      return res
        .status(400)
        .json({ error: "sessionName and webhookUrl are required" });
    }
    yield client_registery_1.ClientRegistry.startClient(
      sessionName,
      webhookUrl,
    );
    res.json({
      message: "Session created successfully",
      sessionName,
      webhookUrl,
    });
  });
exports.createSession = createSession;
