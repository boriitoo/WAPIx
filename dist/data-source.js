"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const session_1 = require("./sessions/session");
exports.AppDataSource = new typeorm_1.DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "test",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_NAME || "test",
  synchronize: true,
  logging: false,
  entities: [session_1.Session],
  subscribers: [],
  migrations: [],
});
