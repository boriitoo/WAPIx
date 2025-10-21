import express from "express";
import sessionRoutes from "@/sessions/sessions.routes";

const app = express();

app.use(express.json());

app.use("/api/sessions", sessionRoutes);

export default app;
