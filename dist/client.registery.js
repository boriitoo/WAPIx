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
exports.ClientRegistry = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const sessions_service_1 = require("./sessions/sessions.service");
class ClientRegistry {
  static init() {
    return __awaiter(this, void 0, void 0, function* () {
      console.log("Initializing existing sessions.");
      const sessions = yield this.service.list();
      for (const session of sessions) {
        yield this.startClient(session.name, session.webhook);
      }
    });
  }
  static startClient(name, webhook) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.registry.has(name)) {
        console.log(`Registry with name ${name} already started.`);
        return;
      }
      let session = yield this.service.getByName(name);
      if (!session) {
        session = yield this.service.save({
          name: name,
          webhook: webhook,
          qr: "",
        });
      }
      const client = new whatsapp_web_js_1.Client({
        authStrategy: new whatsapp_web_js_1.LocalAuth({ clientId: name }),
      });
      this.registry.set(name, { client: client });
      client.on("qr", (qr) =>
        __awaiter(this, void 0, void 0, function* () {
          console.log(qr);
        }),
      );
      client.on("ready", () =>
        __awaiter(this, void 0, void 0, function* () {
          console.log(`Client ${name} is ready!`);
        }),
      );
      client.initialize();
    });
  }
}
exports.ClientRegistry = ClientRegistry;
ClientRegistry.registry = new Map();
ClientRegistry.service = new sessions_service_1.SessionsService();
