import { Router } from "express";
import {
  getHomePage,
  getQrPage,
  newSessionPage,
} from "@/pages/pages.controller";

const router = Router();

router.get("/", getHomePage);
router.get("/sessions/new", newSessionPage);
router.get("/sessions/:name/qr", getQrPage);

export default router;
