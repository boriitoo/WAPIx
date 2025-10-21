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
exports.SessionsService = void 0;
const data_source_1 = require("../data-source");
const session_1 = require("../sessions/session");
class SessionsService {
  constructor() {
    this.repository = data_source_1.AppDataSource.getRepository(
      session_1.Session,
    );
  }
  list() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.repository.find();
    });
  }
  existsByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.repository.existsBy({ name: name });
    });
  }
  save(session) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.repository.save(session);
    });
  }
  getByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.repository.findOne({ where: { name: name } });
    });
  }
}
exports.SessionsService = SessionsService;
