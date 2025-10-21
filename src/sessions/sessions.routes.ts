import { Router } from "express";
import { createSession } from "@/sessions/sessions.controller";
const router = Router();

router.post("/", createSession);

export default router;
