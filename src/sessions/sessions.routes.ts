import { Router } from "express";
import { createSession, getSession } from "@/sessions/sessions.controller";
const router = Router();

router.post("/", createSession);
router.get("/:name", getSession);

export default router;
