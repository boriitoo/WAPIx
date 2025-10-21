"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const session_1 = require("./sessions/session");
exports.AppDataSource = new typeorm_1.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [session_1.Session],
  subscribers: [],
  migrations: [],
});
