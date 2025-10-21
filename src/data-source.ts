import { DataSource } from "typeorm";
import { Session } from "@/sessions/session";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [Session],
  subscribers: [],
  migrations: [],
});
