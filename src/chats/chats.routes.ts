import { Router } from "express";
import { getChats } from "@/chats/chats.controller";

const router = Router();

router.get("/:name/chats", getChats);

export default router;
