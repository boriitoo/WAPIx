import express from "express";
import sessionRoutes from "@/sessions/sessions.routes";
import chatsRoutes from "@/chats/chats.routes";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { pinoHttp } from "pino-http";
import { apiLogger } from "@/logger";
import pagesRoutes from "@/pages/pages.routes";
import { engine } from "express-handlebars";

const app = express();
app.engine("handlebars", engine());

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(pinoHttp({ logger: apiLogger }));
}

app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/sessions", sessionRoutes);
app.use("/api", chatsRoutes);

app.use("/", pagesRoutes);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerjsdoc({
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "WAPIx",
          version: "1.0.0",
        },
        servers: [],
      },
      apis: ["./src/**/*.routes.ts"],
    }),
  ),
);

export default app;
