import { Router } from "express";
import { getChats, sendMessage } from "@/chats/chats.controller";

const router = Router();

router.get("/:name/chats", getChats);
router.post("/:name/chats/message", sendMessage);

export default router;
