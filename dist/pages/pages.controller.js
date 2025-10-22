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
exports.getQrPage = exports.newSessionPage = exports.getHomePage = void 0;
const tsyringe_1 = require("tsyringe");
const sessions_service_1 = require("../sessions/sessions.service");
const getHomePage = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const service = tsyringe_1.container.resolve(
      sessions_service_1.SessionsService,
    );
    const sessions = yield service.list();
    return res.render("home", {
      layout: "main",
      title: "WAPIx Home",
      sessions: sessions,
    });
  });
exports.getHomePage = getHomePage;
const newSessionPage = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return res.render("sessions/new", { layout: "main" });
  });
exports.newSessionPage = newSessionPage;
const getQrPage = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const service = tsyringe_1.container.resolve(
      sessions_service_1.SessionsService,
    );
    const session = yield service.getByName(name);
    if (!session) {
      return res.status(404).send("No such session");
    }
    return res.render("sessions/qr", {
      layout: "main",
      sessionName: session.name,
      isConnected: session.isConnected,
    });
  });
exports.getQrPage = getQrPage;
