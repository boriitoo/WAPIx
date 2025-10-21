import express from "express";
import sessionRoutes from "@/sessions/sessions.routes";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

app.use("/api/sessions", sessionRoutes);

app.use("/docs",
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
        })
    )
);

export default app;
