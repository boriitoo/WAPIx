import { DataSource } from "typeorm";
import { Session } from "@/sessions/session";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "test",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_NAME || "test",
  synchronize: true,
  logging: false,
  entities: [Session],
  subscribers: [],
  migrations: [],
});
